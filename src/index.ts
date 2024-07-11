// src/index.ts
import { Command } from 'commander';
import { signInInstagram } from './commands/signup-instagram';
import { loadInstagram } from './commands/load-instagram';
import dotenv from 'dotenv';

const program = new Command();

// Load environment variables from .env file
dotenv.config();

program
  .name('instagram-authorizer')
  .description('An app used to authorize instagram user')
  .version('1.0.0');

program.addCommand(signInInstagram);
program.addCommand(loadInstagram);

program.parse(process.argv);
