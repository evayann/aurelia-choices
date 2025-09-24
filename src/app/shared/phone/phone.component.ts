import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TimeService } from '../../services/time.service';
import { BatteryService } from '../../services/battery.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [RouterLink, DatePipe, NgClass],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneComponent {
  time = inject(TimeService).time;

  private batteryService = inject(BatteryService);
  isBatteryCharging = this.batteryService.isCharging;
  batteryLevel = this.batteryService.batteryLevel;

  private router = inject(Router);

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }
}
