import { WritableSignal, Signal, signal } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { QueryResult } from '../../api';

export interface State<T> {
  isInitial: boolean;
  isLoading: boolean;
  isError: boolean;
  data?: T;
  error?: string;
}

export function initialState<T>(): State<T> {
  return {
    isInitial: true,
    isLoading: false,
    isError: false,
  };
}

export function loadingState<T>(currentState: State<T>): State<T> {
  return {
    ...currentState,
    isLoading: true,
  };
}

export function loadedState<T>(data: T): State<T> {
  return {
    isInitial: false,
    isLoading: false,
    isError: false,
    data,
  };
}

export function errorState<T>(error: string): State<T> {
  return {
    isInitial: false,
    isLoading: false,
    isError: true,
    error,
  };
}

export function createInitialState<T>(): WritableSignal<State<T>> {
  return signal<State<T>>(initialState<T>());
}

export function loadData<T>(state: WritableSignal<State<T>>, loadFn: Observable<T>): Observable<T> {
  // Set loading state
  state.update(currentState => loadingState(currentState));
  return loadFn.pipe(
    tap(data => {
      state.set(loadedState(data));
    }),
    catchError(error => {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      state.set(errorState<T>(errorMessage));
      throw error;
    }),
  );
}

export function appendData<K, T extends QueryResult<K>>(
  state: WritableSignal<State<T>>,
  loadFn: Observable<T>,
): Observable<T> {
  state.update(currentState => loadingState(currentState));
  return loadFn.pipe(
    tap(data => {
      const newData = {
        ...data,
        items: [...(state().data?.items ?? []), ...data.items],
      };
      state.update(() => loadedState(newData));
    }),
    catchError(error => {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      state.set(errorState<T>(errorMessage));
      throw error;
    }),
  );
}

export function isLoading<T>(state: Signal<State<T>>): boolean {
  return state().isLoading;
}

export function isLoaded<T>(state: Signal<State<T>>): boolean {
  return (
    !state().isLoading && !state().isError && (state().data !== undefined || state().data === null)
  );
}

export function isError<T>(state: Signal<State<T>>): boolean {
  return state().isError;
}

export function getData<T>(state: Signal<State<T>>): T | undefined {
  return state().data;
}

export function getError<T>(state: Signal<State<T>>): string | undefined {
  return state().error;
}
