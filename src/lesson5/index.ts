import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import type { MessageParam } from '@anthropic-ai/sdk/resources';
import { addUserMessage } from '#core';

const client = new Anthropic();

const model = 'claude-haiku-5-5';

async function chat(messages: MessageParam[], system?: string) {
  const message = await client.messages.create({
    model: model,
    max_tokens: 1000,
    messages: messages,
    system: system
  });

  const block = message.content[0];
  if (block?.type !== 'text') {
    throw new Error(`Expected a text block, got: ${block?.type ?? 'nothing'}`);
  }
  return block.text;
}

const messages = Array<MessageParam>();

const system = `
  You are a patient math tutor.
  Do not directly answer a student's questions.
  Guide them to a solution step by step.
  `;

addUserMessage(messages, 'How do i solve 5x + 2 = 3?');

// Pass the list of messages int 'chat' to get an answer
const answer = await chat(messages, system);
console.log(`first response: ${answer}`);
