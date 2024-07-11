// src/commands/hello.ts
import { Command } from 'commander';
import readline from 'readline/promises';
import { launch } from 'puppeteer';
import { upsertAccountCredential } from '../repository/account-credential';
import { AccountCredential } from '../models/account-credential';

var validator = require('validator');

async function spawnSigninPuppeteer(email: string) {
  if (!validator.isEmail(email)) {
    throw new Error('invalid email address');
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const browser = await launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/');

  await rl.question('press any key after signin?');
  rl.close();

  const cookies = await page.cookies();
  const igCred = new AccountCredential({ email: email, cookies: cookies });
  await upsertAccountCredential(igCred);

  browser.close();
}

export const signInInstagram = new Command('signin-instagram')
  .description('spawn headless browser to signin into instagram')
  .argument('<email>', 'email address to login')
  .action((email) => {
    spawnSigninPuppeteer(email);
  });
