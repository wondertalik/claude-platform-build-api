import type { MessageParam } from '@anthropic-ai/sdk/resources';

export function addUserMessage(messages: MessageParam[], text: string): void {
  messages.push({ role: 'user', content: text });
}

export function addAssistantMessage(messages: MessageParam[], text: string): void {
  messages.push({ role: 'assistant', content: text });
}
