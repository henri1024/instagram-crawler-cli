import {
  AccountCredential,
  AccountCredentialInterface,
} from '../models/account-credential';
import { connectDB, closeDB } from '../config/mongodb';

/**
 * Upserts an account credential based on the provided data.
 *
 * @param {AccountCredentialInterface} credentialData - The data of the account credential to upsert.
 * @return {Promise<AccountCredentialInterface | null>} The upserted account credential or null if not found.
 */
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

/**
 * Retrieves an account credential based on the provided email.
 *
 * @param {String} email - The email of the account credential to retrieve.
 * @return {Promise<AccountCredentialInterface | null>} A promise that resolves to the account credential or null if not found.
 * @throws {Error} If an error occurs while connecting to the database or retrieving the account credential.
 */
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
