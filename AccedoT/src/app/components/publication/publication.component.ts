import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent {

  ngOnInit(): void {
    const inputBox = document.getElementById('input-box');
    const tabs = document.getElementById('tabs');

    if (inputBox && tabs) {
      inputBox.addEventListener('click', () => {
        inputBox.classList.add('active');
        tabs.classList.add('active');
      });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const container = document.getElementById('container');
    const tabs = document.getElementById('tabs');
    const inputBox = document.getElementById('input-box');

    if (container && tabs && inputBox) {
      if (!container.contains(event.target as Node)) {
        inputBox.classList.remove('active');
        tabs.classList.remove('active');
      }
    }
  }
}
