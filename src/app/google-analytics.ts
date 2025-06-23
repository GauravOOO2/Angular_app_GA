import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  constructor() {}

  public sendEvent(eventName: string, params?: any): void {
    gtag('event', eventName, params);
  }
}
