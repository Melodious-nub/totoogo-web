import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {

  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  initScrollAnimations(): void {
    // Fade-in sections
    gsap.utils.toArray('.fade-in-section').forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%', // When the top of the section hits 80% of the viewport
          end: 'bottom 20%',
          toggleActions: 'play none none reverse', // Play on enter, reverse on leave back up
        }
      });
    });

    // Stagger animations for cards/grid items
    gsap.utils.toArray('.stagger-animation').forEach((container: any) => {
      gsap.from(container.children, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      });
    });
  }
}
