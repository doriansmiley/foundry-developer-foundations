import { GPT_4o, O1_mini, AnthropicClaude_3_5_Sonnet, Grok_2 } from "@foundry/models-api/language-models";
import { extractJsonFromBackticks } from '.'

export async function getLLMResponse(model: string, user: string, system: string): Promise<string> {
    let result = 'undefined';
    console.log(`calling getLLMResponse with model: ${model}`);
    if (model === '01Mini') {
        const response = await O1_mini.createChatCompletion({
            params: {
                "temperature": 0,
            },
            messages: [
                { role: "SYSTEM", content: system },
                { role: "USER", content: user }
            ],
        });

        result = response.choices[0].message.content ?? "no content";
    } else if (model === 'gpt4o') {
        const response = await GPT_4o.createChatCompletion({ messages: [{ role: "SYSTEM", contents: [{ text: system }] }, { role: "USER", contents: [{ text: user }] }] });
        result = response.choices[0].message.content ?? "no content";
    } else if (model === 'claude3.5') {
        const response = await AnthropicClaude_3_5_Sonnet.createGenericChatCompletion({
            params: {
                "temperature": 0,
            },
            messages: [{ role: "USER", contents: [{ text: `${system}\n${user}` }] }],
        });
        result = response.completion;
    } else if (model === 'grok2') {
        const response = await Grok_2.createGenericChatCompletion({
            params: {
                "temperature": 0,
            },
            messages: [{ role: "USER", content: `${system}\n${user}` }],
        });
        result = response.completion;
     }

    result = extractJsonFromBackticks(result);
    return result;
}