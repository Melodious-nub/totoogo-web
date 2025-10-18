import { Component, signal, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('batteryAnimation', { static: false }) batteryAnimation!: ElementRef;

  batteryLevel = signal(75);
  isAnimating = signal(false);

  ngOnInit(): void {
    this.startBatteryAnimation();
  }

  ngAfterViewInit(): void {
    this.initializeAnimations();
  }

  private startBatteryAnimation(): void {
    setInterval(() => {
      this.batteryLevel.set(Math.floor(Math.random() * 40) + 60); // Random between 60-100%
    }, 3000);
  }

  private initializeAnimations(): void {
    // Add GSAP animations here if needed
    this.animateFloatingElements();
  }

  private animateFloatingElements(): void {
    // Simple CSS animation for floating elements
    const elements = document.querySelectorAll('.floating-element');
    elements.forEach((element, index) => {
      (element as HTMLElement).style.animationDelay = `${index * 0.5}s`;
    });
  }
}