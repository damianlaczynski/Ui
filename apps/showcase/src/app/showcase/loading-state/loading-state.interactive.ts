import { Component, signal, computed } from '@angular/core';
import { LoadingStateComponent, CardComponent, Size } from 'ui';
import { InteractiveShowcaseComponent } from '@shared/components/interactive-showcase';
import type { ShowcaseConfig } from '@shared/components/interactive-showcase';
import { LOADING_STATE_SHOWCASE_CONFIG } from './loading-state.showcase.config';

@Component({
  selector: 'app-loading-state-interactive',
  imports: [LoadingStateComponent, CardComponent, InteractiveShowcaseComponent],
  template: `
    <app-interactive-showcase
      [config]="showcaseConfig"
      [showEventLog]="true"
      (valuesChange)="values.set($event)"
      (resetRequested)="onReset()"
    >
      <div preview>
        @if (currentOverlay()) {
          <ui-loading-state
            [title]="currentTitle()"
            [description]="currentDescription()"
            [size]="currentSize()"
            [spinnerSize]="currentSpinnerSize()"
            [overlay]="currentOverlay()"
            [blurContent]="currentBlurContent()"
            [isLoading]="true"
          >
            <ui-card appearance="filled" ariaLabel="Sample content card">
              <div uiCardHeader><strong>Sample Content</strong></div>
              <p uiCardBody>This content will be covered by the loading overlay.</p>
            </ui-card>
          </ui-loading-state>
        } @else {
          <ui-loading-state
            [title]="currentTitle()"
            [description]="currentDescription()"
            [size]="currentSize()"
            [spinnerSize]="currentSpinnerSize()"
          />
        }
      </div>
    </app-interactive-showcase>
  `,
})
export class LoadingStateInteractiveComponent {
  showcaseConfig: ShowcaseConfig = LOADING_STATE_SHOWCASE_CONFIG;

  values = signal<Record<string, unknown>>({
    title: 'Loading data...',
    description: 'Please wait while we fetch the information.',
    size: 'medium',
    spinnerSize: 'medium',
    overlay: false,
    blurContent: true,
    fullScreen: false,
  });

  currentTitle = computed(() => (this.values()['title'] as string) || '');
  currentDescription = computed(() => (this.values()['description'] as string) || '');
  currentSize = computed(() => (this.values()['size'] as Size) || 'medium');
  currentSpinnerSize = computed(() => (this.values()['spinnerSize'] as Size) || 'medium');
  currentOverlay = computed(() => (this.values()['overlay'] as boolean) ?? false);
  currentBlurContent = computed(() => (this.values()['blurContent'] as boolean) ?? true);

  onReset(): void {}
}
