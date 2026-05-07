import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonGroupComponent, type RadioButtonItem } from 'ui';

@Component({
  selector: 'app-radio-button-group-layout-demo',
  standalone: true,
  imports: [FormsModule, RadioButtonGroupComponent],
  template: `
    <div
      style="display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem;width:100%;max-width:48rem"
    >
      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Segmented horizontal</div>
        <ui-radio-button-group
          label="Density"
          [items]="densityItems"
          orientation="horizontal"
          layout="segmented"
          [(ngModel)]="horizontalValue"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>

      <div
        style="display:flex;flex-direction:column;gap:0.875rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
      >
        <div style="font-size:0.875rem;font-weight:600">Separate vertical</div>
        <ui-radio-button-group
          label="Review mode"
          [items]="reviewItems"
          orientation="vertical"
          layout="separate"
          [(ngModel)]="verticalValue"
          [ngModelOptions]="{ standalone: true }"
        />
      </div>
    </div>
  `,
})
export class RadioButtonGroupLayoutDemoComponent {
  protected horizontalValue = 'comfortable';
  protected verticalValue = 'summary';

  protected readonly densityItems: RadioButtonItem[] = [
    { id: 'compact', label: 'Compact', value: 'compact' },
    { id: 'comfortable', label: 'Comfortable', value: 'comfortable' },
    { id: 'spacious', label: 'Spacious', value: 'spacious' },
  ];

  protected readonly reviewItems: RadioButtonItem[] = [
    { id: 'summary', label: 'Summary', value: 'summary' },
    { id: 'comments', label: 'Comments', value: 'comments' },
    { id: 'history', label: 'History', value: 'history' },
  ];
}
