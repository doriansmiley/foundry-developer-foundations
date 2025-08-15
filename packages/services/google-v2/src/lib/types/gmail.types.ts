import { Static, Type } from '@sinclair/typebox';

export const GmailSchemas = {
  SendEmail: {
    input: Type.Object({
      recipients: Type.Array(Type.String()),
      subject: Type.String(),
      message: Type.String(),
    }),
    output: Type.Object({
      id: Type.String(),
      threadId: Type.String(),
      labelIds: Type.Array(Type.String()),
    }),
  },
  ReadEmailHistory: {
    input: Type.String(),
    output: Type.Object({
      messages: Type.Array(
        Type.Object({
          subject: Type.Optional(Type.String()),
          from: Type.Optional(Type.String()),
          body: Type.Optional(Type.String()),
          id: Type.Optional(Type.String()),
          threadId: Type.Optional(Type.String()),
        })
      ),
    }),
  },
  WatchEmails: {
    input: Type.Object({
      config: Type.Array(
        Type.Object({
          topicName: Type.String(),
          users: Type.Array(Type.String()),
          labelIds: Type.Array(Type.String()),
          labelFilterBehavior: Type.String(),
        })
      ),
    }),
    output: Type.Object({
      status: Type.Integer(),
      errors: Type.Optional(Type.Array(Type.String())),
      responses: Type.Optional(Type.Array(Type.String())),
    }),
  },
};

export type SendEmailInput = Static<typeof GmailSchemas.SendEmail.input>;
export type SendEmailOutput = Static<typeof GmailSchemas.SendEmail.output>;

export type WatchEmailsInput = Static<typeof GmailSchemas.WatchEmails.input>;
export type WatchEmailsOutput = Static<typeof GmailSchemas.WatchEmails.output>;

export type EmailMessage = {
  subject?: string;
  from?: string;
  body?: string;
  id?: string;
  threadId?: string;
};

export interface ReadEmailHistoryContext {
  email: string;
  publishTime: string;
  labels?: string[];
}

export interface EmailContext {
  from: string;
  recipients: string[];
  subject: string;
  message: string;
}
