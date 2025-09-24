import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessagesComponent } from '../messages-page/messages/messages.component';
import { PhoneComponent } from '../../shared/phone/phone.component';
import { DialogComponent } from './tmp.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [PhoneComponent, RouterOutlet, MessagesComponent, DialogComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {}
