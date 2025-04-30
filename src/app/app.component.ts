import { Component, effect } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { IframeStateService } from './services/iframe-state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private router: Router, private iframeService: IframeStateService) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const storedUrl = localStorage.getItem('LAST_VISITED_URL');
      if (storedUrl) {
        this.router.navigateByUrl(storedUrl);
      }

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          localStorage.setItem('LAST_VISITED_URL', event.urlAfterRedirects);
        }
      });

      // Only start broadcast listener after construction
      this.iframeService.initBroadcastListenerOnce();
    }
  }

}