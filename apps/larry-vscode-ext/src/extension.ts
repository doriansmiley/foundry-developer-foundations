import * as vscode from 'vscode';

type Agent = { id: string; label: string; enabled: boolean };

const AGENTS: Agent[] = [
  {
    id: 'auto',
    label: 'Auto (let\u2019s figure it out from your first request)',
    enabled: true,
  },
  { id: 'google', label: 'Google Coding Agent', enabled: true },
  { id: 'slack', label: 'Slack Coding Agent (disabled)', enabled: false },
  {
    id: 'microsoft',
    label: 'Microsoft Coding Agent (disabled)',
    enabled: false,
  },
];

export function activate(context: vscode.ExtensionContext) {
  const provider = new LarryViewProvider(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('larryHome', provider, {
      webviewOptions: { retainContextWhenHidden: true },
    })
  );
}

class LarryViewProvider implements vscode.WebviewViewProvider {
  private view: vscode.WebviewView | undefined;
  private currentAgent: Agent | undefined;

  constructor(private readonly context: vscode.ExtensionContext) {}

  resolveWebviewView(view: vscode.WebviewView) {
    this.view = view;
    view.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this.context.extensionUri, 'media'),
      ],
    };

    const scriptUri = view.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'webview.js')
    );
    const styleUri = view.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'webview.css')
    );
    const overridesUri = view.webview.asWebviewUri(
      vscode.Uri.joinPath(this.context.extensionUri, 'media', 'overrides.css')
    );
    const nonce = String(Date.now());
    const csp = [
      "default-src 'none'",
      `img-src ${view.webview.cspSource} https: data:`,
      `style-src ${view.webview.cspSource} 'unsafe-inline'`,
      `font-src ${view.webview.cspSource} https:`,
      `script-src 'nonce-${nonce}' ${view.webview.cspSource}`,
    ].join('; ');

    view.webview.html = `<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Security-Policy" content="${csp}">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="${styleUri}">
	<link rel="stylesheet" href="${overridesUri}">
</head>
<body>
	<div id="root"></div>
	<script nonce="${nonce}">window.__FOUNDRY_AGENT__ = "${
      this.currentAgent?.id ?? ''
    }";</script>
	<script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;

    view.webview.onDidReceiveMessage(async (msg) => {
      if (msg?.type === 'selectAgent') {
        const next = AGENTS.find((a) => a.id === msg.agentId);
        if (!next || !next.enabled) {
          vscode.window.showInformationMessage(
            'This agent is not available yet.'
          );
          return;
        }
        this.currentAgent = next;
        view.webview.postMessage({ type: 'agentChanged', agentId: next.id });
        return;
      }
      if (msg?.type === 'userMessage') {
        const agent = this.currentAgent ?? AGENTS[0];
        const reply = await handleUserMessage(msg.text, agent);
        view.webview.postMessage({ type: 'assistantMessage', text: reply });
        return;
      }
    });
  }
}

// Mocked response
async function handleUserMessage(
  _text: string,
  _agent: Agent
): Promise<string> {
  return `- **Design spec**
  - **Overview**: Modify the \`scheduleMeeting\` delegate to support optional attendees. The \`CalendarContext\` interface will be updated to include \`attendees: { email: string; optional?: boolean; }[]\`. This change will allow the function to create calendar events with both required and optional attendees. Expose it only via \`gsuiteClient.ts\`.
  - **Constraints**
    - **Language**: TypeScript
    - **Library**: \`googleapis@149.0.0\`
    - **Exposure**: Only through \`gsuiteClient.ts\`
    - **Package conventions**:
      - Delegates under \`src/lib/delegates/\`
      - Tests under \`src/lib/tests/\`
      - Public API exposed via \`gsuiteClient.ts\`
  - **Auth scopes required** (must be configured in \`gsuiteClient.ts\` calendar scopes):
    - \`https://www.googleapis.com/auth/calendar\` - Allows read and write access to Calendars and related settings.
    - \`https://www.googleapis.com/auth/calendar.events\` - Allows read and write access to Calendar events.
  - **External API reference**: \`calendar.events.insert\` — \`https://developers.google.com/calendar/api/v3/reference/events/insert\`
    - **Description:** Creates an event in the specified calendar.
    - **HTTP Request:** \`POST https://www.googleapis.com/calendar/v3/calendars/calendarId/events\`
    - **Path Parameters:**
      - \`calendarId\` (string, required): Calendar identifier. Use "primary" to access the primary calendar of the logged-in user. To retrieve other calendar IDs call the \`calendarList.list\` method.
    - **Query Parameters (Optional):**
      - \`conferenceDataVersion\` (integer): Version number of conference data supported by the API client. \`0\` assumes no support, \`1\` enables support. Default: \`0\`.
      - \`sendUpdates\` (string): Whether to send notifications about the creation of the new event.  Acceptable values: \`"all"\), \`"externalOnly"\), \`"none"\`. Default: \`false\`.
      - \`supportsAttachments\` (boolean): Whether API client performing operation supports event attachments. Default: \`false\`.
    - **Request Body:**  An \`Events\` resource. Key properties include:
      - \`summary\` (string, writable): Title of the event.
      - \`description\` (string, writable): Description of the event. Can contain HTML.
      - \`start\` (object, required, writable): Start time of the event. Contains \`dateTime\` (RFC3339 format) and \`timeZone\`.
      - \`end\` (object, required, writable): End time of the event. Contains \`dateTime\` (RFC3339 format) and \`timeZone\`.
      - \`attendees\` (array of objects, writable):  The attendees of the event.  Each object contains:
        - \`email\` (string, required):  The attendee's email address.
        - \`optional\` (boolean, optional, default: false): Whether this is an optional attendee.
      - \`conferenceData\` (object, writable): Conference-related information, such as details of a Google Meet conference.  Use \`createRequest\` to create new conference details.
    - **Response:** If successful, returns an \`Events\` resource.
    - **Authorization:** Requires one of the following scopes: \`https://www.googleapis.com/auth/calendar\`, \`https://www.googleapis.com/auth/calendar.events\`, \`https://www.googleapis.com/auth/calendar.app.created\`, \`https://www.googleapis.com/auth/calendar.events.owned\`.
  - **Inputs and outputs**
    - **Input type**: \`CalendarContext\`
      - \`summary: string\` (required)
      - \`description?: string\` (optional)
      - \`start: string\` (ISO format, required)
      - \`end: string\` (ISO format, required)
      - \`attendees: { email: string; optional?: boolean; }[]\` (required)
    - **Output type**: \`ScheduleMeetingOutput\`
      - \`id: string\`, \`htmlLink: string\`, \`status: string\`
  - **Functional behavior**
    - Validate required fields; construct event body with attendees, differentiating between required and optional attendees based on the \`optional\` flag, and request \`conferenceData\` for Google Meet.
    - Call \`calendar.events.insert\` with \`sendUpdates: 'all'\` and \`conferenceDataVersion: 1\`.
    - Ensure Meet link is present via \`hangoutLink\` or \`conferenceData.entryPoints\`.
    - Return \`{ id, htmlLink, status }\`.
  - **Error handling**
    - Throw if event creation succeeds without a Meet link.
    - Surface underlying API errors.
  - **Security and privacy**
    - Do not log sensitive event content.
  - **Acceptance criteria**
    - Event is created with Meet link and invitations sent to both required and optional attendees.
    - Implemented and exposed only via \`gsuiteClient.ts\`; required scopes present there.
  - **Usage (via client)**

\`\`\`typescript
import { makeGSuiteClient } from './lib/gsuiteClient';

const client = await makeGSuiteClient('user@company.com');

const meeting = await client.scheduleMeeting({
  summary: 'Product Planning Session',
  description: 'Quarterly product roadmap review and planning',
  start: '2024-02-15T14:00:00-08:00',
  end: '2024-02-15T15:30:00-08:00',
  attendees: [
    { email: 'john@company.com' }, // Required
    { email: 'sarah@company.com', optional: true }, // Optional
    { email: 'mike@company.com' }, // Required
  ],
});
\`\`\`
  `;
}

export function deactivate() {}
