import { Component } from '@angular/core';
import { IframeStateService } from '../../services/iframe-state.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Home Page with Iframe</h2>
    <input [(ngModel)]="iframeSrc" (input)="onUrlChange()" placeholder="Enter iframe URL" />
    <iframe [src]="safeIframeUrl" width="600" height="400"></iframe>
  `
})
export class HomeComponent {
  iframeSrc: string = '';
  safeIframeUrl: SafeResourceUrl = '';

  constructor(
    private iframeService: IframeStateService,
    private sanitizer: DomSanitizer
  ) {
    this.iframeSrc = this.iframeService.iframeUrl();
    this.safeIframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeSrc);
  }

  onUrlChange() {
    this.iframeService.updateIframeUrl(this.iframeSrc);
    this.safeIframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeSrc);
  }
}