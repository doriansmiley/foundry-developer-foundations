# Google Service Package 🚀

A comprehensive Google Workspace integration library providing seamless access to Gmail and Google Calendar APIs. This package offers both v1 and v2 clients with enhanced functionality for email management, calendar operations, and intelligent meeting scheduling.

## 📋 Available Functions

### Email Operations

#### `sendEmail`

- **Input**:

```typescript
{
  from: "sender@company.com",
  recipients: ["recipient1@example.com", "recipient2@example.com"],
  subject: "Project Update Meeting",
  message: "Hi team, let's schedule our weekly sync. Please review the agenda attached."
}
```

- **Output**:

```typescript
{
  id: "18e2c3f4a5b6c7d8",
  threadId: "18e2c3f4a5b6c7d8",
  labelIds: ["SENT", "INBOX"]
}
```

- **Description**: Sends an email through Gmail API with support for multiple recipients. Returns the message ID and thread information for tracking and follow-up operations.

#### `readEmailHistory`

- **Input**:

```typescript
{
  email: "user@company.com",
  publishTime: "2024-01-15T10:30:00Z",
  labels: ["INBOX", "IMPORTANT"]
}
```

- **Output**:

```typescript
{
  messages: [
    {
      subject: 'Re: Project Timeline',
      from: 'client@example.com',
      body: 'Thanks for the update. The timeline looks good.',
      id: '18e2c3f4a5b6c7d8',
      threadId: '18e2c3f4a5b6c7d8',
    },
  ];
}
```

- **Description**: Retrieves email history from a specific timestamp with optional label filtering. Perfect for processing incoming emails and extracting relevant communication data.

#### `watchEmails`

- **Input**:

```typescript
{
  config: [
    {
      topicName: 'projects/my-project/topics/gmail-push',
      users: ['user1@company.com', 'user2@company.com'],
      labelIds: ['INBOX', 'IMPORTANT'],
      labelFilterBehavior: 'include',
    },
  ];
}
```

- **Output**:

```typescript
{
  status: 200,
  errors: [],
  responses: ["Watch successfully created for user1@company.com"]
}
```

- **Description**: Sets up Gmail push notifications for real-time email monitoring. Enables automated workflows triggered by incoming emails matching specific criteria.

### Calendar Operations

#### `scheduleMeeting`

- **Input**:

```typescript
{
  summary: "Product Planning Session",
  description: "Quarterly product roadmap review and planning",
  start: "2024-02-15T14:00:00-08:00",
  end: "2024-02-15T15:30:00-08:00",
  attendees: ["john@company.com", "sarah@company.com", "mike@company.com"]
}
```

- **Output**:

```typescript
{
  id: "abc123def456ghi789",
  htmlLink: "https://calendar.google.com/calendar/event?eid=...",
  status: "confirmed"
}
```

- **Description**: Creates a calendar event with specified attendees and automatically sends invitations. Returns the event details including a direct link for easy access.

#### `getAvailableMeetingTimes` (v1)

- **Input**:

```typescript
{
  participants: ["alice@company.com", "bob@company.com"],
  subject: "Design Review Meeting",
  timeframe_context: "this week",
  duration_minutes: 60,
  working_hours: {
    start_hour: 9,
    end_hour: 17
  }
}
```

- **Output**:

```typescript
{
  suggested_times: [
    {
      start: "2024-02-14T10:00:00-08:00",
      end: "2024-02-14T11:00:00-08:00",
      score: 0.95
    },
    {
      start: "2024-02-15T14:00:00-08:00",
      end: "2024-02-15T15:00:00-08:00",
      score: 0.87
    }
  ],
  message: "Found 2 optimal meeting times based on participant availability"
}
```

- **Description**: Analyzes participant calendars to find optimal meeting times within specified constraints. Uses intelligent scoring to rank suggestions based on availability and preferences.

#### `getAvailableMeetingTimes` (v2 - Enhanced)

