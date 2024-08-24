import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [],
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
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

  openFileDialog() {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const imagePreview = document.getElementById('image-preview');
        if (imagePreview) {
          imagePreview.innerHTML = ''; // Clear previous image
          const img = document.createElement('img');
          img.src = e.target.result;
          imagePreview.appendChild(img);
        }
      };

      reader.readAsDataURL(file);
    }
  }
}
