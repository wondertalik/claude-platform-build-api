import 'dotenv/config';
import '@anthropic-ai/sdk';
import Anthropic from '@anthropic-ai/sdk';
import type { MessageParam, TextBlock } from '@anthropic-ai/sdk/resources';

const client = new Anthropic();

let model = 'claude-haiku-5-5';

function addUserMessage(messages: MessageParam[], text: string) {
    const userMessage: MessageParam = {
        role: 'user',
        content: text
    }
    messages.push(userMessage)
}

function addAssistantMessage(messages: MessageParam[], text: string) {
    const assistantMessage: MessageParam = {
        role: 'assistant',
        content: text
    }
    messages.push(assistantMessage)
}

async function chat(messages: MessageParam[]) {
    var message = await client.messages.create({
        model: model,
        max_tokens: 1000,
        messages: messages
    });

    return (message.content[0] as TextBlock).text;
}

// Make a starting list of message
var messages = Array<MessageParam>();

// Add in the initial user question of "Define quantum computing in one sentence"
addUserMessage(messages, "Define quantum computing in one sentense")

// Pass the list of messages int 'chat' to get an answer
var answer = await chat(messages);
console.log(`first response: ${answer}`)
// Take the answer and add it as an assistant message into our list
addAssistantMessage(messages, answer);

// Add in the user's follow-up question
addUserMessage(messages, "Write another sentence")

// Call chage again with the list of message to get a final answer
answer = await chat(messages);
console.log(`second response: ${answer}`)