import { Actor, StateFrom } from 'xstate';
import { gameStateMachine } from '../game-state/game-state.machine';

export type GameStateActor = Actor<typeof gameStateMachine>;
export type GameStateActorValue = StateFrom<typeof gameStateMachine>['value'];
