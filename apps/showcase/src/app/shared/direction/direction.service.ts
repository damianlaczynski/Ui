import { Injectable, signal } from '@angular/core';

export type Direction = 'ltr' | 'rtl';

const DIRECTION_KEY = 'direction';

@Injectable({
  providedIn: 'root',
})
export class DirectionService {
  private _direction = signal<Direction>(this.getInitialDirection());

  $direction = this._direction.asReadonly();

  constructor() {
    this.applyDirection(this._direction());
  }

  setDirection(direction: Direction): void {
    this._direction.set(direction);
    localStorage.setItem(DIRECTION_KEY, direction);
    this.applyDirection(direction);
  }

  private getInitialDirection(): Direction {
    const savedDirection = localStorage.getItem(DIRECTION_KEY);
    if (savedDirection === 'ltr' || savedDirection === 'rtl') {
      return savedDirection;
    }

    const docDir = document.documentElement.getAttribute('dir')?.toLowerCase();
    if (docDir === 'rtl') {
      return 'rtl';
    }

    return 'ltr';
  }

  private applyDirection(direction: Direction): void {
    document.documentElement.setAttribute('dir', direction);
    document.body.setAttribute('dir', direction);
  }
}
