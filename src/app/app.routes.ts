import { Routes } from '@angular/router';
import { ConversationsComponent } from './pages/conversations-page/conversations/conversations.component';
import { GameComponent } from './pages/game/game.component';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { ConversationsPageComponent } from './pages/conversations-page/conversations-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: MainMenuComponent },
  {
    path: 'game',
    component: GameComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: 'conversations',
        component: ConversationsPageComponent,
      },
      {
        path: 'messages',
        component: MessagesPageComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];
