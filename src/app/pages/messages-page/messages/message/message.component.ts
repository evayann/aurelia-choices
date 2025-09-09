import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'chat',
    '[class.chat-start]': 'personName() !== "player"',
    '[class.chat-end]': 'personName() === "player"',
  },
})
export class MessageComponent {
  personName = input.required<string>();
  message = input.required<string>();
}
