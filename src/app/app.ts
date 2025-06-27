import { Component } from '@angular/core';
import { GoogleAnalyticsService } from '../google-analytics';
import { Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    userId?: string;

  }
}

declare let gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  userId!: string | null;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private gaService: GoogleAnalyticsService) {}

  message = 'Hello from Angular!';
  counter = 0;


  ngOnInit() {
      this.userId = 'user_' + Math.random().toString(36).substring(2, 10);
      // localStorage.setItem('userId', this.userId);
      console.log('userId set in browser:', this.userId);
    }


  //   ngOnInit(){
  //   const  userId = localStorage.getItem('userId') || null
  //   this.userId = userId
  // }

  showAlert() {
    alert('🚀 You clicked the alert button!');
    this.gaService.trackButtonClick( 'Sign In Button', 'navbar', this.userId);
  }

  changeText() {
    this.message = '✅ Message changed successfully!';
    this.gaService.trackButtonClick( 'Register Button', 'navbar',  this.userId);
  }

  increaseCounter() {
    this.counter++;
    this.gaService.trackButtonClick( 'Add Number Button', 'navbar',  this.userId);
  }

  reset() {
    this.counter = 0;
    this.message = 'Hello from Angular!';
    this.gaService.trackButtonClick( 'Message Button', 'navbar',  this.userId);
  }

  // Search input click tracking
  onSearchClick() {
    this.gaService.trackButtonClick( 'Search_Input_Clicked', 'search_form',  this.userId);
  }

   newButton() {
    this.gaService.trackButtonClick( 'new button', 'home page',  this.userId);
  }


  loginButton(){
    const  userId = 'user_' + Math.random().toString(36).substring(3, 10);
    localStorage.setItem("userId", userId)
    this.gaService.trackButtonClick( 'LoginButton', 'HomePage',  this.userId);
    window.location.reload()
  }

  // NEW: Search form submission with value
  // onSearchSubmit(event: Event) {
  //   event.preventDefault();
    
  //   const form = event.target as HTMLFormElement;
  //   const searchInput = form.querySelector('input[name="search"]') as HTMLInputElement;
  //   const searchValue = searchInput?.value?.trim() || '';

  //   // Track the search submission
  //   // this.gaService.trackButtonClick('Search_Actions', 'Search_Submitted', 'search_form');
    

  //   this.gaService.trackButtonClick('Search_Actions', 'Search_Result: ' + searchValue, 'search_form');
  //   // this.gaService.trackButtonClick('Search_Actions', 'Search_Result: ' + searchValue, 'search_form');

  //   // Send the search value using sendEvent
  //   // this.gaService.sendEvent('Search_Value', {
  //   //   Search_Term: searchValue,
  //   //   Search_Length: searchValue.length,
  //   //   Device: window.innerWidth < 768 ? 'mobile' : 'desktop',
  //   //   Location: 'search_form'
  //   // });

  // }
}