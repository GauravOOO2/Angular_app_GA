import { Component } from '@angular/core';
import { GoogleAnalyticsService } from '../google-analytics';
import { FormBuilder, FormGroup } from '@angular/forms';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  searchForm: FormGroup;

  constructor(
    private gaService: GoogleAnalyticsService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      name: ['']
    });
  }

  message = 'Hello from Angular!';
  counter = 0;

  // Existing methods
  showAlert() {
    alert('🚀 You clicked the alert button!');
    this.gaService.trackButtonClick('SignIn_Register', 'Sign In Button', 'navbar');
  }

  changeText() {
    this.message = '✅ Message changed successfully!';
    this.gaService.trackButtonClick('SignIn_Register', 'Register Button', 'navbar');
  }

  increaseCounter() {
    this.counter++;
    this.gaService.trackButtonClick('Other_buttons', 'Add Number Button', 'navbar');
  }

  reset() {
    this.counter = 0;
    this.message = 'Hello from Angular!';
    this.gaService.trackButtonClick('Other_buttons', 'Message Button', 'navbar');
  }

  // NEW: Simple search input click tracking
  onSearchClick() {
    this.gaService.trackButtonClick('Search_Actions', 'Search_Input_Clicked', 'search_form');
  }
}