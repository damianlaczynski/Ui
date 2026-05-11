/**
 * Filter Factory
 *
 * Factory for creating filter definitions and configurations
 */

import { TemplateRef } from '@angular/core';
import { FilterDefinition } from './filter-definition.interface';
import { DataGridFilterConfig } from '../models/data-grid-filter.model';
import { IconName } from '../../icon';
import { DataGridFilterTemplateContext } from '../models/data-grid-config.model';
import { createTextFilterDefinition } from './text-filter-definition';
import { createNumberFilterDefinition } from './number-filter-definition';
import { createDateFilterDefinition } from './date-filter-definition';
import { createSelectFilterDefinition } from './select-filter-definition';

/**
 * Registry of filter definitions
 */
class FilterDefinitionRegistry {
  private definitions = new Map<string, FilterDefinition>();

  constructor() {
    // Register default filter definitions
    this.register('text', createTextFilterDefinition());
    this.register('number', createNumberFilterDefinition());
    this.register('date', createDateFilterDefinition());
    this.register('select', createSelectFilterDefinition());
    this.register('multi-select', createSelectFilterDefinition()); // Uses same as select
  }

  /**
   * Register a custom filter definition
   */
  register(type: string, definition: FilterDefinition): void {
    this.definitions.set(type, definition);
  }

  /**
   * Get filter definition by type
   */
  get(type: string): FilterDefinition | undefined {
    return this.definitions.get(type);
  }

  /**
   * Get all registered filter types
   */
  getTypes(): string[] {
    return Array.from(this.definitions.keys());
  }
}

// Singleton instance
export const filterRegistry = new FilterDefinitionRegistry();

/**
 * Filter Factory
 *
 * Provides methods to create filter configurations and manage filter definitions
 */
export class FilterFactory {
  /**
   * Register a custom filter definition
   *
   * @example
   * ```typescript
   * class CustomFilterDefinition extends BaseFilterDefinition {
   *   readonly type = 'custom';
   *   // ... implement methods
   * }
   *
   * FilterFactory.register('custom', new CustomFilterDefinition());
   * ```
   */
  static register(type: string, definition: FilterDefinition): void {
    filterRegistry.register(type, definition);
  }

  /**
   * Get filter definition by type
   */
  static getDefinition(type: string): FilterDefinition | undefined {
    return filterRegistry.get(type);
  }

  /**
   * Create filter configuration from type
   *
   * @param type - Filter type (e.g., 'text', 'number', 'date', 'select')
   * @param options - Optional configuration overrides
   * @returns Filter configuration
   *
   * @example
   * ```typescript
   * const config = FilterFactory.create('text', {
   *   placeholder: 'Search...',
   *   debounceMs: 500
   * });
   * ```
   */
  static create(type: string, options?: Partial<DataGridFilterConfig>): DataGridFilterConfig {
    const definition = filterRegistry.get(type);
    if (!definition) {
      throw new Error(
        `Filter type '${type}' is not registered. Available types: ${filterRegistry.getTypes().join(', ')}`,
      );
    }

    return definition.createConfig(options);
  }

  /**
   * Get operator icon for a filter type and operator
   */
  static getOperatorIcon(type: string, operator: string): IconName {
    const definition = filterRegistry.get(type);
    return definition?.getOperatorIcon(operator) || ('filter' as IconName);
  }

  /**
   * Get operator text for a filter type and operator
   */
  static getOperatorText(type: string, operator: string): string {
    const definition = filterRegistry.get(type);
    return definition?.getOperatorText(operator) || operator;
  }

  /**
   * Get all operators for a filter type
   */
  static getOperators(type: string): Array<{ value: string; label: string; icon: string }> {
    const definition = filterRegistry.get(type);
    if (!definition) return [];

    return definition.getOperators().map(op => ({
      value: op.value,
      label: op.label,
      icon: op.icon,
    }));
  }

  /**
   * Set template reference for a filter definition
   *
   * @param type - Filter type (e.g., 'text', 'number', 'date', 'select')
   * @param template - Template reference to use for rendering this filter
   *
   * @example
   * ```typescript
   * // In component with @ViewChild
   * @ViewChild('textFilterTemplate') textFilterTemplate!: TemplateRef<DataGridFilterTemplateContext>;
   *
   * ngAfterViewInit() {
   *   FilterFactory.setTemplate('text', this.textFilterTemplate);
   * }
   * ```
   */
  static setTemplate(type: string, template: TemplateRef<DataGridFilterTemplateContext>): void {
    const definition = filterRegistry.get(type);
    if (!definition) {
      throw new Error(
        `Filter type '${type}' is not registered. Available types: ${filterRegistry.getTypes().join(', ')}`,
      );
    }

    // Use setTemplateRef if available (BaseFilterDefinition)
    if ('setTemplateRef' in definition && typeof definition.setTemplateRef === 'function') {
      definition.setTemplateRef(template);
    } else {
      // Fallback: directly set templateRef property
      definition.templateRef = template;
    }
  }

  /**
   * Get template reference for a filter definition
   *
   * @param type - Filter type
   * @returns Template reference or undefined if not set
   */
  static getTemplate(type: string): TemplateRef<DataGridFilterTemplateContext> | undefined {
    const definition = filterRegistry.get(type);
    return definition?.templateRef;
  }
}
