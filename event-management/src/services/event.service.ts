import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MqttEvent } from '../types';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = `http://localhost:3000/api/event`; // Replace with your API endpoint
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<MqttEvent[]> {
    return this.http.get<MqttEvent[]>(this.apiUrl);
  }
}
