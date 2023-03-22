/**
 * @function convertCsvInArray
 * @description this function is used to convert an array containing comma-separated values string to an array of indexed values
 * @param {Array<String>} arr required
 * @returns {Array<String>}
 * @example ['a,b,c'] => ['a', 'b', 'c']
 */
export default (arr: string[]): string[] =>
    arr.length === 1 && /,/g.test(arr[0]) ? arr[0].split(',') : arr;
