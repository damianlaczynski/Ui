import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

export function highlightTypeScript(code: string): string {
  return Prism.highlight(code, Prism.languages['typescript'], 'typescript');
}
