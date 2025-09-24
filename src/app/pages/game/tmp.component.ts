// dialog.component.ts
import { Component, inject } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [JsonPipe],
  template: `
    @if (dialog.isAsking()) {
    <div class="question">
      <h2>What would you like to do?</h2>
      <button class="btn" (click)="sendAnswer('start', 'opt1')">
        Option 1
      </button>
      <button class="btn" (click)="sendAnswer('start', 'opt2')">
        Option 2
      </button>
      <button class="btn" (click)="dialog.directToEnd()">To end</button>
    </div>
    } @else if (dialog.isOption1()) {
    <div class="question">
      <h2>Option 1 selected - what's next?</h2>
      <button class="btn" (click)="sendAnswer('option1', 'subA')">
        Sub-option A
      </button>
      <button class="btn" (click)="sendAnswer('option1', 'subB')">
        Sub-option B
      </button>
      <button class="btn" (click)="dialog.goBack()">Back</button>
    </div>
    } @else if (dialog.isOption2()) {
    <div class="question">
      <h2>Option 2 selected - what's next?</h2>
      <button class="btn" (click)="sendAnswer('option2', 'subA')">
        Sub-option A
      </button>
      <button class="btn" (click)="dialog.goBack()">Back</button>
    </div>
    } @else if (dialog.isSubOptionA() || dialog.isSubOptionB()) {
    <div class="question">
      <h2>Final selection made!</h2>
      <p>Your answers: {{ dialog.answers() | json }}</p>
      <button class="btn" (click)="dialog.goBack()">Back</button>
    </div>
    }

    <h4>Possible Next Events:</h4>
    <ul>
      @for (event of dialog.getPossibleEvents(); track event) {
      <li>{{ event }}</li>
      }
    </ul>
  `,
})
export class DialogComponent {
  dialog = inject(DialogService);

  sendAnswer(questionId: string, value: 'opt1' | 'opt2' | 'subA' | 'subB') {
    this.dialog.sendAnswer(questionId, value);
  }
}
