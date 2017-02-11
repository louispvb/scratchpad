/*
* Write a function that generates every sequence of throws a single
* player could throw over a three-round game of rock-paper-scissors.
*
* Your output should look something like:
*   [["rock", "rock", "rock"],
*    ["rock", "rock", "paper"],
*    ["rock", "rock", "scissors"],
*    ["rock", "paper", "rock"],
             ...etc...
     ]
*
* Extra credit:
*   - Make your function return answers for any number of rounds.
* Example:
* rockPaperScissors(5); // => [['rock', 'rock', 'rock', 'rock', 'rock'], etc...]
*
*/

// Repeats a val n times into an array
let repeat = (val, n) => {
  let res = [];
  for (let i = 0; i < n; i++) {
    if (Array.isArray(val)) res.push(val.slice(0));
    else res.push(val);
  }
  return res;
}

var combinations = (arr, n) => {
  let results = arr.map(x => [x]);

  let recurse = (acc, i) => {
    //for every recursion repeat each of acc into 3 and store it as new acc
    if (i === 1) return acc;
    let newArr = [];
    acc.forEach(combination =>
      repeat(combination, arr.length).forEach((repeatCombination, j) => {
        newArr.push(repeatCombination);
        repeatCombination.push(arr[j]);
      })
    );
    return recurse(newArr, i-1);
  };

  return recurse(results, n);
}

// Changing counter to base and getting each digit to rotate through combinations
// var combinations = (arr, n) => {
//   // add an array to a list of array n times
//   var results = [];
//   for (let i = 1; i <= Math.pow(n,n); i++) {
//     let combination = [];
//     let factor = n;
//     for (let j = 0; j < n; j++) {
//       let index = Math.floor(i / factor) % n;
//       combination.push(arr[index]);
//       factor *= n;
//     }
//     results.push(combination);
//   }
//   return results;
// }

var rockPaperScissors = n => combinations(['rock', 'paper', 'scissors'], n || 3);

// console.log(rockPaperScissors(14))
