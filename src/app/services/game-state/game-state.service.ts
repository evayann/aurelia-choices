import { inject, Injectable } from '@angular/core';
import { ActorsManagerService } from '../actor-manager/actors-manager.service';
import { GameStateActorValue } from '../actor-manager/actors.type';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {
  private gameStateActor = inject(ActorsManagerService).gameStateActor;

  get state(): GameStateActorValue {
    return this.gameStateActor.getSnapshot().value;
  }

  start(): void {
    this.gameStateActor.send({ type: 'game' });
  }
}
