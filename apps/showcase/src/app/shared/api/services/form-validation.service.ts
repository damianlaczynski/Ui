import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { ValidationError } from '../models/api-response.model';

/**
 * Service for automatically mapping API validation errors to ReactiveForms
 */
@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  /**
   * Maps API validation errors to form controls
   * @param form FormGroup to apply errors to
   * @param validationErrors Array of validation errors from API
   * @param fieldMapping Optional mapping between API field names and form control names
   * @returns Object with field names as keys and error messages as values
   */
  applyValidationErrors(
    form: FormGroup,
    validationErrors: ValidationError[],
    fieldMapping?: Record<string, string>,
  ): Record<string, string> {
    const appliedErrors: Record<string, string> = {};

    if (!validationErrors || validationErrors.length === 0) {
      return appliedErrors;
    }

    for (const validationError of validationErrors) {
      // Normalize field name (convert PascalCase to camelCase if needed)
      const normalizedIdentifier = this.normalizeFieldName(validationError.identifier);

      // Get the form control name (either from mapping or use normalized identifier)
      const controlName =
        fieldMapping?.[validationError.identifier] ||
        fieldMapping?.[normalizedIdentifier] ||
        normalizedIdentifier;

      // Try to find the control (supports nested paths like 'address.street')
      const control = this.getControlByPath(form, controlName);

      if (control) {
        // Set the validation error on the control
        const errors: ValidationErrors = {
          serverError: {
            message: validationError.errorMessage,
            code: validationError.errorCode,
            severity: validationError.severity,
          },
        };

        // Merge with existing errors
        control.setErrors({ ...control.errors, ...errors });
        control.markAsTouched();
        control.markAsDirty();

        appliedErrors[controlName] = validationError.errorMessage;
      }
    }

    return appliedErrors;
  }

  /**
   * Normalizes field name from PascalCase to camelCase
   * @param fieldName Field name that may be in PascalCase
   * @returns Field name in camelCase
   */
  private normalizeFieldName(fieldName: string): string {
    if (!fieldName || fieldName.length === 0) {
      return fieldName;
    }

    // If already in camelCase (first letter is lowercase), return as is
    if (fieldName[0] === fieldName[0].toLowerCase()) {
      return fieldName;
    }

    // Convert PascalCase to camelCase
    return fieldName[0].toLowerCase() + fieldName.slice(1);
  }

  /**
   * Clears all server validation errors from form controls
   * @param form FormGroup to clear errors from
   */
  clearValidationErrors(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control) {
        const errors = control.errors;
        if (errors && errors['serverError']) {
          const { serverError: _serverError, ...remainingErrors } = errors;
          if (Object.keys(remainingErrors).length > 0) {
            control.setErrors(remainingErrors);
          } else {
            control.setErrors(null);
          }
        }
      }
    });
  }

  /**
   * Gets a control by path (supports nested paths like 'address.street')
   * @param form FormGroup to search in
   * @param path Path to the control (e.g., 'name' or 'address.street')
   * @returns AbstractControl or null if not found
   */
  private getControlByPath(form: FormGroup, path: string): AbstractControl | null {
    const parts = path.split('.');
    let control: AbstractControl | null = form;

    for (const part of parts) {
      if (control instanceof FormGroup) {
        control = control.get(part);
        if (!control) {
          return null;
        }
      } else {
        return null;
      }
    }

    return control;
  }

  /**
   * Extracts validation errors from an error object
   * @param error Error object that may contain validation errors
   * @returns Array of ValidationError or null
   */
  extractValidationErrors(error: any): ValidationError[] | null {
    // Check if error has validationErrors property (from Result<T>)
    if (error?.validationErrors && Array.isArray(error.validationErrors)) {
      return error.validationErrors;
    }

    // Check if error.error has validationErrors (from HTTP error response)
    if (error?.error?.validationErrors && Array.isArray(error.error.validationErrors)) {
      return error.error.validationErrors;
    }

    // Check if error has a result property with validationErrors
    if (error?.result?.validationErrors && Array.isArray(error.result.validationErrors)) {
      return error.result.validationErrors;
    }

    return null;
  }
}
