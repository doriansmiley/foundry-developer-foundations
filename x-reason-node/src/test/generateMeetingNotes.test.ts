import { generateMeetingNotes } from '../functions/comsFunctions/GenerateMeetingNotes';
import { Context } from '@xreason/reasoning/types';
import { container } from '@xreason/inversify.config';
import { TYPES } from '@xreason/types';

// 1. Mock GeminiService via container.get()
const mockGeminiService = jest.fn();
jest.mock('@xreason/inversify.config', () => ({
  container: {
    get: jest.fn(),
  },
}));

// 2. Mock extractJsonFromBackticks
jest.mock('@xreason/utils', () => ({
  ...jest.requireActual('@xreason/utils'),
  extractJsonFromBackticks: (str: string) => str,
}));

describe('generateMeetingNotes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock GeminiService for every test
    (container.get as jest.Mock).mockImplementation((token) => {
      if (token === TYPES.GeminiService) return mockGeminiService;
      return undefined;
    });
  });

  it('returns summary and action items from a messy, realistic transcript', async () => {
    const fakeTranscript = `
      00:00:01 John Doe: Um, okay, so... I think we—wait, is this thing recording? 
      00:00:03 [Laughter]
      00:00:04 Jane Smith: Yeah, it’s on. So, last week we talked about the launch date... does anyone have an update? 
      00:00:09 Mike Brown: Uh, yeah, I emailed the vendor, and um, he said, like, shipping should be, I dunno, like two weeks out? 
      00:00:15 John Doe: So, that would push us to, what, the 24th? 
      00:00:18 Jane Smith: Uhh... yeah, assuming no more delays. Oh, also, can someone update the client? 
      00:00:22 Mike Brown: I can do that.
      00:00:25 John Doe: Cool, oh, did anyone finish the slides?
      00:00:27 Jane Smith: I’ll take care of it after this.
      00:00:29 [Door slams]
      00:00:30 Mike Brown: Sorry, that was my kid.
      00:00:32 John Doe: All good. Anything else?
      00:00:34 Jane Smith: No, that’s it. I’ll send out the notes.
      00:00:36 [End of meeting]
    `;

    mockGeminiService.mockResolvedValue(`
{
  "summary": "The team confirmed the launch date is likely the 24th pending vendor shipping. Jane will finish the slides and send out notes. Mike will update the client.",
  "actionItems": [
    "Mike to update the client on launch date",
    "Jane to finish the slides and send out notes"
  ]
}
    `);

    // Context: the second-to-last stack key is where the transcript lives
    const context: Context = {
      stack: ['transcribeMeeting', 'generateMeetingNotes'],
      transcribeMeeting: { transcript: fakeTranscript },
    } as any;

    const result = await generateMeetingNotes(context);

    expect(result.summary).toMatch(/launch date.*24th/i);
    expect(result.actionItems).toContain('Mike to update the client on launch date');
    expect(result.actionItems).toContain('Jane to finish the slides and send out notes');
    expect(result.transcriptExcerpt).toContain('Um, okay, so...');
  });

  it('throws an error if transcript is missing', async () => {
    const context: Context = {
      stack: ['transcribeMeeting', 'generateMeetingNotes'],
      transcribeMeeting: {}, // <-- transcript missing
    } as any;

    await expect(generateMeetingNotes(context)).rejects.toThrow('Transcript is required to generate meeting notes!');
  });

  it('throws an error if stack is empty', async () => {
    const context: Context = {
      stack: [],
    } as any;

    await expect(generateMeetingNotes(context)).rejects.toThrow('No transcript found in context.');
  });
});
