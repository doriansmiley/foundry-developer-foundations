let log = '';
export function getLogger() {
    return {
        getLog: () => log,
        logger: (message: string) => log = `${log}\n${message}\n`,
    }
}