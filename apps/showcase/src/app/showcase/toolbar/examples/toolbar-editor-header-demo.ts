import { Component } from '@angular/core';
import {
  DividerComponent,
  DropdownComponent,
  TextComponent,
  ToolbarComponent,
  type DropdownItem,
  type ToolbarGroup
} from 'ui';

@Component({
  selector: 'app-toolbar-editor-header-demo',
  standalone: true,
  imports: [DividerComponent, DropdownComponent, TextComponent, ToolbarComponent],
  template: `
    <div
      style="display:flex;flex-wrap:wrap;align-items:center;gap:0.75rem;width:100%;max-width:58rem;padding:1rem;border:1px solid var(--color-neutral-stroke-rest);border-radius:1rem;background:var(--color-neutral-background-rest)"
    >
      <ui-toolbar [groups]="groups" />
      <ui-divider orientation="vertical" />
      <ui-dropdown [items]="fontSizeItems" placeholder="Size" style="width:7rem" />
      <ui-dropdown [items]="fontFamilyItems" placeholder="Font" style="width:10rem" />
      <ui-text placeholder="Find in document..." style="width:12rem" />
    </div>
  `
})
export class ToolbarEditorHeaderDemoComponent {
  protected readonly groups: ToolbarGroup[] = [
    {
      id: 'file',
      items: [
        { id: 'save', icon: 'save', tooltip: 'Save' },
        { id: 'share', icon: 'share', tooltip: 'Share' }
      ]
    },
    {
      id: 'format',
      items: [
        {
          id: 'bold',
          icon: 'text_bold',
          tooltip: 'Bold',
          type: 'toggle',
          selected: true
        },
        { id: 'italic', icon: 'text_italic', tooltip: 'Italic', type: 'toggle' },
        {
          id: 'underline',
          icon: 'text_underline',
          tooltip: 'Underline',
          type: 'toggle'
        }
      ]
    }
  ];

  protected readonly fontSizeItems: DropdownItem[] = [
    { value: '12', label: '12' },
    { value: '14', label: '14' },
    { value: '16', label: '16' },
    { value: '20', label: '20' }
  ];

  protected readonly fontFamilyItems: DropdownItem[] = [
    { value: 'segoe', label: 'Segoe UI' },
    { value: 'calibri', label: 'Calibri' },
    { value: 'georgia', label: 'Georgia' }
  ];
}
