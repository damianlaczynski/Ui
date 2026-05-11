import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ShowcaseDocAssetService {
  private readonly http = inject(HttpClient);
  private readonly cache = new Map<string, Observable<string>>();

  load(path: string): Observable<string> {
    const cached = this.cache.get(path);
    if (cached) {
      return cached;
    }

    const request$ = this.http.get(path, { responseType: 'text' }).pipe(
      catchError(error => {
        console.error(`Failed to load showcase doc asset: ${path}`, error);
        return of('');
      }),
      shareReplay({ bufferSize: 1, refCount: false }),
    );

    this.cache.set(path, request$);
    return request$;
  }

  loadMany<T extends Record<string, string>>(paths: T): Observable<{ [K in keyof T]: string }> {
    const entries = Object.entries(paths).map(([key, path]) => [key, this.load(path)] as const);
    return forkJoin(Object.fromEntries(entries) as { [K in keyof T]: Observable<string> });
  }
}
