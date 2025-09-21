'use server';

/**
 * @fileOverview An AI chatbot assistant for students to ask questions about lessons.
 *
 * - askQuestion - A function that handles student questions and provides simplified explanations and lesson/game suggestions.
 * - AskQuestionInput - The input type for the askQuestion function.
 * - AskQuestionOutput - The return type for the askQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskQuestionInputSchema = z.object({
  question: z
    .string()
    .describe('The question asked by the student in Punjabi or English.'),
});
export type AskQuestionInput = z.infer<typeof AskQuestionInputSchema>;

const AskQuestionOutputSchema = z.object({
  answer: z
    .string()
    .describe(
      'The simplified explanation and relevant lesson/game suggestions provided by the chatbot in the same language as the question.'
    ),
});
export type AskQuestionOutput = z.infer<typeof AskQuestionOutputSchema>;

export async function askQuestion(input: AskQuestionInput): Promise<AskQuestionOutput> {
  return askQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askQuestionPrompt',
  input: {schema: AskQuestionInputSchema},
  output: {schema: AskQuestionOutputSchema},
  prompt: `You are an AI Chatbot Assistant for the Nabha Digital Learning Hub (NDLH). Your role is to help students understand the lessons better by providing simplified explanations and relevant lesson/game suggestions in Punjabi or English, based on the student's question.\n\nQuestion: {{{question}}}`,
});

const askQuestionFlow = ai.defineFlow(
  {
    name: 'askQuestionFlow',
    inputSchema: AskQuestionInputSchema,
    outputSchema: AskQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
