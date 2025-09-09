import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessagesComponent } from './messages/messages.component';

@Component({
  selector: 'app-messages-page',
  standalone: true,
  imports: [MessagesComponent],
  templateUrl: './messages-page.component.html',
  styleUrl: './messages-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesPageComponent {
  messageList = [
    { personName: 'Olivier Mine', content: 'It is me Olivier !' },
    {
      personName: 'Olivier Mine',
      content: 'Do you have any new about our plan to see jackou ?',
    },
    {
      personName: 'Olivier Mine',
      content: 'Do you have any new about our plan to see jackou ?',
    },
  ];

  applyPlayerChoice(choice: string): void {
    this.messageList.push({
      personName: 'player',
      content: choice,
    });
  }
}
