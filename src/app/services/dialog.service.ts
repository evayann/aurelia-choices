// dialog.service.ts
import { Injectable, signal, effect, Signal } from '@angular/core';
import {
  createActor,
  transition,
  type ActorRefFrom,
  type SnapshotFrom,
} from 'xstate';
import { toSignal } from '@angular/core/rxjs-interop';
import { DialogEvent, dialogMachine } from '../model/dialog/dialog';
import { createBrowserInspector } from '@statelyai/inspect';

const { inspect } = createBrowserInspector();

type DialogActor = ActorRefFrom<typeof dialogMachine>;
type DialogSnapshot = SnapshotFrom<typeof dialogMachine>;

function getNextEvents(snapshot: any) {
  return [...new Set([...snapshot._nodes.flatMap((sn: any) => sn.ownEvents)])];
}

@Injectable({ providedIn: 'root' })
export class DialogService {
  private actor = createActor(dialogMachine, { inspect }).start();
  state: Signal<DialogSnapshot> = toSignal(this.actor, {
    initialValue: this.actor.getSnapshot(),
  });

  // Helper signals
  answers = signal(this.state().context.answers);
  currentState = signal(this.state().value);
  currentQuestion = signal(this.state().context.currentQuestion);

  constructor() {
    effect(
      () => {
        const current = this.state();
        this.answers.set(current.context.answers);
        this.currentState.set(current.value);
        this.currentQuestion.set(current.context.currentQuestion);
      },
      { allowSignalWrites: true }
    );
  }

  getPossibleEvents(): Array<DialogEvent['type']> {
    return getNextEvents(this.actor.getSnapshot());
  }

  sendAnswer(questionId: string, value: 'opt1' | 'opt2' | 'subA' | 'subB') {
    this.actor.send({
      type: 'ANSWER',
      questionId,
      value,
    });
  }

  directToEnd(): void {
    this.actor.send({ type: 'DIRECT_ANSWER' });
  }

  goBack() {
    this.actor.send({ type: 'BACK' });
  }

  // State check helpers
  isAsking(): boolean {
    return this.state().matches('asking');
  }

  isOption1(): boolean {
    return this.state().matches('option1');
  }

  isOption2(): boolean {
    return this.state().matches('option2');
  }

  isSubOptionA(): boolean {
    return this.state().matches('subOptionA');
  }

  isSubOptionB(): boolean {
    return this.state().matches('subOptionB');
  }
}
