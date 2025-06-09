// process-env.d.ts
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            FOUNDRY_STACK_URL: string;
            FOUNDRY_TOKEN: string;
            OSDK_CLIENT_ID: string;
            OSDK_CLIENT_SECRET: string;
            OPEN_WEATHER_API_KEY: string;
            LOG_PREFIX: string;
            ONTOLOGY_RID: string;
            ONTOLOGY_ID: string;
            GOOGLE_SEARCH_API_KEY: string;
            GOOGLE_SEARCH_ENGINE_ID: string;
            GOOGLE_SEARCH_ENGINE_MARKETS: string;
            GEMINI_API_KEY: string;
            BROWSERFY_KEY: string;
            BROWSERFY_BROWSER_URL: string;
            RANGR_OSDK_CLIENT_ID: string;
            RANGR_OSDK_CLIENT_SECRET: string;
            RANGR_FOUNDRY_STACK_URL: string;
            RANGR_ONTOLOGY_RID: string;
            OFFICE_SERVICE_ACCOUNT: string;
        }
    }
}
export { };