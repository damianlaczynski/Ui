# ui

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.0.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
ng build ui
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

#### Building the Library

Build the library using:
```bash
npm run build:lib
```

Or watch mode for development:
```bash
npm run build:lib:watch
```

#### Publishing to npm

**Before publishing:**
1. Make sure you're logged in to npm:
   ```bash
   npm login
   ```

2. Update the version in `packages/ui/package.json` or use the automated scripts

**Publishing options:**

**Option 1: Manual publishing**
```bash
npm run build:lib
npm run publish:lib
```

**Option 2: Automated version bump and publish**
```bash
# Patch version (1.0.0 → 1.0.1)
npm run publish:lib:patch

# Minor version (1.0.0 → 1.1.0)
npm run publish:lib:minor

# Major version (1.0.0 → 2.0.0)
npm run publish:lib:major
```

**Note:** The automated scripts will:
1. Update the version in `packages/ui/package.json`
2. Build the library
3. Publish to npm

**For scoped packages (e.g., `ui`):**
```bash
npm publish --access public
```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
