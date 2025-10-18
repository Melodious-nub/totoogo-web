import { Component, OnInit, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ScrollAnimationService } from '../../core/scroll-animation.service';
import { ApiService } from '../../../core/api';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit, AfterViewInit, OnDestroy {
  private scrollAnimationService = inject(ScrollAnimationService);
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);
  private destroy$ = new Subject<void>();

  contactForm!: FormGroup;
  isSubmitting = false;

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.initializeForm();
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

  private initializeForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const formData = {
        name: this.contactForm.get('name')?.value,
        email: this.contactForm.get('email')?.value,
        description: this.contactForm.get('description')?.value
      };

      this.apiService.contactUs(formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: any) => {
            this.isSubmitting = false;
            this.showSuccessAlert();
            this.resetAllInputs();
          },
          error: (error: any) => {
            this.isSubmitting = false;
            this.showErrorAlert(error);
          }
        });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  private showSuccessAlert(): void {
    Swal.fire({
      title: 'Success!',
      text: 'Your message has been sent successfully. We will get back to you soon!',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#10b981',
      timer: 5000,
      timerProgressBar: true
    });
  }

  private showErrorAlert(error: any): void {
    let errorMessage = 'Failed to send your message. Please try again later.';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    Swal.fire({
      title: 'Error!',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#ef4444'
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldLabel(fieldName)} must not exceed ${field.errors['maxlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      name: 'Name',
      email: 'Email',
      description: 'Message'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }

  private resetAllInputs(): void {
    // Reset reactive form controls
    this.contactForm.reset();
    
    // Reset all other input fields manually
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach((input: any) => {
          if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
          } else {
            input.value = '';
          }
        });
      }
    }, 100);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}