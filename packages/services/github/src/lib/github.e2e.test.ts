import { getGithubAuth } from "./github";
import { createAppAuth } from "@octokit/auth-app";

describe("getGithubAuth", () => {

  it("creates and caches a single auth instance", async () => {
    const auth1 = getGithubAuth();
    const auth2 = getGithubAuth();

    // ✅ Both calls return the same instance (singleton behavior)
    expect(auth1).toBe(auth2);

    // ✅ It should auth
    const appAuthentication = await auth1({ type: "app" });
    expect(appAuthentication).toHaveProperty("token");
    expect(appAuthentication).toHaveProperty("expiresAt");
    expect(appAuthentication).toHaveProperty("type");
    expect(appAuthentication).toHaveProperty("appId");
  });

});
