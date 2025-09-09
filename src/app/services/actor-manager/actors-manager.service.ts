import { Injectable } from '@angular/core';
import { createBrowserInspector } from '@statelyai/inspect';
import { createActor } from 'xstate';
import { actorsManagerMachine } from './actor-manager.machine';
import { GameStateActor } from './actors.type';

const { inspect } = createBrowserInspector();

@Injectable({
  providedIn: 'root',
})
export class ActorsManagerService {
  private actorsManager = createActor(actorsManagerMachine, {
    inspect,
  }).start();

  get gameStateActor(): GameStateActor {
    return this.actorsManager.system.get('game-state');
  }
}
