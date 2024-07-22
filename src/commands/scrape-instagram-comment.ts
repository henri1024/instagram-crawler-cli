import { Command } from 'commander';
import { launch, KnownDevices } from 'puppeteer';
import { upsertAccountCredential } from '../repository/account-credential';
import { AccountCredential } from '../models/account-credential';
import { isHtmlPage, isValidIgPost, cleanIgUrl } from '../common/url-helpers';
import {
  extractScriptsWithNestedField,
  findTargetObject,
  isReachMaxFetched,
} from '../common/dom-helpers';
import { getAccountCredential } from '../repository/account-credential';
import { IntagramComment } from '../models/instagram-comment';
import { DomEdge } from '../models/dom-instagram-first-load';
import { setTimeout } from 'node:timers/promises';

import { FIRST_PAGE_URL_PREFIX, LOAD_PAGE_URL } from '../common/constant';

var fs = require('fs');

var jsdom = require('jsdom');
var JSDOM = jsdom.JSDOM;

/**
 * Spawns a Puppeteer instance to scrape Instagram comments.
 *
 * @param {string} email - The email address for authentication.
 * @param {string} url - The URL of the Instagram post to scrape comments from.
 * @return {Promise<void>} A Promise that resolves when the scraping and processing of comments is complete.
 */
async function spawnScrapeIgCommentPuppeteer(email: string, url: string) {
  // validate passed url
  if (!(await isHtmlPage(url))) {
    throw new Error('invalid url');
  }

  // Emulate the device
  const browser = await launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--window-position=0,0',
      '--ignore-certifcate-errors',
      '--ignore-certifcate-errors-spki-list',
    ],
  });
  const page = await browser.newPage();

  // Define the device you want to emulate (e.g., iPhone 13 Pro Max)
  const iPhone = KnownDevices['iPhone 13 Pro Max'];
  await page.emulate(iPhone);
  await page.emulateTimezone('Asia/Jakarta');
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
  });

  // set session cookie
  const accountCredential = await getAccountCredential(email);
  if (accountCredential == null) {
    throw new Error(`no session stored by email ${email}`);
  }
  await page.setCookie(...(accountCredential.cookies as any));

  // fetchedComments to store list of comment
  var fetchedComments: IntagramComment[] = [];

  // exporting first page of comments
  page.on('response', async (response) => {
    // skip if already get specific number of comments
    if (isReachMaxFetched(fetchedComments)) {
      return;
    }

    if (response.url().startsWith(FIRST_PAGE_URL_PREFIX)) {
      try {
        const responsePayloadString = await response.text();

        global.document = new JSDOM(responsePayloadString).window.document;
        const doc = extractScriptsWithNestedField(
          responsePayloadString,
          'xdt_api__v1__media__media_id__comments__connection'
        );
        if (doc == null) {
          console.log('not found');
          return;
        }

        doc.xdt_api__v1__media__media_id__comments__connection.edges.forEach(
          (edge: DomEdge) => {
            if (edge?.node) {
              // skip if already get specific number of comments
              if (isReachMaxFetched(fetchedComments)) {
                return;
              }

              const comment: IntagramComment = {
                username: edge.node.user.username,
                text: edge.node.text,
                created_at: edge.node.created_at,
                pk: edge.node.pk,
              };
              fetchedComments.push(comment);
            }
          }
        );
      } catch (err) {
        console.log('Could not get response body, err ', err);
      }
    }
  });

  // exporting rest pages of comment
  page.on('response', async (response) => {
    // skip if already get specific number of comments
    if (isReachMaxFetched(fetchedComments)) {
      return;
    }

    if (response.url().startsWith(LOAD_PAGE_URL)) {
      try {
        const stringifyResponsePayload = await response.text();
        const responsePayload = JSON.parse(stringifyResponsePayload);

        if (
          responsePayload?.data
            ?.xdt_api__v1__media__media_id__comments__connection !== undefined
        ) {
          const doc = findTargetObject(
            responsePayload,
            'xdt_api__v1__media__media_id__comments__connection'
          );
          if (doc == null) {
            console.warn('not found');
            return;
          }
          doc.xdt_api__v1__media__media_id__comments__connection.edges.forEach(
            (edge: DomEdge) => {
              if (edge?.node) {
                // skip if already get specific number of comments
                if (isReachMaxFetched(fetchedComments)) {
                  return;
                }

                const comment: IntagramComment = {
                  pk: edge.node.pk,
                  username: edge.node.user.username,
                  text: edge.node.text,
                  created_at: edge.node.created_at,
                };
                fetchedComments.push(comment);
              }
            }
          );
        }
      } catch (err) {
        console.error('error parse response, err ', err);
      }
    }
  });

  await page.goto(url);

  if (!isValidIgPost(url)) {
    url = page.url();
    url = cleanIgUrl(url, 'comments');
  }

  await page.goto(url);

  // Scroll parameters
  const x = 30;
  const startY = 200;
  const endY = 30;
  const duration = 3000; // 5 seconds
  const interval = 100;

  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    await page.touchscreen.touchStart(x, startY);
    await page.touchscreen.touchMove(x, endY);
    await setTimeout(50); // Short wait during drag
    await page.touchscreen.touchEnd();
    await setTimeout(interval); // Interval between drag actions

    if (isReachMaxFetched(fetchedComments)) {
      break;
    }
  }

  let d = new Date();
  const unixtime = d.valueOf();
  fs.writeFile(
    `./exported/${unixtime}.json`,
    JSON.stringify(fetchedComments),
    (err: any) => {
      if (err) {
        console.log('Error writing file:', err);
      } else {
        console.log('Successfully wrote file');
      }
    }
  );

  const cookies = await page.cookies();
  const igCred = new AccountCredential({ email: url, cookies: cookies });
  await upsertAccountCredential(igCred);

  browser.close();
}

export const scrapeInstagramComments = new Command('scrape-instagram-comment')
  .description('spawn headless browser to scrape instagram comments')
  .argument('<email>', 'session stored by email')
  .argument('<url>', 'instagram post url')
  .action((email, url) => {
    spawnScrapeIgCommentPuppeteer(email, url);
  });
