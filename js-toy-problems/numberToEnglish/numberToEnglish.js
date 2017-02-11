/**
* Extend the Number prototype with a new method called `toEnglish`.
* It should return the number as a string using English words.
* Examples:
*   (7).toEnglish(); // > "seven"
*   (575).toEnglish(); // > "five hundred seventy-five"
*   (78193512).toEnglish(); // > "seventy-eight million one hundred ninety-three thousand five hundred twelve"
*
* Extra credit: Make your function support decimals.
* Example:
*   (150043.273).toEnglish() // > "one hundred fifty thousand forty-three and two hundred seventy three thousandths"
*
 */

var numbersToWords = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety',
};
var numbersToPlace = {
  10: 'ten',
  100: 'hundred',
  1000: 'thousand',
  1000000: 'million',
  1000000000: 'billion',
  1000000000000: 'trillion',
  1000000000000000: 'quadrillion',
  1000000000000000000: 'quintillion',
};

const groupByThousands = num => {
  let str = String(num).split('');
  let result = [];
  let intermediate;
  for (let i = str.length - 1, j = 0; i >= 0; i--, j++) {
    if (j === 3) {
      result.push(intermediate.reverse());
      j = 0;
    }
    if (j === 0) intermediate = [];
    intermediate.push(Number(str[i]));
    if (i === 0) {
      for (let i = intermediate.length; i < 3; i++) {
        intermediate.push(0);
      }
      result.push(intermediate.reverse());
    }
  }
  return result.reverse();
}

Number.prototype.toEnglish = function() {
  let a = String(this).split('.');
  let int = Number(a[0]);
  let dec = a[1] ? Number(a[1]) : 0;
  let groups = groupByThousands(int);
  let result = groups.map(group => {
    let ones = group[2], tens = group[1], hundreds = group[0];
    let english = hundreds >= 1 ? [numbersToWords[hundreds] + " hundred"] : [];
    if (tens === 1) {
      english.push(numbersToWords[tens * 10 + ones]);
    }
    // 1 0 0 | 0 0 0 | 0 0 1 | 0 7 1
    if ((hundreds > 0 && tens === 0 && ones !== 0) || (hundreds === 0 && tens === 0)) {
      english.push(numbersToWords[ones]);
    }
    if (tens > 1) {
      let t = '';
      let sep = tens >= 2 && tens <= 9 && ones >= 1 && ones <= 9 ? '-' : ' ';
      t += numbersToWords[tens * 10];
      if (ones >= 1) t += sep + numbersToWords[ones];
      english.push(t);
    }
    return english.join(' ');
  });
  result = result.reverse().map((group, i) => {
    let suffix = '';
    if (i >= 1) {
      suffix = ' ' + numbersToPlace[Math.pow(1000, i)]
    }
    if (a[0].length === 1) {
      return group;
    } else {
      return group === 'zero' ? '' : group + suffix;
    }
  }).filter(str => str !== '');
  let decPart = '';
  if (dec !== 0) {
    let decLength = a[1].length;
    if (decLength <= 3) {
      let place = Math.pow(10, decLength);
      let shouldPlural = Number(a[1].slice(a[1].length - 1)) > 1;
      decPart += dec.toEnglish() + ' ' + numbersToPlace[place] + 'th' +
      (shouldPlural ? 's' : '');
    }
    if (decLength > 3) {
      let over = decLength % 3 * 10;
      let place = Math.pow(10, decLength) / over;
      let shouldPlural = Number(a[1].slice(a[1].length - 1)) > 1;
      decPart += dec.toEnglish() + ' ' +
        numbersToPlace[over] + '-' + numbersToPlace[place] + 'th' +
        (shouldPlural ? 's' : '');
    }
  }
  let intPart = result.reverse().join(' ');
  if (int > 0 && dec > 0) {
    return intPart + ' and ' + decPart;
  } else if (int >= 0 && dec === 0) {
    return intPart;
  } else if (dec >= 0) {
    return decPart;
  }
};
