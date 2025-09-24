import { Actor, StateFrom } from 'xstate';
import { npcMachine } from './npc.machine';

export type NpcActor = Actor<typeof npcMachine>;
export type NpcActorValue = StateFrom<typeof npcMachine>['value'];
