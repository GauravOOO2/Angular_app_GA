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

  // ✅ Now accepts 'group' as the first argument
  trackButtonClick(group: string, name: string, location: string): void {
    this.sendEvent('button_click', {
      Group: group,           // 👈 Passed from component
      Button_Name: name,
      Location: location,
      Device: window.innerWidth < 768 ? 'mobile' : 'desktop'
    });
  }
}

