import { HammerGestureConfig } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class CustomHammerConfig extends HammerGestureConfig {
    overrides = {
        'pan': {
            direction: Hammer.DIRECTION_ALL
        }
    };
}