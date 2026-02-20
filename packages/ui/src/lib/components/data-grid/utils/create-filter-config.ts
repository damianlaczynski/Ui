/**
 * Create Filter Configuration
 *
 * Factory method to create DataGridFilterConfig with automatic defaults
 * from FilterDefinition system
 */

import { DataGridFilterConfig } from '../models/data-grid-filter.model';
import { FilterFactory, filterRegistry } from '../filters/filter-factory';

/**
 * Options for creating a filter configuration
 */
export interface CreateFilterConfigOptions {
  /**
   * Filter type (must be a registered FilterDefinition type)
   */
  type: string;

  /**
   * Placeholder text for the filter input
   */
  placeholder?: string;

  /**
   * Selected operators from the filter type
   * If not specified, uses all operators from FilterDefinition
   */
  operators?: string[];

  /**
   * Default operator (must be one of the operators from FilterDefinition)
   * If not specified, uses default operator from FilterDefinition
   */
  defaultOperator?: string;

  /**
   * Default value for the filter
   */
  defaultValue?: any;

  /**
   * Debounce delay in ms (for text filters)
   * If not specified, uses default from FilterDefinition
   */
  debounceMs?: number;

  /**
   * Options for select/multi-select filters
   */
  parameters?: any;
}

/**
 * Creates a filter configuration with automatic defaults from FilterDefinition
 *
 * This factory method automatically:
 * - Validates filter type against registered FilterDefinitions
 * - Sets default operators from FilterDefinition if not provided
 * - Sets default operator from FilterDefinition if not provided
 * - Sets default debounce from FilterDefinition if not provided
 * - Validates that provided operators exist in FilterDefinition
 * - Validates that defaultOperator exists in FilterDefinition
 *
 * @param options - Filter configuration options
 * @returns Complete filter configuration with defaults applied
 *
 * @example
 * ```typescript
 * // Simple text filter with all defaults
 * const textFilter = createFilterConfig({ type: 'text' });
 *
 * // Text filter with custom placeholder and debounce
 * const customTextFilter = createFilterConfig({
 *   type: 'text',
 *   placeholder: 'Search projects...',
 *   debounceMs: 500
 * });
 *
 * // Number filter with selected operators
 * const numberFilter = createFilterConfig({
 *   type: 'number',
 *   operators: ['equals', 'greaterThan', 'lessThan'],
 *   defaultOperator: 'equals'
 * });
 *
 * // Select filter with options
 * const selectFilter = createFilterConfig({
 *   type: 'select',
 *   placeholder: 'Select status...',
 *   options: [
 *     { label: 'Active', value: 'active' },
 *     { label: 'Inactive', value: 'inactive' }
 *   ]
 * });
 * ```
 */
export function createFilterConfig(options: CreateFilterConfigOptions): DataGridFilterConfig {
  const { type, placeholder, operators, defaultOperator, defaultValue, debounceMs, parameters } =
    options;

  // Get FilterDefinition for validation and defaults
  const definition = FilterFactory.getDefinition(type);
  if (!definition) {
    throw new Error(
      `Filter type '${type}' is not registered. Available types: ${filterRegistry.getTypes().join(', ')}`,
    );
  }

  // Get available operators from FilterDefinition
  const availableOperators = definition.getOperators();
  const availableOperatorValues = availableOperators.map(op => op.value);

  // Validate and set operators
  let finalOperators: string[];
  if (operators) {
    // Validate that all provided operators exist in FilterDefinition
    const invalidOperators = operators.filter(op => !availableOperatorValues.includes(op));
    if (invalidOperators.length > 0) {
      throw new Error(
        `Invalid operators for filter type '${type}': ${invalidOperators.join(', ')}. Available operators: ${availableOperatorValues.join(', ')}`,
      );
    }
    finalOperators = operators;
  } else {
    // Use all operators from FilterDefinition
    finalOperators = availableOperatorValues;
  }

  // Validate and set default operator
  let finalDefaultOperator: string;
  if (defaultOperator) {
    // Validate that defaultOperator exists in FilterDefinition
    if (!availableOperatorValues.includes(defaultOperator)) {
      throw new Error(
        `Invalid default operator '${defaultOperator}' for filter type '${type}'. Available operators: ${availableOperatorValues.join(', ')}`,
      );
    }
    // Validate that defaultOperator is in the selected operators
    if (!finalOperators.includes(defaultOperator)) {
      throw new Error(
        `Default operator '${defaultOperator}' must be included in the selected operators: ${finalOperators.join(', ')}`,
      );
    }
    finalDefaultOperator = defaultOperator;
  } else {
    // Use default operator from FilterDefinition
    finalDefaultOperator = definition.getDefaultOperator().value;
    // Ensure default operator is in the selected operators
    if (!finalOperators.includes(finalDefaultOperator)) {
      // If default operator is not in selected operators, use first selected operator
      finalDefaultOperator = finalOperators[0];
    }
  }

  // Create base config using FilterFactory
  const baseConfig = FilterFactory.create(type, {
    placeholder,
    debounceMs,
    parameters,
  });

  // Override with validated values
  return {
    ...baseConfig,
    operators: finalOperators,
    defaultOperator: finalDefaultOperator,
    defaultValue,
  };
}
