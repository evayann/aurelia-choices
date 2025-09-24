import { Injectable } from '@angular/core';
import { createActor } from 'xstate';
import { npcMachine } from './npc.machine';
import { NpcActor } from './npc.type';

@Injectable({
  providedIn: 'root',
})
export class NpcService {
  private npcs: Record<string, NpcActor> = {};

  constructor() {
    this.loadNpc(1);
  }

  loadNpc(chapter: number): void {
    this.npcs = {
      alice: createActor(npcMachine, { input: { name: 'Alice' } }).start(),
      bob: createActor(npcMachine, { input: { name: 'Bob' } }).start(),
      charlie: createActor(npcMachine, { input: { name: 'Charlie' } }).start(),
    };
    console.log(this.npcs);
  }
}
