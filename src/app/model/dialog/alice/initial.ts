import { createMachine, assign } from 'xstate';

type DialogEvent =
  | { type: 'ANSWER'; questionId: string; value: 'opt1' }
  | { type: 'ANSWER'; questionId: string; value: 'opt2' }
  | { type: 'ANSWER'; questionId: string; value: 'subA' }
  | { type: 'ANSWER'; questionId: string; value: 'subB' }
  | { type: 'DIRECT_ANSWER' }
  | { type: 'BACK' };

// 2. Define context type
interface DialogContext {
  answers: Record<string, string>;
  currentQuestion?: string;
}

export const dialogMachine = createMachine({
  id: 'dialog',
  types: {} as {
    context: DialogContext;
    events: DialogEvent;
  },
  context: () => ({
    answers: {},
    currentQuestion: 'start',
  }),
  initial: 'asking',
  states: {
    asking: {
      on: {
        ANSWER: [
          {
            target: 'option1',
            guard: ({ event }) => {
              console.log(event);
              return event.value === 'opt1';
            },
            actions: [
              assign({
                answers: ({ context, event }) => ({
                  ...context.answers,
                  [event.questionId]: event.value,
                }),
                currentQuestion: 'option1',
              }),
            ],
          },
          {
            target: 'option2',
            actions: [
              assign({
                answers: ({ context, event }) => ({
                  ...context.answers,
                  [event.questionId]: event.value,
                }),
                currentQuestion: 'option2',
              }),
            ],
          },
        ],
        DIRECT_ANSWER: {
          target: 'final',
          guard: ({ event }) => Math.random() < 0.5,
        },
      },
    },
    option1: {
      on: {
        ANSWER: [
          {
            target: 'subOptionA',
            guard: ({ event }) => event.value === 'subA',
            actions: assign({
              answers: ({ context, event }) => ({
                ...context.answers,
                [event.questionId]: event.value,
              }),
            }),
          },
          {
            target: 'subOptionB',
            guard: ({ event }) => event.value === 'subB',
            actions: assign({
              answers: ({ context, event }) => ({
                ...context.answers,
                [event.questionId]: event.value,
              }),
            }),
          },
        ],
        BACK: {
          target: 'asking',
          actions: assign({
            currentQuestion: 'start',
          }),
        },
      },
    },
    option2: {
      on: {
        ANSWER: [
          {
            target: 'subOptionA',
            guard: ({ event }) => event.value === 'subA',
            actions: assign({
              answers: ({ context, event }) => ({
                ...context.answers,
                [event.questionId]: event.value,
              }),
            }),
          },
        ],
        BACK: {
          target: 'asking',
          actions: assign({
            currentQuestion: 'start',
          }),
        },
      },
    },
    subOptionA: {
      on: {
        BACK: {
          target: 'option1',
          actions: assign({
            currentQuestion: 'option1',
          }),
        },
      },
    },
    subOptionB: {
      on: {
        BACK: {
          target: 'option1',
          actions: assign({
            currentQuestion: 'option1',
          }),
        },
      },
    },
    final: {
      type: 'final',
    },
  },
});
