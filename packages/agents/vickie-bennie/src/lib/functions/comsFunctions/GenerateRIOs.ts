import { Context, MachineEvent } from "@codestrap/developer-foundations-types";
import { extractJsonFromBackticks, uuidv4 } from "@codestrap/developer-foundations-utils";

export type RIO = {
    category: 'Risk' | 'Insight' | 'Opportunity';
    subHeader: string;
    description: string;
}

export type RIOReport = {
    id: string;
    rios: RIO[];
    summary: string;
}

export async function generateRIOs(context: Context, event?: MachineEvent, task?: string): Promise<RIOReport> {
    const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPEN_AI_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o",
            input: [
                {
                    role: "system",
                    content: [
                        {
                            type: "input_text",
                            text: `You are an expert RIO (Risks, Insights, and Opportunities) analyst. Your job is to research the given task, gather relevant information from the web, and transform your findings into structured, actionable insights.

                                    RIO Structure:
                                    - Category: Risk, Insight, or Opportunity
                                    - Sub-Header: Brief descriptive title (2-5 words)
                                    - Description: Single paragraph explaining context and details with actionable guidance

                                    Criteria for effective RIOs:
                                    1. Actionable: Provide clear pathway for action or specific questions
                                    2. Timely: Focus on current/upcoming issues with appropriate urgency
                                    3. Relevant: Tailored to user's context, industry, or specific needs
                                    4. Important: High-priority information that impacts business outcomes

                                    Process:
                                    1. Research the given task thoroughly using web search
                                    2. Gather current information, trends, and relevant data
                                    3. Analyze the findings to identify risks, insights, and opportunities
                                    4. Generate 3-5 RIOs per category (Risk, Insight, Opportunity)
                                    5. Prioritize the most pressing and impactful RIOs first
                                    6. Keep descriptions concise but informative enough to prompt action

                                    Example RIOs:

                                    Risk Examples:
                                    - Sub-Header: "Supply Chain Disruption"
                                    Description: "There is an anticipated shortage of key materials due to recent international shipping delays. This could lead to production halts. Mitigate by identifying alternate suppliers and increasing inventory stock now."

                                    - Sub-Header: "Data Security Breach"
                                    Description: "Recent cyber attacks targeting similar businesses indicate increased vulnerability. Increase security protocols by conducting an immediate audit and implementing multi-factor authentication across all systems."

                                    Insight Examples:
                                    - Sub-Header: "Customer Behavior Shift"
                                    Description: "Recent data shows a 10% increase in mobile shopping across your customer base. Consider optimizing your mobile experience to capitalize on this growing trend and improve conversion rates."

                                    - Sub-Header: "Industry AI Adoption"
                                    Description: "Competitors are adopting AI for process automation, providing 30% cost savings. Consider adopting similar strategies to maintain competitive advantage and reduce operational costs."

                                    Opportunity Examples:
                                    - Sub-Header: "New Revenue Stream"
                                    Description: "Expanding your product line into the X region could increase sales by 15% based on favorable market trends. Begin market research and strategy alignment to enter this region next quarter."

                                    - Sub-Header: "Partnership Available"
                                    Description: "X Company is seeking strategic partnerships in your sector. Reach out to explore collaboration opportunities that could expand your market reach and share development costs."

                                    Format your response as a JSON object with this structure:
                                    {
                                    "rios": [
                                        {
                                        "category": "Risk|Insight|Opportunity",
                                        "subHeader": "Brief title",
                                        "description": "Detailed description with actionable guidance"
                                        }
                                    ],
                                    "summary": "Brief overview of the RIO analysis and research findings"
                                    }`
                        }
                    ]
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "input_text",
                            text: `Please research the following task and generate RIOs:\n\n${task}`
                        }
                    ]
                }
            ],
            text: {
                format: {
                    type: "text"
                }
            },
            reasoning: {},
            tools: [
                {
                    type: "web_search_preview",
                    user_location: {
                        type: "approximate",
                        country: "US",
                    },
                    search_context_size: "high"
                }
            ],
            temperature: 0.7,
            max_output_tokens: 4096,
            top_p: 1,
            store: true
        })
    });

    const data = await response.json() as any;
    const content = data.output?.filter((message: { type: string }) => message.type === 'message')?.[0]?.content?.[0]?.text;
    const result = extractJsonFromBackticks(content ?? "{}");
    const parsedContent = JSON.parse(result);

    return {
        id: uuidv4(),
        rios: parsedContent.rios || [],
        summary: parsedContent.summary || 'RIO analysis completed.'
    };
} 