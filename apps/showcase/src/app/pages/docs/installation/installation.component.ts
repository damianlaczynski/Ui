import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableOfContentComponent } from 'ui';

interface InstallCommand {
  manager: string;
  command: string;
}

@Component({
  selector: 'app-installation',
  imports: [RouterLink, TableOfContentComponent],
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss'],
})
export class InstallationComponent {
  readonly iconSpriteAssetJson = `{
  "glob": "**/*",
  "input": "node_modules/@laczynski/ui/assets/icons",
  "output": "/assets/icons"
}`;

  readonly prerequisites: string[] = [
    'Node.js 18+ (LTS recommended)',
    'Angular 17+ project (standalone or module-based)',
    'Package manager: npm, yarn or pnpm',
  ];

  readonly installCommands: InstallCommand[] = [
    { manager: 'npm', command: 'npm install @laczynski/ui' },
  ];

  readonly verificationChecks: string[] = [
    'The app compiles without unknown element errors in templates.',
    'Base component styles are visible (buttons, inputs, typography).',
    'Dark and light mode tokens switch correctly if your app supports themes.',
    'Icons using ui-icon load: /assets/icons/sprite.svg is present in the built output when you install from npm.',
  ];
}
