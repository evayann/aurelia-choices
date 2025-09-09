import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-conversations',
  standalone: true,
  imports: [],
  templateUrl: './conversations.component.html',
  styleUrl: './conversations.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-2',
  },
})
export class ConversationsComponent {
  conversationList =
    input.required<{ icon: string; name: string; newMessageCount: number }[]>();
}
