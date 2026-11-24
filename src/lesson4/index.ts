import 'dotenv/config';
import '@anthropic-ai/sdk';
import Anthropic from '@anthropic-ai/sdk';
import type { MessageParam } from '@anthropic-ai/sdk/resources';

const client = new Anthropic();

const model = 'claude-haiku-5-5';

function addUserMessage(messages: MessageParam[], text: string) {
  const userMessage: MessageParam = {
    role: 'user',
    content: text
  };
  messages.push(userMessage);
}

function addAssistantMessage(messages: MessageParam[], text: string) {
  const assistantMessage: MessageParam = {
    role: 'assistant',
    content: text
  };
  messages.push(assistantMessage);
}

async function chat(messages: MessageParam[]) {
  const message = await client.messages.create({
    model: model,
    max_tokens: 1000,
    messages: messages
  });

  const block = message.content[0];
  if (block?.type !== 'text') {
    throw new Error(`Expected a text block, got: ${block?.type ?? 'nothing'}`);
  }
  return block.text;
}

// Make a starting list of message
const messages = Array<MessageParam>();

// Add in the initial user question of "Define quantum computing in one sentence"
addUserMessage(messages, 'Define quantum computing in one sentense');

// Pass the list of messages int 'chat' to get an answer
let answer = await chat(messages);
console.log(`first response: ${answer}`);
// Take the answer and add it as an assistant message into our list
addAssistantMessage(messages, answer);

// Add in the user's follow-up question
addUserMessage(messages, 'Write another sentence');

// Call chage again with the list of message to get a final answer
answer = await chat(messages);
console.log(`second response: ${answer}`);
