import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicationComponent } from './components/publication/publication.component';
import { ListPublicationComponent } from './components/list-publication/list-publication.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PublicationComponent, ListPublicationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AccedoT';
}
