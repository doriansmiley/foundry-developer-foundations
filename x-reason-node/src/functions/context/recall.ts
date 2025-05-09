import { Text_Embedding_3_Small } from "@foundry/models-api/language-models";
import { Objects, Contacts } from "@foundry/ontology-api";
import { Gemini_2_0_Flash } from "@foundry/models-api/language-models";

import { UserProfile } from "./userProfile";
import { Context, MachineEvent } from "../../reasoning/types";
import { extractJsonFromBackticks } from "../../utils";
import { Filters } from "@foundry/functions-api";

export type ModelMemory = {
    contacts: {
        name: string,
        email: string,
    }[],
    currentUser: {
        name: string,
        email: string,
        id: string,
        timezone: string,
    },
    messages: string [];
    reasoning: string;
}

export async function recall(context: Context, event?: MachineEvent, task?: string): Promise<ModelMemory> {
    // find the user profile state
    const lastStackKey = context?.stack?.find(stackItem => stackItem.indexOf('userProfile') >= 0);
    const userDetails: UserProfile = {
        name: undefined,
        id: undefined,
        email: undefined,
        timezone: undefined,
    };
    // if we found a state that retrieved a user profile grab it
    if (lastStackKey) {
        const retrievedUser = context[lastStackKey] as UserProfile;
        userDetails.name = retrievedUser.name;
        userDetails.id = retrievedUser.id;
        userDetails.email = retrievedUser.email;
        userDetails.timezone = retrievedUser.timezone;
    }

    const embeddings = await Text_Embedding_3_Small.createEmbeddings({ inputs: [task!] });
    
    // find any daily briefs that are relevant here
    const matchedMessages = await Objects.search()
    .memoryRecall()
    .nearestNeighbors(message => message.embedding.near(embeddings.embeddings[0], { kValue: 1 }))
    .allAsync();
    
    // match any relevant contacts based on name and the task
    const matchedContacts = await Objects.search()
    .contacts()
    .filter(contact => Filters.or(
        contact.fullName.matchAnyToken(task!),
        contact.company.matchAnyToken(task!)
    ))
    .orderByRelevance()
    .takeAsync(10);

    const messagesString = JSON.stringify(matchedMessages.map(message => ({
        messageText: JSON.stringify(message.originalText),
        taskOwnerIfAny: message.userId,
        source: message.source,
    })));

    const contactsString = JSON.stringify(matchedContacts.map(contact => (
        {
            name: contact.fullName,
            email: contact.email,
            talksTo: contact.talksTo,
            contextOfTheRelatioship: contact.notes,
            account: contact.keyAccounts,
            company: contact.company,
            notes: contact.notes,
        }
    )));

    const user = `
    Extract the exact contact and messages that are relvant to the task below using the provided recalled conversations and contact information.
    Include your reasoning.

    # Task
    ${task}

    # User Executing This Request
    ${JSON.stringify(userDetails)}

    # Contacts retrieved using fuzzy matching based on the task. 
    Pick the best possible contact(s) to return based on task, if any
    If the user has not specified a name but instead a role description or company name determine which persons(s) are the best possible match
    If no contacts are are relevant to the task return an empty array
    ${contactsString}

    # Messages retrieved using vector search:
    Only return messages relevant to the task at hand, if any
    If not messages are relevant to the task return an empty array
    ${messagesString}

    You can only respond in JSON in the following format:
    {
        contacts: {
            name: string,
            email: string,
        }[],
        currentUser: {
            name: string,
            email: string,
            id: string,
            timezone: string,
        },
        messages: string [];
        reasoning: string;
    }

    For example if you are provided:
    # Task
    Schedule a meeting with Bob for Monday to discuss Ford as a possible customer in 2026

    # User Executing This Request
    {
        name: 'Dorian Smiley',
        id: '1234',
        email: 'dsmiley@codestrap.me',
        timezone: 'America/Los_Angeles',
    }

    # Contacts retrieved using fuzzy matching based on the task. 
    Only return contacts where you are 90% sure or more they are the ones refered to in the task, if any. 
    Use the provided message, if any, to give you more context on which contact is the most relevant
    If not contacts are are relevant to the task return an empty array
    ${JSON.stringify([
        {
            name: 'Bob Seager',
            email: 'bob.seager@ford.com',
            talksTo: 'DORIAN',
            contextOfTheRelatioship: ['Met a few times at AIP/DevCon, See each other at every event, Worked with him on several bootcamps, small sessions, and AIPcon prep'],
            account: 'Ford',
        },
        {
            name: 'Bob Baymon',
            email: 'bob.baymon@gmail.com',
            talksTo: 'CONNOR',
            contextOfTheRelatioship: ['Friend of mine that works at IBM'],
            account: 'Personal',
        },
    ])}

    # Messages retrieved using vector search:
    Only return messages where you are 90% sure or more they are relevant to the task at hand, if any
    If not messages are relevant to the task return an empty array
    ${JSON.stringify([])}
    
    
    Your response is:
    {
        "contacts": [
            {
                "name": "Bob Seager",
                "email": "bob.seager@ford.com"
            }
        ],
        "currentUser": {
            "name": "Dorian Smiley",
            "id": "1234",
            "email": "dsmiley@codestrap.me",
            "timezone": "America/Los_Angeles"
        },
        "messages": [],
        "reasoning": "Bob Seager works at Ford as is likely the Bob being reffered to."
    }
    `;

    const system = `You are a helpful AI assistant tasked with extracting relevant context details for user tasks. 
    You always obey the user instructions and pay close attention to detail. You are not chatty and always respond in the requested JSON structure, nothing else.`;
    const response = await Gemini_2_0_Flash.createGenericChatCompletion(
        {
            messages: [
                { role: "SYSTEM", contents: [{ text: system }] },
                { role: "USER", contents: [{ text: user }] }
            ]
        }
    );
    const result = extractJsonFromBackticks(response.completion?.replace(/\,(?!\s*?[\{\[\"\'\w])/g, "") ?? "{}").replace(/(\r\n|\n|\r)/gm, "");
    const parsedResult = JSON.parse(result) as ModelMemory;

    return parsedResult;
}