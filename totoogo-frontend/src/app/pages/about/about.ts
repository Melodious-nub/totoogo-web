import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollAnimationService } from '../../core/scroll-animation.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements OnInit, AfterViewInit {
  private scrollAnimationService = inject(ScrollAnimationService);

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    this.scrollAnimationService.initScrollAnimations();
    this.initializeAnimations();
    
    // Ensure value cards are visible immediately
    setTimeout(() => {
      const valueCards = document.querySelectorAll('.value-card');
      valueCards.forEach(card => {
        if (card instanceof HTMLElement) {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }
      });
    }, 100);
  }

  private initializeAnimations(): void {
    // Value cards animations - instant visibility with smooth entrance
    gsap.from('.value-card', {
      scrollTrigger: {
        trigger: '.values-cards-container',
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