import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

const model = 'claude-haiku-5-5';

const message = await client.messages.create({
  model: model,
  max_tokens: 1000,
  messages: [
    {
      role: 'user',
      content: 'What is quantuam computing. Answer in one sentence'
    }
  ]
});

for (const block of message.content) {
  if (block.type === 'text') {
    console.log(block.text);
  }
}
