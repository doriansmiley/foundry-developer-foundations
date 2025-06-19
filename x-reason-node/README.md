# WiP: Foundry Developer Foundations
### IMPORTANT: This project is under active development and refactoring in preparation for v0
### IMPORTANT: This README is also under active development and not ready for use.
As part of our v0 release, we are implementing the FDF pattern for developers to allow devs without a Foundry stack to participate. The code can also run outside of Foundry using a Docker container once the migration is complete.
You will need to replace Foundry native implementations for the `domain` and `services` packages. You'll likely also need to define an API with `express` or similar then create a new `Dockerfile` to expose your API. 

This means as of today do not use this code in your external applications. We are looking for contributors. You can participate without a Foundry stack by following the contributor guide. We expect a v0 release in June 2025.

## Introduction
This application is an implementation of the **Foundry‑backed / GitHub‑native** collaboration pattern created by CodeStrap, LLC.
The goal: let any JavaScript / TypeScript engineer contribute business logic to a Palantir Foundry deployment **without needing direct Foundry expertise or access**. Please see the [hello-world](../hello-world/README.md) application to understand the pattern before proceeding.

## Getting Started
1. First, if you are a Foundry developer, download and install the [X-Reason](#) Marketplace application on your Foundry stack. We have implemented mocks in our jest tests so if you don't have a Foundry stack skip this step.
1. Run `npm install`
1. Create a `.env` file and set the following values
```
# Foundry Env Vars Only required for Foundry devs with a stack 
FOUNDRY_STACK_URL=<your stack url if you have one, otherwise set to a placeholder value>
OSDK_CLIENT_SECRET=<your osdk client secret if you have one, otherwise set to a placeholder value>
OSDK_CLIENT_ID=<your osdk client id if you have one, otherwise set to a placeholder value>
ONTOLOGY_RID=<your ontology rid if you have one, otherwise set to a placeholder value>
ONTOLOGY_ID=<your ontology rid if you have one, otherwise set to a placeholder value>

# Not required, set to a default value. This is only used in the sample weather service to demonstrate using an external service
OPEN_WEATHER_API_KEY=<an open weather API key https://home.openweathermap.org/>
LOG_PREFIX=foundry-developer-foundations-x-reason

# Google env vars required for e2e testing of sending emails, scheduling meetings, and google search
GSUITE_SERVICE_ACCOUNT=<if you would to perform e2e testing, otherwise ignore>
GOOGLE_SEARCH_API_KEY=<if you would to perform e2e testing, otherwise ignore>
GOOGLE_SEARCH_ENGINE_ID=<if you would to perform e2e testing, otherwise ignore>
GOOGLE_SEARCH_ENGINE_MARKETS=<if you would to perform e2e testing, otherwise ignore>
GEMINI_API_KEY=<if you would to perform e2e testing, otherwise ignore>
# email for the service account, it service@mydomain.com
OFFICE_SERVICE_ACCOUNT=<if you would to perform e2e testing, otherwise ignore>

# Start partner variables, set these to defaults or an error will be thrown
RANGR_OSDK_CLIENT_ID=<set to a default value ie, "default">
RANGR_OSDK_CLIENT_SECRET=<set to a default value ie, "default">
RANGR_FOUNDRY_STACK_URL=<set to a default value ie, "default">
RANGR_ONTOLOGY_RID=<set to a default value ie, "default">

# Start OpenAI vars
OPEN_AI_KEY=<only set if you want to perform e2e testing, otherwise ignore>

# Start Slack vars
SLACK_CLIENT_ID=<only set if you want to perform e2e testing, otherwise ignore>
SLACK_CLIENT_SECRET=<only set if you want to perform e2e testing, otherwise ignore>
SLACK_SIGNING_SECRET=<only set if you want to perform e2e testing, otherwise ignore>
SLACK_BOT_TOKEN=<only set if you want to perform e2e testing, otherwise ignore>
SLACK_APP_TOKEN=<only set if you want to perform e2e testing, otherwise ignore>
SLACK_BASE_URL=https://slack.com/api
```