import { Context, MachineEvent } from "../../reasoning/types";
import { Gemini_2_0_Flash } from "@foundry/models-api/language-models";
import { extractHtmlFromBackticks } from "../../utils";
/**
Project Objectives
Project Deliverables
Project Timeline
 */

export type RfpResponsesResult = {
    allResponsesRecieved: boolean,
    vendors: string[],
}

async function parseResearchReport(context: Context, task?: string): Promise<string | undefined> {
    const user = `
# Task
extract the array of 
${task}

# State Machine DSL:
The stack property let's you know which states have been visited. Each state has a property on the context
which includes the output from that state. There is where you may find a research report that should be returned.
Extract any relevant report(s)
${JSON.stringify(context)}

# Output
Seperate each report by a section heading. Convert the markdown to HTML. Do not output the JSON, only the HTML conversion of the markdown.
If no reports are found output N/A
    `;

    const system = `You are a helpful AI assistant tasked with looking for any relevant research report(s).
    You understand common state machine DSL's like x-state.`;
    const response = await Gemini_2_0_Flash.createGenericChatCompletion(
        {
            messages: [
                { role: "SYSTEM", contents: [{ text: system }] },
                { role: "USER", contents: [{ text: user }] }
            ]
        }
    );

    return extractHtmlFromBackticks(response?.completion ?? 'N/A');
}

export async function awaitRfpResponses(context: Context, event?: MachineEvent, task?: string): Promise<RfpResponsesResult> {
    /*
    use an LLM to get the list of vendors for which we are awaiting responses from the input task
    Then for each vendor see if the is an rep response result on the context somewhere. 
    IE find every attribute on the context prefixed with requestRfp and if the counts matches the number of vendors call it good. 
    Consider adding a check for index of vendorId.
    */
    const responses = Object.keys(context)
    .filter(key => key.indexOf('requestRfp') >= 0)
    .map(key => context[key]);

    return {
        allResponsesRecieved: true,
        vendors: [],
    }
}