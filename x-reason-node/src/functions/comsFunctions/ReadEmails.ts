import { Context, MachineEvent } from "@xreason/reasoning/types";
import { extractJsonFromBackticks, uuidv4 } from "@xreason/utils";
import { container } from "@xreason/inversify.config";
import { FoundryClient, GeminiService, OfficeService, ReadEmailOutput, TYPES, User } from "@xreason/types";



export async function readEmails(context: Context, event?: MachineEvent, task?: string): Promise<ReadEmailOutput> {
    const officeService = await container.getAsync<OfficeService>(TYPES.OfficeService);
    const { getUser } = container.get<FoundryClient>(TYPES.FoundryClient);

    const user: User = await getUser();

    const system = `You are a helpful virtual ai assistant tasked with extracting the time frame in minutes for an email query.`;
    // possible options: 
    // past 15 minutes (default)
    // past hour
    // past day
    const userPrompt = `
    Using the task from the end user below classify the time frame for the email query into one of the following:
    1. past 15 minutes (also the default if no time from is specified)
    2. past hour
    3. past day (this is the farthest supported look back)

    The task from the end user:
    ${task}

    You can only respond in JSON in the following format:
    {
        timeframe: string,
    }

    For example if the ask from the user is:
    Q: "Get me caught up on my emails"
    A: {
        "timeframe": "past 15 minutes"
    }

    Q: "Read me emails from the previous half hour"
    A: {
        "timeframe": "past hour"
    }

    Q: "What emails came in today"
    A: {
        "timeframe": "past day"
    }
    `;

    const geminiService = container.get<GeminiService>(TYPES.GeminiService);

    const response = await geminiService(userPrompt, system);
    // eslint-disable-next-line no-useless-escape
    const extractedResponse = extractJsonFromBackticks(response.replace(/\,(?!\s*?[\{\[\"\'\w])/g, "") ?? "{}");
    const { timeframe } = JSON.parse(extractedResponse) as { timeframe: string };

    let parsedTime = 15;

    switch (timeframe) {
        case 'past hour':
            parsedTime = 60
            break;
        case 'past day':
            parsedTime = 720; // we use 12 hours instead of 24 as it's probably the most relevant window.

    }

    const publishTime = new Date((new Date().getTime() - parsedTime * 60 * 1000)).toISOString();

    const result = await officeService.readEmailHistory({
        email: user.email!,
        publishTime, // TODO construct the published time from the extracted timeframe parameter
    });

    return result;
}