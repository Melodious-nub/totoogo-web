import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollAnimationService } from '../../core/scroll-animation.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, RouterModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit, AfterViewInit {
  private scrollAnimationService = inject(ScrollAnimationService);

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngAfterViewInit(): void {
    this.scrollAnimationService.initScrollAnimations();
    this.initializeAnimations();
    
    // Ensure contact option cards are visible immediately
    setTimeout(() => {
      const contactOptionCards = document.querySelectorAll('.contact-option-card');
      contactOptionCards.forEach(card => {
        if (card instanceof HTMLElement) {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }
      });
    }, 100);
  }

  private initializeAnimations(): void {
    // Contact option cards animations - instant visibility with smooth entrance
    gsap.from('.contact-option-card', {
      scrollTrigger: {
        trigger: '.contact-options-container',
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