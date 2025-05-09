import { sendEmail, EmailThread }  from '../functions/comsFunctions/SendEmail';
import { Context } from '../reasoning';

jest.mock('@gsuite/computemodules', () => ({
  sendEmail: jest.fn()
}));

import { sendEmail as sendEmailFromComputeModule } from '@gsuite/computemodules';

describe('sendEmail', () => {
  const validEmailData = {
    message: 'Hello World',
    subject: 'Test Subject',
    recipients: ['test@example.com'],
    modelDialog: 'sample dialog',
    ts: 1234567890
  };

  const validContext = {
    stack: ['emailData', 'bullshit'],
    emailData: validEmailData
  } as any as Context;

  const mockResponse: EmailThread = {
    id: 'msg123',
    threadId: 'thread456',
    labelIds: ['inbox']
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (sendEmailFromComputeModule as jest.Mock).mockResolvedValue(mockResponse);
  });

  it('calls compute module sendEmail and returns the expected response', async () => {
    const response = await sendEmail(validContext);

    expect(sendEmailFromComputeModule).toHaveBeenCalledWith({
      recipients: validEmailData.recipients,
      subject: validEmailData.subject,
      message: validEmailData.message
    });
    expect(response).toEqual(mockResponse);
  });

  it('throws an error when no email data is found in context', async () => {
    const invalidContext = { stack: [] } as any as Context;
    await expect(sendEmail(invalidContext)).rejects.toThrow('No email data found in context');
  });

  it('throws an error when required email fields are missing', async () => {
    const missingFieldContext = {
      stack: ['emailData', 'bullshit'],
      emailData: {
        // message is missing
        subject: 'Test',
        recipients: ['test@example.com'],
        modelDialog: 'sample dialog',
        ts: 1234567890
      }
    } as any as Context;

    await expect(sendEmail(missingFieldContext)).rejects.toThrow('Invalid email data format in context');
  });
});
