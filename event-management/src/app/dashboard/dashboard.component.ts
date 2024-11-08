import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, takeUntil } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EventService } from '../../services/event.service';
import {
  BehaviorSubject,
  combineLatest,
  firstValueFrom,
  interval,
  Subject,
} from 'rxjs';
import { EventType, eventTypeValues, MqttEvent } from '../../types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    CommonModule,
  ],
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private eventsSubject = new BehaviorSubject<MqttEvent[]>([]);
  events$ = this.eventsSubject.asObservable();
  private destroy$ = new Subject<void>();

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.fetchEvents();
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.fetchEvents());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async fetchEvents() {
    const events = await firstValueFrom(this.eventService.getAllEvents());
    this.eventsSubject.next(events);
  }

  cards = combineLatest([
    this.breakpointObserver.observe(Breakpoints.Handset),
    this.events$,
  ]).pipe(
    map(([breakpoint, events]) => {
      const eventsByType = eventTypeValues.map((type: EventType) => {
        const ev = events.filter((event) => event.type === type);

        return {
          type,
          events: ev,
          count: ev.length,
        };
      });

      const counts: Record<EventType, number> = {
        ACTIVE: 0,
        INACTIVE: 0,
        ERROR: 0,
        RECLINE: 0,
        CHARGING: 0,
      };

      eventsByType.forEach(
        ({ type, count }: { type: EventType; count: number }) => {
          counts[type] = count;
        }
      );

      return [
        { title: 'Total', cols: 1, rows: 1, value: events.length },
        { title: 'Types', cols: 1, rows: 2, values: counts },
        {
          title: 'Latest event',
          cols: 3,
          rows: 2,
          latestEvents: events.splice(0, 5),
        },
      ];
    })
  );
}
