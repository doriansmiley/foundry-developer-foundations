import { GoogleGenAI } from '@google/genai';
import { addCitations, getTokenomics } from './utils';

export async function generateDesignSpec(user: string, system: string, readme: string): Promise<string> {

    // Configure the client
    const ai = new GoogleGenAI({});

    // Define the grounding tool
    const groundingTool = {
        googleSearch: {},
    };

    // Configure generation settings
    const config = {
        tools: [groundingTool],
    };

    // Make the request
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${system}
${user}
# The README that explains the layout of the codebase you are working in. 
You must carefully review this to understand effected files, methodologies, APIs etc. 
It is your rosetta stone for understanding how to write code in our codebase:
${readme}`,
        config,
    });

    const answer = addCitations(response);
    const tokenomics = getTokenomics(response, 'gemini-2.5-flash');

    return `${answer}

# Tokenomics
${JSON.stringify(tokenomics)}`;

}