import {
  Component, signal, effect, ViewChild, ElementRef, TemplateRef, ViewContainerRef,
  inject, computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { PortalModule, TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-virtual-dropdown',
  standalone: true,
  imports: [CommonModule, ScrollingModule, PortalModule],
  template: `
    <div class="dropdown-container" (click)="toggleDropdown()" #trigger>
      <div class="placeholder">{{ selected() || 'Select an item' }}</div>
    </div>

    <ng-template #dropdownMenu>
      <cdk-virtual-scroll-viewport itemSize="40" class="dropdown-viewport">
        <div *cdkVirtualFor="let item of items" class="dropdown-item"
             (click)="selectItem(item)">
          {{ item }}
        </div>
      </cdk-virtual-scroll-viewport>
    </ng-template>
  `,
  styles: [`
    .dropdown-container {
      border: 1px solid #ccc;
      padding: 8px;
      width: 200px;
      cursor: pointer;
      background: white;
    }

    .placeholder {
      color: #666;
    }

    .dropdown-viewport {
      height: 200px;
      width: 200px;
      background: white;
      border: 1px solid #ccc;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }

    .dropdown-item {
      padding: 8px;
      cursor: pointer;
    }

    .dropdown-item:hover {
      background-color: #f1f1f1;
    }
  `]
})
export class VirtualDropdownComponent {
  items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);
  selected = signal<string | null>(null);

  overlayRef: OverlayRef | null = null;
  overlay = inject(Overlay);
  viewContainerRef = inject(ViewContainerRef);

  @ViewChild('dropdownMenu') dropdownMenuRef!: TemplateRef<unknown>;
  @ViewChild('trigger') triggerRef!: ElementRef;

  toggleDropdown() {
    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
      return;
    }

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-transparent-backdrop',
        positionStrategy: this.overlay.position()
          .flexibleConnectedTo(this.triggerRef)
          .withPositions([{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' }])
      });

      this.overlayRef.backdropClick().subscribe(() => this.overlayRef?.detach());
    }

    const portal = new TemplatePortal(this.dropdownMenuRef, this.viewContainerRef);
    this.overlayRef.attach(portal);
  }

  selectItem(item: string) {
    this.selected.set(item);
    this.overlayRef?.detach();
  }
}
