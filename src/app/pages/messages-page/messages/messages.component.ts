import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MessageComponent } from './message/message.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [MessageComponent, RouterLink],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col',
  },
})
export class MessagesComponent implements AfterViewInit {
  // messageContainer = viewChild<ElementRef<HTMLElement>>('messageContainer');

  conversationName = input.required<string>();
  messageList = input.required<{ personName: string; content: string }[]>();
  responseList = input<string[] | undefined>(undefined);

  responseSelected = output<string>();

  ngAfterViewInit() {
    // const observer = new MutationObserver(() => this.scrollToBottom());
    // observer.observe(this.messageContainer()!.nativeElement, {
    //   childList: true,
    //   subtree: true,
    // });
  }

  select(message: string): void {
    this.responseSelected.emit(message);
  }

  private scrollToBottom(): void {
    // try {
    //   this.messageContainer()!.nativeElement.scrollTop =
    //     this.messageContainer()!.nativeElement.scrollHeight;
    // } catch (err) {
    //   console.error('Could not auto-scroll:', err);
    // }
  }
}