- **Input**: Same as v1
- **Output**:

```typescript
{
  message: "Found 3 suggested times",
  suggested_times: [
    {
      start: "2024-02-14T10:00:00-08:00",
      end: "2024-02-14T11:00:00-08:00",
      score: 0.95
    }
  ]
}
```

- **Description**: Enhanced version with improved scheduling algorithms and better conflict resolution. Provides more accurate availability analysis with refined scoring mechanisms.

### Advanced Operations (v2 Only)

#### `summarizeCalendars`

- **Input**:

```typescript
{
  emails: ["team-lead@company.com", "designer@company.com", "developer@company.com"],
  timezone: "America/Los_Angeles",
  windowStartLocal: new Date("2024-02-12T00:00:00"),
  windowEndLocal: new Date("2024-02-16T23:59:59")
}
```

- **Output**:

```typescript
{
  message: "Calendar summary for 3 team members over 5 days",
  calendars: [
    {
      email: "team-lead@company.com",
      events: [
        {
          id: "event123",
          subject: "Sprint Planning",
          description: "Planning for next sprint",
          start: "2024-02-14T09:00:00-08:00",
          end: "2024-02-14T10:30:00-08:00",
          durationMinutes: 90,
          attendees: ["dev1@company.com", "dev2@company.com"],
          meetingLink: "https://meet.google.com/abc-defg-hij"
        }
      ]
    }
  ]
}
```

- **Description**: Generates comprehensive calendar summaries for multiple team members across specified time windows. Provides detailed event information including meeting links and attendee lists for better coordination.

## 🔧 Usage Examples

### Using with Dependency Injection Container

```typescript
import { container } from '@codestrap/developer-foundations-di';
import { TYPES } from '@codestrap/developer-foundations-types';

// Get v1 service
const officeService = await container.getAsync<OfficeService>(
  TYPES.OfficeService
);

// Get v2 service (recommended for new projects)
const officeService = await container.getAsync<OfficeServiceV2>(
  TYPES.OfficeService
);

// Send an email
const emailResult = await officeService.sendEmail({
  from: 'admin@company.com',
  recipients: ['team@company.com'],
  subject: 'Weekly Update',
  message: "Here's this week's progress summary...",
});

// Find optimal meeting times (v2)
const meetingTimes = await officeServiceV2.getAvailableMeetingTimes({
  participants: ['alice@company.com', 'bob@company.com'],
  subject: 'Project Kickoff',
  timeframe_context: 'next week',
  duration_minutes: 60,
  working_hours: { start_hour: 9, end_hour: 17 },
});
```

### Direct Client Usage

```typescript
// Initialize v1 client
const gSuiteClient = await makeGSuiteClient('user@company.com');

// Initialize v2 client (recommended)
const gSuiteClientV2 = await makeGSuiteClientV2('user@company.com');

// Schedule a meeting
const meeting = await gSuiteClient.scheduleMeeting({
  summary: 'All Hands Meeting',
  description: 'Monthly company-wide update',
  start: '2024-02-20T15:00:00-08:00',
  end: '2024-02-20T16:00:00-08:00',
  attendees: ['everyone@company.com'],
});

// Get calendar summaries (v2 exclusive)
const summary = await gSuiteClientV2.summarizeCalendars({
  emails: ['manager@company.com', 'lead@company.com'],
  timezone: 'America/New_York',
  windowStartLocal: new Date('2024-02-19T00:00:00'),
  windowEndLocal: new Date('2024-02-23T23:59:59'),
});
```

## 🏗️ Built With

- Google APIs Client Library
- OAuth2 Service Account Authentication
- TypeScript for type safety
- Comprehensive error handling and logging

## 📝 Notes

- **v2 Client**: Recommended for new implementations with enhanced features and improved algorithms
- **v1 Client**: Stable version for existing integrations
- **Authentication**: Uses Google Service Account with domain-wide delegation
- **Rate Limiting**: Built-in respect for Google API quotas and limits
