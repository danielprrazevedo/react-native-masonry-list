import 'react-native';

declare module 'react-native' {
  export namespace Animated {
    export class Event {}
    export function forkEvent(...args: any[]);
  }
}
