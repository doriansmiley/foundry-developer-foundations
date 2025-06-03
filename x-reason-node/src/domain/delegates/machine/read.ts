import { FoundryClient, MachineExecutions } from "@xreason/types";

export async function readMachineExecution(id: string, client: FoundryClient): Promise<MachineExecutions> {
    console.log(`readMachineExecution id: ${id}`);

    const token = await client.auth.signIn();
    const apiKey = token.access_token;

    const headers = {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
    };

    const url = `${client.url}/api/v2/ontologies/ontology-c0c8a326-cd0a-4f69-a575-b0399c04b74d/objects/MachineExecutions/${id}`;
    const machineFetchResults = await fetch(url, {
        method: "GET",
        headers: headers,
    });

    const machine = await machineFetchResults.json() as MachineExecutions;
    console.log(`the machine execution ontology returned: ${JSON.stringify(machine)}`)

    return machine;
}