import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollAnimationService } from '../../core/scroll-animation.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-services',
  imports: [CommonModule, RouterModule],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services implements OnInit, AfterViewInit {
  private scrollAnimationService = inject(ScrollAnimationService);

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    this.scrollAnimationService.initScrollAnimations();
    this.initializeAnimations();
    
    // Ensure service cards are visible immediately
    setTimeout(() => {
      const serviceCards = document.querySelectorAll('.services-cards-container > div');
      serviceCards.forEach(card => {
        if (card instanceof HTMLElement) {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }
      });
    }, 100);

    // Ensure technology features are visible immediately
    setTimeout(() => {
      const techFeatures = document.querySelectorAll('.technology-features-container > div');
      techFeatures.forEach(feature => {
        if (feature instanceof HTMLElement) {
          feature.style.opacity = '1';
          feature.style.transform = 'translateY(0)';
        }
      });
    }, 100);
  }

  private initializeAnimations(): void {
    // Service cards animations - instant visibility with smooth entrance
    gsap.from('.services-cards-container > div', {
      scrollTrigger: {
        trigger: '.services-cards-container',
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      duration: 0.5,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // Technology features animations - instant visibility with smooth entrance
    gsap.from('.technology-features-container > div', {
      scrollTrigger: {
        trigger: '.technology-features-container',
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      duration: 0.5,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }
}