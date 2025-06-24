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

  // Search input click tracking
  onSearchClick() {
    this.gaService.trackButtonClick('Search_Actions', 'Search_Input_Clicked', 'search_form');
  }

  // NEW: Search form submission with value
  onSearchSubmit(event: Event) {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const searchInput = form.querySelector('input[name="search"]') as HTMLInputElement;
    const searchValue = searchInput?.value?.trim() || '';

    // Track the search submission
    // this.gaService.trackButtonClick('Search_Actions', 'Search_Submitted', 'search_form');
    

    this.gaService.trackButtonClick('Search_Actions', 'Search_Result: ' + searchValue, 'search_form');

    // Send the search value using sendEvent
    // this.gaService.sendEvent('Search_Value', {
    //   Search_Term: searchValue,
    //   Search_Length: searchValue.length,
    //   Device: window.innerWidth < 768 ? 'mobile' : 'desktop',
    //   Location: 'search_form'
    // });

    console.log('Search submitted:', searchValue);
  }
}