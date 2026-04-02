import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableOfContentComponent } from 'ui';

@Component({
  selector: 'app-i18n-docs',
  imports: [RouterLink, TableOfContentComponent],
  templateUrl: './i18n.component.html',
})
export class I18nComponent {
  readonly appConfigCode = `import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideUiI18nWithNgxTranslate } from 'ui/ngx-translate';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
    }),
    provideUiI18nWithNgxTranslate({ prefix: 'ui' }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      return firstValueFrom(translate.use('en'));
    }),
  ],
};`;

  readonly translationJsonCode = `{
  "ui": {
    "field": {
      "file": {
        "uploadText": "Click to upload or drag and drop",
        "singleFileHint": "Single file only",
        "multipleFilesHint": "Multiple files allowed",
        "filesSelected": "{{count}} files selected",
        "clearFilesAriaLabel": "Clear files",
        "removeFileAriaLabel": "Remove {{name}}"
      }
    }
  }
}`;

  readonly customAdapterCode = `import { makeEnvironmentProviders } from '@angular/core';
import { provideUiI18n, UI_TRANSLATE_FN } from 'ui';
import { MyTranslationService } from './my-translation.service';

export function provideUiI18nWithCustomService() {
  return makeEnvironmentProviders([
    provideUiI18n({ prefix: 'ui' }),
    {
      provide: UI_TRANSLATE_FN,
      deps: [MyTranslationService],
      useFactory: (service: MyTranslationService) => {
        return (key: string, params?: Record<string, unknown>) =>
          service.translateInstant(key, params);
      },
    },
  ]);
}`;

  readonly checklist: string[] = [
    "Use 'ui/ngx-translate' import for ngx adapter.",
    "Keep your keys under the configured prefix (default: 'ui').",
    'Provide explicit label/ariaLabel for business-specific wording.',
    'Use component inputs like uploadText/uploadHint when you want local override.',
    'Verify language switch in runtime (EN <-> PL) on at least one form page.',
  ];
}
