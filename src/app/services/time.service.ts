import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  time = signal(new Date());

  constructor() {
    setInterval(() => this.time.set(new Date()), 1000);
  }
}
