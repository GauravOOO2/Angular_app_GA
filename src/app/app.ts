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
  
  // Search-related properties
  searchResults: string[] = [];
  isSearching: boolean = false;
  private searchStartTime: number = 0;
  
  // Mock data for search results
  private mockData = [
    'Angular Tutorial', 'React Guide', 'Vue.js Basics', 'JavaScript Tips',
    'TypeScript Advanced', 'Node.js Server', 'Express Framework', 'MongoDB Guide',
    'HTML5 Features', 'CSS Grid Layout', 'Flexbox Tutorial', 'Bootstrap Components'
  ];

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

  // SEARCH METHODS USING EXISTING trackButtonClick and sendEvent

  onSearchFocus() {
    this.gaService.trackButtonClick('Search_Interaction', 'Search_Field_Focused', 'search_form');
  }

  onSearchInput(event: any) {
    const query = event.target.value.trim();
    
    // Track when user starts typing
    if (query.length === 1) {
      this.searchStartTime = Date.now();
      this.gaService.trackButtonClick('Search_Interaction', 'Search_Started', 'search_form');
      
      // Send additional search data using sendEvent
      this.gaService.sendEvent('Search_Query_Data', {
        Search_Term: query,
        Query_Length: query.length,
        Device: window.innerWidth < 768 ? 'mobile' : 'desktop',
        Location: 'search_form'
      });
    }

    // Perform live search if query is long enough
    if (query.length >= 2) {
      this.performSearch(query, false);
    } else {
      this.searchResults = [];
    }

    // Track search clearing
    if (query.length === 0 && this.searchResults.length > 0) {
      this.gaService.trackButtonClick('Search_Interaction', 'Search_Cleared', 'search_form');
      this.searchResults = [];
    }
  }

  onSearchSubmit(event: Event) {
    event.preventDefault();
    const query = this.searchForm.get('name')?.value?.trim() || '';
    
    if (query.length === 0) {
      this.gaService.trackButtonClick('Search_Error', 'Empty_Search_Attempted', 'search_form');
      return;
    }

    // Track search submission using trackButtonClick
    this.gaService.trackButtonClick('Search_Submit', 'Search_Button_Clicked', 'search_form');
    
    // Send detailed search data using sendEvent
    const searchDuration = Date.now() - this.searchStartTime;
    this.gaService.sendEvent('Search_Submit_Data', {
      Search_Term: query,
      Query_Length: query.length,
      Search_Duration_Ms: searchDuration,
      Device: window.innerWidth < 768 ? 'mobile' : 'desktop',
      Location: 'search_form',
      Submit_Method: 'button'
    });
    
    this.performSearch(query, true);
  }

  onSearchKeyup(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const query = (event.target as HTMLInputElement).value.trim();
      if (query.length > 0) {
        // Track enter key press
        this.gaService.trackButtonClick('Search_Submit', 'Search_Enter_Pressed', 'search_form');
        
        // Send detailed data
        this.gaService.sendEvent('Search_Submit_Data', {
          Search_Term: query,
          Query_Length: query.length,
          Device: window.innerWidth < 768 ? 'mobile' : 'desktop',
          Location: 'search_form',
          Submit_Method: 'enter_key'
        });
        
        this.performSearch(query, true);
      }
    }
  }

  private performSearch(query: string, isSubmitted: boolean) {
    this.isSearching = true;
    
    setTimeout(() => {
      // Mock search logic
      this.searchResults = this.mockData.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
      );
      
      this.isSearching = false;
      
      // Track search results using trackButtonClick
      if (this.searchResults.length > 0) {
        const actionName = isSubmitted ? 'Search_Success_Submit' : 'Search_Success_Live';
        this.gaService.trackButtonClick('Search_Results', actionName, 'search_form');
      } else {
        const actionName = isSubmitted ? 'No_Results_Submit' : 'No_Results_Live';
        this.gaService.trackButtonClick('Search_Results', actionName, 'search_form');
      }
      
      // Send detailed results data using sendEvent
      this.gaService.sendEvent('Search_Results_Data', {
        Search_Term: query,
        Result_Count: this.searchResults.length,
        Has_Results: this.searchResults.length > 0,
        Search_Type: isSubmitted ? 'submitted' : 'live_typing',
        Device: window.innerWidth < 768 ? 'mobile' : 'desktop',
        Location: 'search_form'
      });
      
    }, 300);
  }

  onSearchResultClick(result: string, index: number) {
    const query = this.searchForm.get('name')?.value || '';
    
    // Track result click using trackButtonClick
    this.gaService.trackButtonClick('Search_Result_Click', 'Result_Selected', 'search_results');
    
    // Send detailed click data using sendEvent
    this.gaService.sendEvent('Search_Result_Click_Data', {
      Search_Term: query,
      Selected_Result: result,
      Result_Position: index + 1,
      Total_Results: this.searchResults.length,
      Device: window.innerWidth < 768 ? 'mobile' : 'desktop',
      Location: 'search_results'
    });
    
    console.log('Selected result:', result);
  }
}