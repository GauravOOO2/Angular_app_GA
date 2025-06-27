import { Injectable } from '@angular/core';

declare function gtag(
	event: string,
	action: string,
	params?: Record<string, any>
): void;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  sendEvent(eventName: string, eventParams: Record<string, any>): void {
    gtag('event', eventName, eventParams);
  }

  userId = localStorage.getItem('userId') || null

  trackButtonClick( name: string, location: string): void {
  this.sendEvent(name, {
    Location: location,
    custom_user_id: this.userId,
    Device: window.innerWidth < 768 ? 'mobile' : 'desktop'
  });
  }



}

