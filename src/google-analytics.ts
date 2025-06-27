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
  userId!: string | null;

  // ngOnInit(){
  //   const  userId = localStorage.getItem('userId') || null
  //   this.userId = userId
  // }

  sendEvent(eventName: string, eventParams: Record<string, any>): void {
    gtag('event', eventName, eventParams);
  }

  // getId() {
  // console.log(localStorage.getItem("userId"));
  
  // }

  trackButtonClick( name: string, location: string): void {
    const  userId = localStorage.getItem('userId') || null
    this.userId = userId
    console.log("google analytics files userId: ",userId)
  this.sendEvent(name, {
    Location: location,
    custom_user_id: userId,
    Device: window.innerWidth < 768 ? 'mobile' : 'desktop'
  });
  }



}

