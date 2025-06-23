import { Component } from '@angular/core';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  message = 'Hello from Angular!';
  counter = 0;

  showAlert() {
    alert('🚀 You clicked the alert button!');
    this.trackEvent('alert_button_click', 'user_action', 'Alert Button');
  }

  changeText() {
    this.message = '✅ Message changed successfully!';
    this.trackEvent('change_text_click', 'user_action', 'Change Text Button');
  }

  increaseCounter() {
    this.counter++;
    this.trackEvent('increase_counter_click', 'user_action', 'Increase Counter Button');
  }

  reset() {
    this.counter = 0;
    this.message = 'Hello from Angular!';
    this.trackEvent('reset_button_click', 'user_action', 'Reset Button');
  }

  // ✅ Declare the function that was missing
  trackEvent(eventName: string, eventCategory: string, eventLabel: string) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, {
        event_category: eventCategory,
        event_label: eventLabel,
        value: this.counter
      });
    }
  }
}
