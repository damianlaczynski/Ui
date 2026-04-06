import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableOfContentComponent } from 'ui';

interface QuickStartStep {
  id: string;
  title: string;
  description: string;
  code?: string;
}

@Component({
  selector: 'app-getting-started',
  imports: [RouterLink, TableOfContentComponent],
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
})
export class GettingStartedComponent {
  readonly quickStartSteps: QuickStartStep[] = [
    {
      id: 'install',
      title: 'Install the package',
      description: 'Add ui to your workspace with your package manager of choice.',
      code: 'npm install ui',
    },
    {
      id: 'styles',
      title: 'Register base styles',
      description:
        'Include library styles once in angular.json so every component gets consistent tokens.',
      code: `"styles": [
  "node_modules/@laczynski/ui/src/lib/scss/main.scss",
  "src/styles.scss"
]`,
    },
    {
      id: 'import',
      title: 'Import only what you use',
      description:
        'Use standalone imports in your feature component to keep bundles lean and code explicit.',
      code: `import { ButtonComponent } from 'ui';

@Component({
  selector: 'app-example',
  imports: [ButtonComponent],
  template: '<ui-button variant="primary">Save changes</ui-button>'
})
export class ExampleComponent {}`,
    },
    {
      id: 'theme',
      title: 'Set up theming',
      description:
        'Start with default light/dark support, then override CSS variables in your app styles.',
    },
  ];

  readonly firstFeatureChecklist: string[] = [
    'Define one source of truth for colors and spacing tokens.',
    'Add form validation states (default, error, disabled, loading).',
    'Test keyboard navigation and focus states before release.',
    'Document your internal usage pattern in one page for the team.',
  ];
}
