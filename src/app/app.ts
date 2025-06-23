import { Component } from '@angular/core';

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
  }

  changeText() {
    this.message = '✅ Message changed successfully!';
  }

  increaseCounter() {
    this.counter++;
  }

  reset() {
    this.counter = 0;
    this.message = 'Hello from Angular!';
  }
}
