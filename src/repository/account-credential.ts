import {
  AccountCredential,
  AccountCredentialInterface,
} from '../models/account-credential';
import { connectDB, closeDB } from '../config/mongodb';

const upsertAccountCredential = async (
  credentialData: AccountCredentialInterface
): Promise<AccountCredentialInterface | null> => {
  try {
    await connectDB();

    const filter = { email: credentialData.email };
    const updateData = {
      cookies: credentialData.cookies,
    };
    const result = await AccountCredential.updateOne(filter, updateData, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }).exec();

    return await AccountCredential.findOne(filter);
  } catch (error: any) {
    throw new Error('An error Occured: ' + error);
  } finally {
    await closeDB();
  }
};

const getAccountCredential = async (
  email: String
): Promise<AccountCredentialInterface | null> => {
  try {
    await connectDB();
    const filter = { email: email };
    return await AccountCredential.findOne(filter);
  } catch (error: any) {
    throw new Error('An error Occured: ' + error);
  } finally {
    await closeDB();
  }
};

export { upsertAccountCredential, getAccountCredential };
