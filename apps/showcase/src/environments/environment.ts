import packageJson from '../../../../package.json';

export const environment = {
  production: false,
  mockUser: true,
  appVersion: packageJson.version,
  apiUrl: 'http://localhost:5000',
  githubRepoUrl: 'https://github.com/DamianLaczynski/ui/',
};
