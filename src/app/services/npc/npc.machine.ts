import { assign, setup } from 'xstate';

export const npcMachine = setup({
  types: {
    context: {} as {
      mood: 'neutral' | 'happy' | 'sad';
      currentQuest: string | null;
      name: string;
    },
    input: {} as {
      mood?: 'neutral' | 'happy' | 'sad';
      currentQuest?: number[];
      name: string;
    },
    events: {} as
      | { type: 'CHEER_UP' }
      | { type: 'UPSET' }
      | { type: 'CALM_DOWN' }
      | { type: 'TALK' }
      | { type: 'STOP_TALKING' }
      | { type: 'GIVE_QUEST'; quest: string }
      | { type: 'QUEST_COMPLETED' },
  },
  actions: {
    setQuest: assign({
      currentQuest: (_, event) => (event as any)?.quest,
    }),
  },
  guards: {
    isHappy: ({ context }) => context.mood === 'happy',
  },
}).createMachine({
  id: 'npc',
  type: 'parallel',
  context: ({ input }) => ({
    mood: 'neutral',
    currentQuest: null,
    name: input?.name,
  }),
  states: {
    mood: {
      initial: 'neutral',
      states: {
        neutral: {
          on: {
            CHEER_UP: 'happy',
            UPSET: 'sad',
          },
        },
        happy: {
          on: {
            CALM_DOWN: 'neutral',
            UPSET: 'sad',
          },
        },
        sad: {
          on: {
            CHEER_UP: 'happy',
            CALM_DOWN: 'neutral',
          },
        },
      },
    },
    behavior: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            TALK: 'talking',
          },
        },
        talking: {
          on: {
            STOP_TALKING: 'idle',
          },
        },
      },
    },
    quest: {
      initial: 'noQuest',
      states: {
        noQuest: {
          on: {
            GIVE_QUEST: {
              target: 'hasQuest',
              guard: 'isHappy',
              actions: 'setQuest',
            },
          },
        },
        hasQuest: {
          on: {
            QUEST_COMPLETED: 'noQuest',
          },
        },
      },
    },
  },
});
