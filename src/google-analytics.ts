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

	trackButtonClick(name: string, location: string): void {
		this.sendEvent('button_click', {
			Button_Name: name,
			Location: location,
			Device: window.innerWidth < 768 ? 'mobile' : 'desktop'
		});
	}
}
