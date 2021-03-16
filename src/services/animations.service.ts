import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

export const animateRight = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      right: 0,
      width: '100%'
    })
  ]),
  query(':enter', [
    style({ right: '-100%'})
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('400ms ease-out', style({ right: '100%'}))
    ]),
    query(':enter', [
      animate('400ms ease-out', style({ right: '0%'}))
    ])
  ]),
  query(':enter', animateChild()),
];

export const animateLeft = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
    })
  ]),
  query(':enter', [
    style({ left: '-100%'})
  ]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('400ms ease-out', style({ left: '100%'}))
    ]),
    query(':enter', [
      animate('400ms ease-out', style({ left: '0%'}))
    ])
  ]),
  query(':enter', animateChild()),
];


export const slideInAnimation =
  trigger('routeAnimations', [

    transition('homePage => loginPage', animateRight),
    transition('loginPage => forgotPasswordPage', animateLeft),
    transition('loginPage => signupPage', animateLeft),
    transition('forgotPasswordPage => loginPage', animateLeft),
    transition('signupPage => loginPage', animateLeft),

    transition('loginPage => moduleUser', animateLeft),
    transition('moduleUser => loginPage', animateLeft),


  ]);
