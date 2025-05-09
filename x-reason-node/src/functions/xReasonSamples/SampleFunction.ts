import { Context } from "../../reasoning/types";

export async function sampleFunction(context: Context): Promise<{result: string}> {
    return new Promise((resolve) => {
        //@ts-ignore
        setTimeout(() => {
            resolve({
                result: 'This is a sample function response. It can be any object you like',
            });
        }, 500);
    })
}