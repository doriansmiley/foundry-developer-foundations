import { Context, MachineEvent } from "../../reasoning/types";
import { User, Users } from "@foundry/functions-api";

export type UserProfile = {
    name: string | undefined,
    id: string | undefined,
    email: string | undefined,
    timezone: string | undefined,
}

// This function enriches the context with the most likely user profiles relevant to the user's request
// This is usefule for sending emails and status reports where files need to be referenced
export async function userProfile(context: Context, event?: MachineEvent, task?: string): Promise<UserProfile> {
    const userProfile: UserProfile = {
        name: undefined,
        id: undefined,
        email: undefined,
        timezone: undefined,
    }

    if (context.userId) {
        const currentUser: User | undefined = await Users.getUserByIdAsync(context.userId);
        userProfile.name = `${currentUser?.firstName} ${currentUser?.lastName}`;
        userProfile.email = currentUser?.email;
        userProfile.id = currentUser?.id;
        userProfile.timezone = 'America/Los_Angeles'; // hard code for now, will need some way to look this up in the future
    }

    return userProfile;
}