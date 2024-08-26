import { Component, HostListener, OnInit } from '@angular/core';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { ImageState } from '../../state/image.state';
import { Store } from '@ngrx/store';
import { setImageData } from '../../state/image.actions';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [],
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  private cropper: Cropper | null = null;


  constructor(private store: Store<{ image: ImageState }>) {}

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
  //Subir foto
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const imagePreview = document.getElementById('image-preview');
        if (imagePreview) {
          imagePreview.innerHTML = '';
          const img = document.createElement('img');
          img.src = e.target.result;
          imagePreview.appendChild(img);

          // Init Cropper.js
          this.initializeCropper(img);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  private initializeCropper(img: HTMLImageElement) {
    this.cropper = new Cropper(img, {
      aspectRatio: 1,
      viewMode: 1,
      autoCropArea: 1,
      responsive: true,
    });
  }

  cropImage() {
    if (this.cropper) {
      const croppedCanvas = this.cropper.getCroppedCanvas();
      const croppedImage = croppedCanvas.toDataURL();

      const inputBox = document.getElementById('input-box') as HTMLInputElement;
      const inputText = inputBox ? inputBox.value : '';

      this.store.dispatch(setImageData({ imageData: croppedImage, text: inputText }));

      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      // restaurar todo el inputt

      if (fileInput) {
        fileInput.value = '';
        inputBox.value = '';
        inputBox.classList.remove('active');
        const tabs = document.getElementById('tabs');
        if (tabs) tabs.classList.remove('active');

        const imagePreview = document.getElementById('image-preview');
        if (imagePreview) imagePreview.innerHTML = '';

      }
    }
  }
}
