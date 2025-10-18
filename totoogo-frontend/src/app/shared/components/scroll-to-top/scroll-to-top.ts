import { Component, signal, HostListener, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.html',
  styleUrl: './scroll-to-top.scss'
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private routerSubscription?: Subscription;
  
  isVisible = signal(false);
  private readonly scrollThreshold = 300; // Show button after scrolling 300px

  ngOnInit(): void {
    // Listen to route changes and scroll to top
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Use instant scroll for route changes to ensure pages start from top
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 0);
      });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isVisible.set(scrollTop > this.scrollThreshold);
  }

  scrollToTop(smooth: boolean = true): void {
    // Always use smooth scrolling for better UX
    try {
      // Method 1: Modern smooth scroll (preferred)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } catch (error) {
      // Method 2: Fallback smooth scroll for older browsers
      this.smoothScrollToTop();
    }
  }

  private smoothScrollToTop(): void {
    const scrollStep = -window.scrollY / (500 / 15); // 500ms duration
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  }
}
