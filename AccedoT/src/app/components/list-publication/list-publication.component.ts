import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-list-publication',
  standalone: true,
  imports: [ImageCropperComponent],
  templateUrl: './list-publication.component.html',
  styleUrl: './list-publication.component.css'
})
export class ListPublicationComponent {
  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl  = '';

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  fileChangeEvent(event: Event): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    if (event.objectUrl) {
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    }
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
}
