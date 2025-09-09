import { setup, spawnChild } from 'xstate';
import { gameStateMachine } from '../game-state/game-state.machine';

type ActorManagerEvent = { type: 'start' };

export const actorsManagerMachine = setup({
  types: { events: {} as ActorManagerEvent },
}).createMachine({
  id: 'actorManagerMachine',
  initial: 'idle',
  states: {
    idle: {
      entry: [
        spawnChild(gameStateMachine, {
          systemId: 'game-state',
        }),
      ],
      on: {
        start: { target: '' },
      },
    },
  },
});
