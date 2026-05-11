import { inject, Injectable, WritableSignal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Result, ResultStatus } from '../models/api-response.model';
import { ApiErrorService } from './api-error.service';
import { FormValidationService } from './form-validation.service';
import { State, loadData, appendData } from 'ui';
import { QueryParams, QueryResult } from '@shared/api/models/query-params.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl + '/api/';

  private readonly http = inject(HttpClient);
  private readonly apiErrorService = inject(ApiErrorService);
  private readonly formValidationService = inject(FormValidationService);

  /**
   * Request GET to API
   * @param endpoint Endpoint path (without baseUrl)
   * @param params Query parameters
   * @param showErrorToast Whether to show an error toast
   * @returns Observable with the response data
   */
  public get<T>(endpoint: string, params?: any, showErrorToast: boolean = true): Observable<T> {
    const httpParams = this.buildHttpParams(params);

    return this.http.get<Result<T>>(`${this.baseUrl}${endpoint}`, { params: httpParams }).pipe(
      map((response) => this.handleResponse(response)),
      catchError((error) => this.apiErrorService.handleError(error, showErrorToast))
    );
  }

  /**
   * Request GET to API with state management
   * @param endpoint Endpoint path (without baseUrl)
   * @param state WritableSignal to update with state changes
   * @param params Query parameters
   * @param showErrorToast Whether to show an error toast
   * @returns Promise with the response data
   */
  public getWithState<T>(
    endpoint: string,
    state: WritableSignal<State<T>>,
    params?: any,
    showErrorToast: boolean = true
  ): Observable<T> {
    return loadData(state, this.get<T>(endpoint, params, showErrorToast));
  }

  /**
   * Request GET to API with pagination
   * @param endpoint Endpoint path (without baseUrl)
   * @param params Query parameters
   * @param showErrorToast Whether to show an error toast
   * @returns Observable with the query result
   */
  public getPaginated<T>(
    endpoint: string,
    params: QueryParams<T>,
    showErrorToast: boolean = true
  ): Observable<QueryResult<T>> {
    const httpParams = this.buildHttpParams(params);

    return this.http.get<Result<any>>(`${this.baseUrl}${endpoint}`, { params: httpParams }).pipe(
      map((response) => {
        const data = this.handleResponse(response);
        if (data && typeof data === 'object' && 'items' in data) {
          return {
            items: data.items || [],
            totalCount: data.totalCount || 0,
            hasNextPage: data.hasNext ?? false,
            hasPreviousPage: data.hasPrevious ?? false
          } as QueryResult<T>;
        }
        return {
          items: Array.isArray(data) ? data : [],
          totalCount: Array.isArray(data) ? data.length : 0,
          hasNextPage: false,
          hasPreviousPage: false
        } as QueryResult<T>;
      }),
      catchError((error) => this.apiErrorService.handleError(error, showErrorToast))
    );
  }

  /**
   * Request GET to API with pagination and state management
   * @param endpoint Endpoint path (without baseUrl)
   * @param state WritableSignal to update with state changes
   * @param params Query parameters
   * @param showErrorToast Whether to show an error toast
   * @returns Observable with the query result
   */
  public getPaginatedWithState<T>(
    endpoint: string,
    state: WritableSignal<State<QueryResult<T>>>,
    params: any,
    showErrorToast: boolean = true
  ): Observable<QueryResult<T>> {
    return loadData(state, this.getPaginated<T>(endpoint, params, showErrorToast));
  }
  public getInfiniteWithState<T>(
    endpoint: string,
    state: WritableSignal<State<QueryResult<T>>>,
    params: any,
    showErrorToast: boolean = true
  ): Observable<QueryResult<T>> {
    return appendData(state, this.getPaginated<T>(endpoint, params, showErrorToast));
  }

  /**
   * Request POST to API
   * @param endpoint Endpoint path (without baseUrl)
   * @param body Data to send
   * @param showErrorToast Whether to show an error toast
   * @param form Optional form to automatically apply validation errors to
   * @returns Observable with the response data
   */
  public post<T>(endpoint: string, body: any, showErrorToast: boolean = true, form?: FormGroup): Observable<T> {
    return this.http.post<Result<T>>(`${this.baseUrl}${endpoint}`, body).pipe(
      map((response) => this.handleResponse(response)),
      catchError((error) => this.handleErrorWithForm(error, showErrorToast, form))
    );
  }

  /**
   * Request POST to API with state management
   * @param endpoint Endpoint path (without baseUrl)
   * @param state WritableSignal to update with state changes
   * @param body Data to send
   * @param showErrorToast Whether to show an error toast
   * @param form Optional form to automatically apply validation errors to
   * @returns Promise with the response data
   */
  public postWithState<T>(
    endpoint: string,
    state: WritableSignal<State<T>>,
    body: any,
    showErrorToast: boolean = true,
    form?: FormGroup
  ): Observable<T> {
    return loadData(state, this.post<T>(endpoint, body, showErrorToast, form));
  }

  /**
   * Request PUT to API
   * @param endpoint Endpoint path (without baseUrl)
   * @param body Data to send
   * @param showErrorToast Whether to show an error toast
   * @param form Optional form to automatically apply validation errors to
   * @returns Observable with the response data
   */
  public put<T>(endpoint: string, body: any, showErrorToast: boolean = true, form?: FormGroup): Observable<T> {
    return this.http.put<Result<T>>(`${this.baseUrl}${endpoint}`, body).pipe(
      map((response) => this.handleResponse(response)),
      catchError((error) => this.handleErrorWithForm(error, showErrorToast, form))
    );
  }

  /**
   * Request PUT to API with state management
   * @param endpoint Endpoint path (without baseUrl)
   * @param state WritableSignal to update with state changes
   * @param body Data to send
   * @param showErrorToast Whether to show an error toast
   * @param form Optional form to automatically apply validation errors to
   * @returns Promise with the response data
   */
  public putWithState<T>(
    endpoint: string,
    state: WritableSignal<State<T>>,
    body: any,
    showErrorToast: boolean = true,
    form?: FormGroup
  ): Observable<T> {
    return loadData(state, this.put<T>(endpoint, body, showErrorToast, form));
  }

  /**
   * Request DELETE to API
   * @param endpoint Endpoint path (without baseUrl)
   * @param showErrorToast Whether to show an error toast
   * @returns Observable with the response data
   */
  public delete<T>(endpoint: string, showErrorToast: boolean = true): Observable<T> {
    return this.http.delete<Result<T>>(`${this.baseUrl}${endpoint}`).pipe(
      map((response) => this.handleResponse(response)),
      catchError((error) => this.apiErrorService.handleError(error, showErrorToast))
    );
  }

  /**
   * Request DELETE to API with state management
   * @param endpoint Endpoint path (without baseUrl)
   * @param state WritableSignal to update with state changes
   * @param showErrorToast Whether to show an error toast
   * @returns Promise with the response data
   */
  public deleteWithState<T>(
    endpoint: string,
    state: WritableSignal<State<T>>,
    showErrorToast: boolean = true
  ): Observable<T> {
    return loadData(state, this.delete<T>(endpoint, showErrorToast));
  }

  /**
   * Processes the Result response from Ardalis.Result
   * @param result Result response from the API
   * @returns Data from the response or throws an error
   */
  private handleResponse<T>(result: Result<T>): T {
    if (result.isSuccess && result.value !== undefined) {
      return result.value;
    } else if (!result.isSuccess) {
      // Handle different error types based on status
      const errorMessage = this.getErrorMessageFromResult(result);

      // Show success message if available (for operations that don't return data)
      if (
        result.status === ResultStatus.Ok ||
        result.status === ResultStatus.Created ||
        result.status === ResultStatus.NoContent
      ) {
        this.apiErrorService.showSuccessToast('Operation completed successfully');
        return {} as T;
      }

      // Create error object with validation errors for form mapping
      const error: any = new Error(errorMessage);
      error.validationErrors = result.validationErrors;
      error.errors = result.errors;
      error.status = result.status;
      error.result = result; // Store full result for extraction
      throw error;
    } else {
      // Success case without specific value
      return {} as T;
    }
  }

  /**
   * Extracts appropriate error message from Result
   */
  private getErrorMessageFromResult<T>(result: Result<T>): string {
    const messages: string[] = [];

    // Add validation errors
    if (result.validationErrors && result.validationErrors.length > 0) {
      const validationMessages = result.validationErrors.map((ve) => `${ve.identifier}: ${ve.errorMessage}`);
      messages.push(...validationMessages);
    }

    // Add general errors
    if (result.errors && result.errors.length > 0) {
      messages.push(...result.errors);
    }

    // Default message based on status
    if (messages.length === 0) {
      messages.push(this.getDefaultErrorMessage(result.status));
    }

    return messages.join(', ');
  }

  /**
   * Gets default error message for result status
   */
  private getDefaultErrorMessage(status: ResultStatus): string {
    switch (status) {
      case ResultStatus.NotFound:
        return 'Requested resource was not found';
      case ResultStatus.Unauthorized:
        return 'You are not authorized to perform this action';
      case ResultStatus.Forbidden:
        return 'Access to this resource is forbidden';
      case ResultStatus.Invalid:
        return 'Invalid request data';
      case ResultStatus.Conflict:
        return 'Conflict occurred while processing the request';
      case ResultStatus.Unavailable:
        return 'Service is temporarily unavailable';
      case ResultStatus.CriticalError:
        return 'A critical error occurred';
      default:
        return 'An unexpected error occurred';
    }
  }

  /**
   * Handles error and optionally applies validation errors to form
   * @param error Error object
   * @param showErrorToast Whether to show error toast
   * @param form Optional form to apply validation errors to
   * @returns Observable that throws error
   */
  private handleErrorWithForm(error: any, showErrorToast: boolean, form?: FormGroup): Observable<never> {
    // If form is provided, try to extract and apply validation errors
    if (form) {
      const validationErrors = this.formValidationService.extractValidationErrors(error);
      if (validationErrors && validationErrors.length > 0) {
        // Clear previous server validation errors
        this.formValidationService.clearValidationErrors(form);
        // Apply new validation errors
        this.formValidationService.applyValidationErrors(form, validationErrors);
      }
    }

    // Handle error normally (show toast, etc.)
    return this.apiErrorService.handleError(error, showErrorToast);
  }

  /**
   * Builds HTTP parameters based on an object
   * @param params Query parameters as an object
   * @returns HttpParams
   */
  private buildHttpParams(params?: any): HttpParams {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }

    return httpParams;
  }
}
