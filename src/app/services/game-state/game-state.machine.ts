import { setup } from 'xstate';

export const gameStateMachine = setup({
  types: {
    events: {} as { type: 'menu' } | { type: 'options' } | { type: 'game' },
  },
}).createMachine({
  id: 'game-state',
  initial: 'menu',
  states: {
    menu: {
      on: {
        openOptions: { target: 'options' },
        game: { target: 'game' },
      },
    },
    options: {
      entry: () => {
        console.log('gameStateMachine: Received options event!');
      },
    },
    game: {},
  },
});
