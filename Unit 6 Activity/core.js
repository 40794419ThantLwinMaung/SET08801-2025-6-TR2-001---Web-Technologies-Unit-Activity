'use strict';

function angleType(angle) {
  if (typeof angle !== 'number') {
    return 'invalid';
  }
  if (angle > 0 && angle < 90) {
    return 'acute';
  }
  if (angle === 90) {
    return 'right';
  }
  if (angle > 90 && angle < 180) {
    return 'obtuse';
  }
  if (angle === 180) {
    return 'straight';
  }
  return 'invalid';
}

function shiftString(input) {
  let result = '';
  for (let i = 0; i < input.length; i += 1) {
    const code = input.charCodeAt(i);
    if (code >= 65 && code <= 90) {
      result += String.fromCharCode(code === 90 ? 65 : code + 1);
    } else if (code >= 97 && code <= 122) {
      result += String.fromCharCode(code === 122 ? 97 : code + 1);
    } else {
      result += input[i];
    }
  }
  return result;
}

function longestString(strings) {
  if (!Array.isArray(strings) || strings.length === 0) {
    return '';
  }
  let longest = strings[0];
  for (let i = 1; i < strings.length; i += 1) {
    if (strings[i].length > longest.length) {
      longest = strings[i];
    }
  }
  return longest;
}

console.log('--- Angle type tests ---');
console.log('angleType(45) =', angleType(45));
console.log('angleType(90) =', angleType(90));
console.log('angleType(135) =', angleType(135));
console.log('angleType(180) =', angleType(180));
console.log('angleType(0) =', angleType(0));

console.log('--- Shift string tests ---');
console.log("shiftString('abc xyz') =", shiftString('abc xyz'));
console.log("shiftString('Hello World!') =", shiftString('Hello World!'));
console.log("shiftString('Zebra') =", shiftString('Zebra'));

console.log('--- Longest string tests ---');
const words = ['Napier', 'Edinburgh', 'University', 'SET08801'];
console.log('Input:', words);
console.log('Longest =', longestString(words));
