import { container } from '@codestrap/developer-foundations-di';
import { Context, GeminiService, MachineEvent, TYPES } from '@codestrap/developer-foundations-types';
import { extractJsonFromBackticks } from '@codestrap/developer-foundations-utils';

export type IncompleteQuestionResponse = {
  summary: string;
  rawResponse: string;
};

export async function incompleteQuestion(context: Context, event?: MachineEvent, task?: string): Promise<IncompleteQuestionResponse> {
    const originalQuestion = task || "Unknown question";
    //Question: can i get some information from context here??
    
    const user = `
    You are analyzing an incomplete question that was submitted to a sales/consulting system. 
    Your job is to identify what specific information is missing that would be needed to properly process this request.

    # Original Question
    ${originalQuestion}

    # Analysis Instructions
    Analyze the incomplete question to identify what specific information is missing that would be needed to properly execute the requested COMS task.

    Consider what essential details are required based on the nature of the request:
    - **Who**: People, contacts, recipients, attendees, assignees
    - **What**: Content, subject, purpose, description, requirements
    - **When**: Timing, deadlines, schedules, time periods
    - **Where**: Locations, channels, platforms, destinations
    - **How**: Format, method, approach, specific instructions
    - **Why**: Context, objectives, goals, intended outcome

    Focus on identifying the minimum viable information needed to execute the task successfully. Be specific about what additional details would make the request actionable.

    You can only respond in JSON in the following format:
    {
        "summary": "Brief summary of missing information",
        "rawResponse": "Detailed analysis of what's missing"
    }

    # Examples

    ## Example 1: Missing Timeline and Budget
    **Original Question**: "I need a proposal for a software development project"
    **Analysis**: 
    {
        "summary": "Timeline, budget, and project scope",
        "rawResponse": "Missing: Timeline or deadline for the project; Budget or cost constraints; Project scope or specific requirements; Contact information for follow-up"
    }

    ## Example 2: Missing Contact Information
    **Original Question**: "Send an RFP to the vendor about the pricing module"
    **Analysis**:
    {
        "summary": "Vendor contact details and RFP specifications",
        "rawResponse": "Missing: Vendor name and contact information; RFP objectives and deliverables; Timeline for the project; Budget constraints; Specific requirements for the pricing module"
    }

    ## Example 3: Missing Scope Details
    **Original Question**: "Schedule a meeting next week"
    **Analysis**:
    {
        "summary": "Meeting purpose, attendees, and timing",
        "rawResponse": "Missing: Purpose or agenda for the meeting; Attendees (names and emails); Preferred date and time; Meeting duration; Location or video call details"
    }

    ## Example 4: Missing Project Context
    **Original Question**: "Create a report"
    **Analysis**:
    {
        "summary": "Report topic, audience, and requirements",
        "rawResponse": "Missing: Report topic or subject matter; Target audience or recipients; Report format and length; Timeline for completion; Any specific requirements or focus areas"
    }

    ## Example 5: Missing Vendor Information
    **Original Question**: "Request proposals for the new system"
    **Analysis**:
    {
        "summary": "Vendor list, system requirements, and timeline",
        "rawResponse": "Missing: List of vendors to contact; System requirements and specifications; Project timeline and milestones; Budget constraints; Evaluation criteria for proposals"
    }

    Now analyze the provided question and return your response in the specified JSON format.
    `;

    const system = `You are a helpful AI assistant tasked with analyzing incomplete questions and identifying missing information for a sales/consulting system. 
    You always obey the user instructions and pay close attention to detail. You are not chatty and always respond in the requested JSON structure, nothing else.
    You are professional in your tone and provide actionable feedback that helps users understand exactly what additional information is needed.`;

    const geminiService = container.get<GeminiService>(TYPES.GeminiService);
    const response = await geminiService(user, system);

    // eslint-disable-next-line no-useless-escape
    const result = extractJsonFromBackticks(response.replace(/\,(?!\s*?[\{\[\"\'\w])/g, "") ?? "{}").replace(/(\r\n|\n|\r)/gm, "");

    const parsedResult = JSON.parse(result) as IncompleteQuestionResponse;

    return parsedResult;
}