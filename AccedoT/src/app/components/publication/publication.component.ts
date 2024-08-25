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

          // Initialize Cropper.js
          this.cropper = new Cropper(img, {
            aspectRatio: 1,
            viewMode: 1,
            autoCropArea: 1,
            responsive: true,
          });
        }
      };

      reader.readAsDataURL(file);
    }
  }

  cropImage() {
    if (this.cropper) {
      const croppedCanvas = this.cropper.getCroppedCanvas();
      const croppedImage = croppedCanvas.toDataURL();

      // Captura el texto del input
      const inputBox = document.getElementById('input-box') as HTMLInputElement;
      const inputText = inputBox ? inputBox.value : '';

      // Despacha a NgRx
      console.log(inputText)
      this.store.dispatch(setImageData({ imageData: croppedImage, text: inputText }));

      // Actualiza la vista previa de la imagen
      const imagePreview = document.getElementById('image-preview');
      if (imagePreview) {
        imagePreview.innerHTML = '';
        const img = document.createElement('img');
        img.src = croppedImage;
        imagePreview.appendChild(img);
      }

      // Restablece el valor del input de archivo
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = ''; // Esto permite cargar una nueva imagen
      }
    }
  }
}
