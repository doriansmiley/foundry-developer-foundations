import { UserProfile } from "./userProfile";
import { Context, MachineEvent } from "../../reasoning/types";

export type CurrentDateTime = {
    currentLocalDateTime: string,
    currentGMTDateTme: string,
    isPacificDaylightTime: boolean,
}

export async function dateTime(context: Context, event?: MachineEvent, task?: string): Promise<CurrentDateTime> {
    // find the user profile state
    const lastStackKey = context?.stack?.find(stackItem => stackItem.indexOf('userProfile') >= 0);
    const userDetails: UserProfile = {
        name: undefined,
        id: undefined,
        email: undefined,
        timezone: "America/Los_Angeles",
    };
    // if we found a state that retrieved a user profile grab it
    if (lastStackKey) {
        const retrievedUser = context[lastStackKey] as UserProfile;
        userDetails.name = retrievedUser.name;
        userDetails.id = retrievedUser.id;
        userDetails.email = retrievedUser.email;
        userDetails.timezone = retrievedUser.timezone;
    }

    // Figure out of PDT is in effect
    const options = {
        timeZone: userDetails.timezone ?? "America/Los_Angeles",
        timeZoneName: "short" // This will produce "PST" or "PDT"
    };
    //@ts-ignore
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formatted = formatter.format(new Date());

    console.log(`formatted int date: ${formatted}`);
    const isPacificDaylightTime = formatted.includes("PDT");
    const currentLocalDateTime = new Date().toLocaleString("en-US", { timeZone: userDetails.timezone });
    const currentGMTDateTme = new Date().toISOString();

    return {
        isPacificDaylightTime,
        currentLocalDateTime,
        currentGMTDateTme,
    };
}