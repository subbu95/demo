import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class IframeStateService {
  private readonly CHANNEL_NAME = 'IFRAME_SYNC_CHANNEL';
  private readonly STORAGE_KEY = 'IFRAME_INIT_STATE';
  private channel: BroadcastChannel | null = null;

  iframeUrl = signal<string>(this.getStoredIframeUrl());

  constructor() {}

  initBroadcastListenerOnce(): void {
    if (typeof window === 'undefined') return;

    this.channel = new BroadcastChannel(this.CHANNEL_NAME);
    this.channel.onmessage = (event) => {
      if (event.data?.type === 'IFRAME_STATE') {
        this.iframeUrl.set(event.data.payload);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(event.data.payload));
        this.channel?.close(); // stop listening after sync
        this.channel = null;
      }
    };
  }

  private getStoredIframeUrl(): string {
    if (typeof window === 'undefined') return 'https://example.com';
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : 'https://example.com';
  }

  updateIframeUrl(newUrl: string) {
    this.iframeUrl.set(newUrl);
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newUrl));
    }
  }

  broadcastIframeUrlOnce() {
    if (typeof window !== 'undefined') {
      const channel = new BroadcastChannel(this.CHANNEL_NAME);
      channel.postMessage({
        type: 'IFRAME_STATE',
        payload: this.iframeUrl(),
      });
      channel.close();
    }
  }
}
