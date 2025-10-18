import { Component, signal, OnInit, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollAnimationService } from '../../core/scroll-animation.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('batteryAnimation', { static: false }) batteryAnimation!: ElementRef;

  private scrollAnimationService = inject(ScrollAnimationService);
  batteryLevel = signal(75);
  isAnimating = signal(false);
  chargingLevel = signal(0);
  isCharging = signal(false);

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.startBatteryAnimation();
  }

  ngAfterViewInit(): void {
    this.initializeAnimations();
    this.scrollAnimationService.initScrollAnimations();
    
    // Ensure solution cards are visible immediately
    setTimeout(() => {
      const solutionCards = document.querySelectorAll('.solution-card');
      solutionCards.forEach(card => {
        if (card instanceof HTMLElement) {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }
      });
    }, 100);

    // Ensure partnership cards are visible immediately
    setTimeout(() => {
      const partnershipCards = document.querySelectorAll('.partnership-card');
      partnershipCards.forEach(card => {
        if (card instanceof HTMLElement) {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }
      });
    }, 100);
  }

  private startBatteryAnimation(): void {
    setInterval(() => {
      this.batteryLevel.set(Math.floor(Math.random() * 40) + 60); // Random between 60-100%
    }, 3000);
    
    // Start charging animation
    this.startChargingAnimation();
  }

  private startChargingAnimation(): void {
    // Simulate charging process
    setInterval(() => {
      if (this.chargingLevel() < 100) {
        this.isCharging.set(true);
        this.chargingLevel.set(this.chargingLevel() + 2);
      } else {
        this.isCharging.set(false);
        // Reset after a delay
        setTimeout(() => {
          this.chargingLevel.set(0);
        }, 2000);
      }
    }, 100);
  }

  private initializeAnimations(): void {
    // Hero section animations
    gsap.from('.hero-title', {
      duration: 1.2,
      y: 100,
      opacity: 0,
      ease: 'power3.out'
    });

    gsap.from('.hero-subtitle', {
      duration: 1.2,
      y: 50,
      opacity: 0,
      delay: 0.3,
      ease: 'power3.out'
    });

    gsap.from('.hero-buttons', {
      duration: 1,
      y: 50,
      opacity: 0,
      delay: 0.6,
      ease: 'power3.out'
    });

    // Battery animation
    gsap.from('.battery-main', {
      duration: 1.5,
      scale: 0,
      rotation: 180,
      ease: 'back.out(1.7)',
      delay: 0.8
    });

    // Floating elements animation
    gsap.from('.floating-element', {
      duration: 2,
      y: 100,
      opacity: 0,
      stagger: 0.2,
      delay: 1.2,
      ease: 'power2.out'
    });

    // Scroll-triggered animations
    gsap.from('.feature-card', {
      scrollTrigger: {
        trigger: '.feature-card',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      duration: 1,
      y: 100,
      opacity: 0,
      stagger: 0.2,
      ease: 'power3.out'
    });

    // Solution cards animations - instant visibility with smooth entrance
    gsap.from('.solution-card', {
      scrollTrigger: {
        trigger: '.solution-cards-container',
        start: 'top 90%',
        toggleActions: 'play none none none'
      },
      duration: 0.5,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // Partnership section animations - simplified for instant visibility
    gsap.from('.partnership-card', {
      scrollTrigger: {
        trigger: '.partnership-card',
        start: 'top 95%',
        toggleActions: 'play none none none'
      },
      duration: 0.4,
      y: 20,
      opacity: 0,
      stagger: 0.05,
      ease: 'power1.out'
    });

    // Charging battery animation
    gsap.from('.charging-battery', {
      scrollTrigger: {
        trigger: '.charging-animation-container',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      duration: 1.5,
      scale: 0,
      rotation: 180,
      ease: 'back.out(1.7)'
    });

    // Charging elements animation
    gsap.from('.charging-element', {
      scrollTrigger: {
        trigger: '.charging-animation-container',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      duration: 2,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: 'power2.out'
    });

    this.animateFloatingElements();
  }

  private animateFloatingElements(): void {
    // Enhanced floating elements animation
    const elements = document.querySelectorAll('.floating-element');
    elements.forEach((element, index) => {
      gsap.to(element, {
        y: -20,
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        delay: index * 0.3
      });
    });
  }
}