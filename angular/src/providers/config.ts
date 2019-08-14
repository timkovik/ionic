import { Injectable, InjectionToken } from '@angular/core';
import { Config as CoreConfig, IonicConfig } from '@ionic/core';

import { IonicWindow } from '../types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class Config {

  constructor() {
    console.warn(`[DEPRECATION][Config]: The Config provider is deprecated and it will be removed in the next major release.
  - Use "getMode()" to get the ionic's mode.`);
  }

  get(key: keyof IonicConfig, fallback?: any): any {
    const c = getConfig();
    if (c) {
      return c.get(key, fallback);
    }
    return null;
  }

  getBoolean(key: keyof IonicConfig, fallback?: boolean): boolean {
    const c = getConfig();
    if (c) {
      return c.getBoolean(key, fallback);
    }
    return false;
  }

  getNumber(key: keyof IonicConfig, fallback?: number): number {
    const c = getConfig();
    if (c) {
      return c.getNumber(key, fallback);
    }
    return 0;
  }

  set(key: keyof IonicConfig, value?: any) {
    const c = getConfig();
    if (c) {
      c.set(key, value);
    }
  }
}

export const ConfigToken = new InjectionToken<any>('USERCONFIG');

const getConfig = (): CoreConfig | null => {
  if (typeof (window as any) !== 'undefined') {
    const Ionic = (window as IonicWindow).Ionic;
    if (Ionic && Ionic.config) {
      return Ionic.config;
    }
  }
  return null;
};
