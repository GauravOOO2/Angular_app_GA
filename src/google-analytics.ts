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


  trackButtonClick( name: string, location: string, userId: string): void {
  this.sendEvent(name, {
    Location: location,
    custom_user_id: userId,
    Device: window.innerWidth < 768 ? 'mobile' : 'desktop'
  });
  }



}

