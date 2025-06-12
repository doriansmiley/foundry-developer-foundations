import type { FoundryClient, ContactsDao } from "@xreason/types";
import { TYPES } from "@xreason/types";
import { container } from "@xreason/inversify.config";
import { readContact } from "@xreason/domain/delegates/contacts/read";
import { searchContacts } from "./delegates/contacts/search";

export function makeContactsDao(): ContactsDao {
    const client = container.get<FoundryClient>(TYPES.FoundryClient);

    return {
        // TODO code out all methods using OSDK API calls
        upsert: async (
            primaryKey_: string,
            email: string,
            firstName: string,
            lastName: string,
            codestrapPoc?: string[],
            company?: string,
            contactCategory?: string,
            countryOfResidence?: string,
            executiveAssistant?: string,
            fullName?: string,
            keyAccounts?: string,
            linkedIn?: string,
            notes?: string[],
            phoneNumberMain?: string,
            phoneNumberSecondary?: string,
            relationshipStatus?: string[],
            role?: string,
            talksTo?: string,
        ) => {
            console.log(`stub upsert method for Contacts. We do not support upsert for this object type.`)
            return {
                primaryKey_,
                email,
                firstName,
                lastName,
                codestrapPoc,
                company,
                contactCategory,
                countryOfResidence,
                executiveAssistant,
                fullName,
                keyAccounts,
                linkedIn,
                notes,
                phoneNumberMain,
                phoneNumberSecondary,
                relationshipStatus,
                role,
                talksTo,
            }
        },
        delete: async (id: string) => console.log(`stub delete method called for: ${id}. We do not support deleting RfpRequests but include the method as it is part of the interface.`),
        read: async (id: string) => {
            const contact = await readContact(id, client);

            return contact;
        },
        search: async (fullName: string, company: string, pageSize?: number) => {
            const result = await searchContacts(fullName, company, client, pageSize);

            return result;
        },
    }
};