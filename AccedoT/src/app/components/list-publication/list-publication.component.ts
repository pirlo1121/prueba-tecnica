import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageState } from '../../state/image.state';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-publication',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-publication.component.html',
  styleUrl: './list-publication.component.css'
})
export class ListPublicationComponent {
  imageData$: Observable<string | null>;

  constructor(private store: Store<{ image: ImageState }>) {
    this.imageData$ = this.store.select(state => state.image.imageData);
  }

  ngOnInit() {}

}
