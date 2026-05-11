import { Component, computed, inject, input } from '@angular/core';

import { Size } from '../utils';
import { UiI18nService } from '../../i18n';

@Component({
  selector: 'ui-kbd',
  standalone: true,
  imports: [],
  templateUrl: './kbd.component.html',
})
export class KbdComponent {
  //Services
  private readonly i18n = inject(UiI18nService);

  //Inputs
  text = input.required<string>();
  size = input<Size>('medium');
  appearance = input<'default' | 'filled'>('default');
  ariaLabelText = computed(() =>
    this.i18n.t('kbd.ariaLabel', `Keyboard key: ${this.text()}`, { text: this.text() }),
  );

  //Computed
  kbdClasses = computed(() =>
    ['kbd', `kbd--${this.size()}`, `kbd--${this.appearance()}`].join(' '),
  );
}
