import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessagesComponent } from '../messages-page/messages/messages.component';
import { PhoneComponent } from '../../shared/phone/phone.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [PhoneComponent, RouterOutlet, MessagesComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {}
