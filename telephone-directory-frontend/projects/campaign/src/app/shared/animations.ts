import { trigger, transition, animate, style, state } from '@angular/animations';

export const slideInOut = trigger('slideInOut', [
    state('void', style({
        maxHeight: 0, opacity: 0, visibility: 'hidden', overflow: 'hidden'
    })),

    transition(':enter', [
        animate(300, style({ maxHeight: '100%', opacity: 1, visibility: 'visible', overflow: 'auto' }))
    ]),
    transition(':leave', [
        animate(300)
    ])
]);