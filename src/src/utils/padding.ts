import {range} from 'lodash'
export const padding = (str: string, length: number) => str.padEnd(length, range(length).map(() => ' ').join(''))
