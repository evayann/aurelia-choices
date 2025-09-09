import { setup } from 'xstate';

export const npcMachine = setup({
  types: { events: {} as { type: 'update'; action: any } },
}).createMachine({
  id: 'npc',
  initial: 'neutral',
  states: {
    neutral: {},
  },
});
