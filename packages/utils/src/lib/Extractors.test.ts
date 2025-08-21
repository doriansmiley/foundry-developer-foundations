import { cleanJsonString, extractJsonFromBackticks } from './Extractors';
describe('Testing JSON extraction and clearning', () => {
    test('Should extract and clean JSON from a FUBAR string', () => {
        const inputJSON = `\`\`\`json
{
  "contacts": [],
  "currentUser": {
    "name": null,
    "email": "dsmiley@codestrap.me",
    "id": "cadf16c6-76c8-4ff2-8716-889f8797d547",
    "timezone": null
  },
  "messages": [
    "\\"# ** Daily Brief: Thursday, August 21, 2025 **\\\\n\\\\n## ** TL; DR **\\\\n1. ** Business-Related (CodeStrap) **: \\\\n   - ** Harshit Soni (CreativeGlu):** Proposed a meeting today (10:00–10:30 AM PT) to discuss \\\\\\"X Reason\\\\\\" and Foundry. Confirm availability or reschedule if needed.\\\\n   - ** Kerry Sporkin:** Meeting scheduled for tomorrow (Friday, August 22, 2025, 10:00–10:30 AM PT) to discuss Palantir implementations, Series A funding, and a strategic partnership with PWC. Confirm details today to avoid conflicts.\\\\n\\\\n2. ** Spam/Marketing Emails **: None detected.\\\\n\\\\n---\\\\n\\\\n## ** Business-Related Emails **\\\\n\\\\n### ** 1. Harshit Soni (CreativeGlu) – Meeting Proposal **\\\\n- ** Details **: \\\\n  - ** Topic **: CodeStrap inquiries regarding \\\\\\"X Reason\\\\\\" and Foundry.\\\\n  - ** Proposed Time **: Today, ** Thursday, August 21, 2025 **, from ** 10:00 AM to 10:30 AM PT **.\\\\n  - ** Attendees **:  \\\\n    - Dorian Smiley (<dsmiley@codestrap.me>)  \\\\n    - Harshit Soni (<harshit@creativeglu.ai>)\\\\n- ** Action Items **: \\\\n  1. Confirm availability of both attendees for the proposed time.\\\\n  2. If unavailable, propose alternative time slots and resolve scheduling conflicts.\\\\n  3. Send a follow-up email to Harshit to confirm the meeting or suggest rescheduling.  \\\\n     ** Email Draft **:  \\\\n     \\\`\\\`\\\`\\\\n     Hi Harshit,\\\\n\\\\n     I hope this message finds you well. I\\'ve checked for available times for our meeting on Thursday, August 21, 2025, from 10:00 AM to 10:30 AM (Pacific Time). Please let me know if this time works for you or if you\\'d like to reschedule.\\\\n\\\\n     Looking forward to your response.\\\\n\\\\n     Best regards,  \\\\n     Dorian Smiley\\\\n     \\\`\\\`\\\`\\\\n  4. Schedule the meeting in Google Calendar once confirmed: [Google Calendar Appointment Link](https://calendar.google.com/calendar/appointments/booking/AcZssZ0aYEsu_AL6fRFFwnjYP0cXwsbe36xOLKZWxqskikN22A3QXMRSyTW-HM-uiHtLSswtGz45Ga9x).\\\\n\\\\n---\\\\n\\\\n### **2. Kerry Sporkin – Meeting Scheduled for Tomorrow**\\\\n- **Details**: \\\\n  - **Topic**: Palantir implementations, Series A funding, and strategic partnership with PWC.\\\\n  - **Date/Time**: **Friday, August 22, 2025**, from **10:00 AM to 10:30 AM PT**.\\\\n  - **Attendees**: \\\\n    - Dorian Smiley (<dsmiley@codestrap.me>)  \\\\n    - Kerry Sporkin (<khsporkin@gmail.com>)\\\\n- **Key Discussion Points**: \\\\n  - Growing \\\\\\"cottage industry\\\\\\" around Palantir implementations.\\\\n  - CodeStrap LLC structure: exclusive partnerships, financial model, and investment strategy.\\\\n  - Transition to an ARR model and Series A funding plans.\\\\n  - Partnership with PWC to build AI-driven CFO solutions.\\\\n- **Action Items**: \\\\n  1. Confirm availability of all attendees today to avoid last-minute conflicts.\\\\n  2. Send a follow-up email to Kerry to confirm the meeting:  \\\\n     ** Email Draft **:  \\\\n     \\\`\\\`\\\`\\\\n     Hi Kerry,\\\\n\\\\n     I hope you\\'re doing well. Just confirming our meeting scheduled for Friday, August 22, 2025, from 10:00 AM to 10:30 AM (Pacific Time). Please let me know if this time still works or if there are any adjustments needed.\\\\n\\\\n     Looking forward to our discussion!\\\\n\\\\n     Best regards,  \\\\n     Dorian Smiley\\\\n     \\\`\\\`\\\`\\\\n  3. If conflicts arise, propose alternative times and reschedule promptly.\\\\n  4. Include a brief agenda in the calendar invite:  \\\\n     - Finalizing Series A strategy.  \\\\n     - Next steps for Palantir implementation opportunities.  \\\\n     - Operational details of the PWC partnership.\\\\n\\\\n**Additional Notes**: Full meeting notes from your previous discussion with Kerry are available [here](https://docs.google.com/document/d/1NwYRnCrQH3hAmdB5R_3mwhUF9wynzfPuLZbIb5AsRuo/edit?usp=meet_tnfm_email). Review them to prepare for tomorrow’s meeting.\\\\n\\\\n---\\\\n\\\\n## **Spam/Marketing Emails**\\\\nNo spam or marketing emails detected today. 🎉\\\\n\\\\n---\\\\n\\\\nThat’s it for today’s brief! Let me know if you need help with any of the tasks above. Have a productive Thursday, and enjoy your coffee!\\\\n\\\\nWarm regards,  \\\\n**Vicki** ☕  \\\\n*Your AI EA at CodeStrap*\\""
  ],
  "reasoning": "The message contains information about a meeting scheduled for tomorrow (August 22, 2025) with Kerry Sporkin. No contacts were found."
}
\`\`\``;

        const result = extractJsonFromBackticks(inputJSON);
        const clean = cleanJsonString(result);
        const parsed = JSON.parse(clean);

        expect(parsed).toBeDefined();
        expect(parsed.contacts.length).toBe(0);
        expect(parsed.currentUser.email).toBe('dsmiley@codestrap.me');
    });
})