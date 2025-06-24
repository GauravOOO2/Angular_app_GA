import { Component } from '@angular/core';
import { GoogleAnalyticsService } from '../google-analytics';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],

})

export class App {

  constructor(private gaService: GoogleAnalyticsService) {}

  message = 'Hello from Angular!';
  counter = 0;

  showAlert() {
    alert('🚀 You clicked the alert button!');
    	this.gaService.trackButtonClick('SignIn_Register','Sign In Button', 'navbar');
  }

  changeText() {
    this.message = '✅ Message changed successfully!';
    this.gaService.trackButtonClick('SignIn_Register','Register Button', 'navbar');
  }

  increaseCounter() {
    this.counter++;
    this.gaService.trackButtonClick('Other_buttons','Add Number Button', 'navbar');
  }

  reset() {
    this.counter = 0;
    this.message = 'Hello from Angular!';
    this.gaService.trackButtonClick('Other_buttons','Message Button', 'navbar');
  }
}
