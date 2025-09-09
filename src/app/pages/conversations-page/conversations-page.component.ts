import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConversationsComponent } from './conversations/conversations.component';

@Component({
  selector: 'app-conversations-page',
  standalone: true,
  imports: [ConversationsComponent],
  templateUrl: './conversations-page.component.html',
  styleUrl: './conversations-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationsPageComponent {}
