import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableOfContentComponent, TimeComponent } from 'angular-ui';
import { ShowcaseHeaderComponent } from '@shared/components/showcase-header';
import { TimeInteractiveComponent } from './time.interactive';

@Component({
  selector: 'app-time-showcase',
  imports: [
    CommonModule,
    FormsModule,
    TimeComponent,
    TableOfContentComponent,
    ShowcaseHeaderComponent,
    TimeInteractiveComponent,
  ],
  template: `
    <div class="showcase showcase--responsive showcase__with-toc">
      <ui-table-of-content
        [sticky]="true"
        [offsetTop]="20"
        containerSelector=".showcase-content"
        [minLevel]="1"
        [maxLevel]="2"
      />
      <div class="showcase-content">
        <app-showcase-header title="Time" />
        <p class="showcase__description">
          Time field component (ui-time) built on top of field behavior and date overlay support.
        </p>

        <section id="basic" class="showcase__section">
          <h2 class="showcase__section__title">Basic</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <ui-time
                [ngModel]="basicValue()"
                (ngModelChange)="basicValue.set($event)"
                [label]="'Select time'"
                [placeholder]="'HH:mm'"
              />
              <div class="showcase__form-output">
                <strong>Value:</strong> {{ basicValue() || 'Not set' }}
              </div>
            </div>
          </div>
        </section>

        <section id="states" class="showcase__section">
          <h2 class="showcase__section__title">States</h2>
          <div class="showcase__grid">
            <div class="showcase__item">
              <h3>Disabled</h3>
              <ui-time
                [ngModel]="disabledValue()"
                (ngModelChange)="disabledValue.set($event)"
                [label]="'Disabled time'"
                [placeholder]="'HH:mm'"
                [disabled]="true"
              />
            </div>
            <div class="showcase__item">
              <h3>Required</h3>
              <ui-time
                [ngModel]="requiredValue()"
                (ngModelChange)="requiredValue.set($event)"
                [label]="'Required time'"
                [placeholder]="'HH:mm'"
                [required]="true"
              />
            </div>
          </div>
        </section>

        <section id="interactive-demo" class="showcase__section">
          <h2 class="showcase__section__title">Interactive Demo</h2>
          <app-time-interactive />
        </section>
      </div>
    </div>
  `,
})
export class TimeShowcaseComponent {
  basicValue = signal('');
  disabledValue = signal('09:30');
  requiredValue = signal('');
}
