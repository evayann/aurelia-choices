import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BatteryService {
  batteryLevel = signal<number>(100);
  isCharging = signal<boolean>(true);

  constructor() {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        this.batteryLevel.set(battery.level * 100);
        this.isCharging.set(battery.charging);

        battery.addEventListener('levelchange', () =>
          this.batteryLevel.set(battery.level * 100)
        );
        battery.addEventListener('chargingchange', () =>
          this.isCharging.set(battery.charging)
        );
      });
    } else {
      console.warn(
        'Battery Status API not available. Defaulting to full battery.'
      );
    }
  }
}
