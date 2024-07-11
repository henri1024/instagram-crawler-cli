import { Schema, Document, model } from 'mongoose';

interface AccountCredentialInterface extends Document {
  email: string;
  cookies: [Object];
}

const AccountCredentialSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    cookies: { type: [Object], required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const AccountCredential = model<AccountCredentialInterface>(
  'account_credential',
  AccountCredentialSchema
);

export { AccountCredential, AccountCredentialInterface };
