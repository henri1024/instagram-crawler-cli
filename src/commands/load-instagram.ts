// src/commands/hello.ts
import { Command } from 'commander';
import readline from 'readline/promises';
import { launch } from 'puppeteer';
import {
  upsertAccountCredential,
  getAccountCredential,
} from '../repository/account-credential';
import { AccountCredential } from '../models/account-credential';

var validator = require('validator');

async function loadSavedSessionPuppeteer(email: string) {
  if (!validator.isEmail(email)) {
    throw new Error('invalid email address');
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const accountCredential = await getAccountCredential(email);
  if (accountCredential == null) {
    throw new Error(`no session stored by email ${email}`);
  }

  const browser = await launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.setCookie(...(accountCredential.cookies as any));
  await page.goto('https://www.instagram.com/');

  await rl.question('press any key to save session and quit browser?');
  rl.close();

  const cookies = await page.cookies();
  const igCred = new AccountCredential({ email: email, cookies: cookies });
  await upsertAccountCredential(igCred);

  browser.close();
}

export const loadInstagram = new Command('load-instagram')
  .description('spawn headless browser by saved email session')
  .argument('<email>', "session's email address")
  .action((email) => {
    loadSavedSessionPuppeteer(email);
  });
