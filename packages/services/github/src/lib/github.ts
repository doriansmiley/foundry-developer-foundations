import { createAppAuth } from "@octokit/auth-app";
import { AuthInterface } from "@octokit/auth-app/dist-types/types";

let authInstance: AuthInterface | undefined;

export function getGithubAuth() {
  if (!authInstance) {
    // Decode the base64 key once at startup
    const privateKey = Buffer.from(process.env.GITHUB_PRIVATE_KEY!, "base64").toString("utf8");

    const auth = createAppAuth({
      appId: parseInt(process.env.GITHUB_APP_ID!, 10),
      privateKey,
      clientId: process.env.GITHUB_APP_CLIENT_ID!,
      clientSecret: process.env.GITHUB_APP_CLIENT_SECRET!,
    });
    authInstance = auth;
  }
  
  return authInstance;
}

