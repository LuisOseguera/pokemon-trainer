import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Event,
  RouterOutlet,
} from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { LoadingScreen } from './shared/loading-screen/loading-screen';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Navbar, LoadingScreen],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  isLoading = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000); // Simulate loading time.
      }
    });
  }
}
