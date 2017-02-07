
let compose = (f, g) => {
  return x => f(g(x))
  // return (...args) => f(g.apply(null, args))
}

let composeAll = (...funcs) => {
  return funcs.reduce(compose)
}

// String -> String
let greet = name => 'Hello, ' + name

// String -> String
let exclaim = sentence => sentence + '!!!'

// X -> Array[X]
let repeat3 = element => Array(3).fill(0).map(_ => element)

// Array[X] -> String
let joinSpaces = array => array.join(' ')

// ((args -> X), someArgs) -> (moreArgs -> X)
let partial = (f, ...fixedArgs) => {
  return (...moreArgs) => f.apply(null, fixedArgs.concat(moreArgs))
}

// (Number, X) -> [X]
let repeat = (repeatCount, element) =>
  Array(repeatCount).fill(0).map(_ => element)

// X -> [X]  -- No more Number
let newFunction = partial(repeat, 2)

composeAll(
  joinSpaces,
  repeat3,
  exclaim,
  greet
) ('Hack Reactor')
// -> Hello, Hack Reactor!!! \
//  Hello, Hack Reactor!!! \
//  Hello, Hack Reactor!!!

let add2 = x => x + 2
let mult3 = x => x * 3
compose (add2, mult3) (2)
// mult3(2) = 6
// add2(6) = 8
// compose(add2, mult3) = add2(mult3(2)) = 8

let exists = x => x !== undefined && x !== null
// f: Any -> Failable[Any]
// where `Failable` is `Any` or `null` or `undefined`
let composeFailable = (f, g) => {
  return (x) => {
    if (!exists(x)) return null
    let gVal = g(x)
    if (!exists(gVal)) return null
    let fgVal = f(gVal)
    if (!exists(fgVal)) return null
    return fgVal
  }
}
let composeAllFM = (...funcs) => funcs.reduce(composeFailable)

let fetchVoteCount = _ => null
let increment = x => x + 1

composeAllFM(
  increment,
  fetchVoteCount
) ('http://some/api')

// let fetchVoteCount = _ => undefined
// let increment = x => x + 1
//
// let x = composeAllFM(
//   increment,
//   fetchVoteCount
// ) ('http://some/api')
// // -> null


// let nestedObject = {
//   hackReactor: {
//     students: [
//       null,
//       { name: 'Louis' }
//     ]
//   }
// }
// let get = (obj, key) => [obj, obj[key]]
// console.log(get(get(get(nestedObject, 'hackReactor'), 'students'), '0'))

// All possible combinations of 3 coin flips
// String -> [String]
let coinFlip = prevFlip => [prevFlip + 'H', prevFlip + 'T']
coinFlip('') // -> [ 'H', 'T' ]
// composeAll(
//   coinFlip, // String -> [String]
//   coinFlip, // String -> [String]
//   coinFlip // String -> [String]
// ) ('') //ERROR!

// [[Any]] -> [Any]
let flatten = arrayOfArray =>
  arrayOfArray.reduce((acc, array) =>
    acc.concat(array), [])

flatten([['a', 'b'], ['c', 'd']]) // [ 'a', 'b', 'c', 'd' ]

let composeIndeterminate = (f, g) => {
  return (x) => {
    let gVals = g(x)
    let nestedArrays = gVals.map(gVal => f(gVal)) // -> [[Any]]
    return flatten(nestedArrays)
  }
}

let composeAllIM = (...args) => args.reduce(composeIndeterminate)

composeAllIM(
    coinFlip, // String -> [String]
    coinFlip, // String -> [String]
    coinFlip // String -> [String]
) ('') // [ 'HHH', 'HHT', 'HTH', 'HTT', 'THH', 'THT', 'TTH', 'TTT' ]

let phoneDigitsToLetters = {
  0: '0',
  1: '1',
  2: 'ABC',
  3: 'DEF',
  4: 'GHI',
  5: 'JKL',
  6: 'MNO',
  7: 'PQRS',
  8: 'TUV',
  9: 'WXYZ'
};

// String -> [String]
let digitToLetters = letter => phoneDigitsToLetters[Number(letter)].split('')

let telephoneWords = function(digitString) {
  let digits = digitString.split('')
  return composeAllIM(
    partial(digitToLetters, '2'),
    partial(digitToLetters, '7'),
    partial(digitToLetters, '5'),
    partial(digitToLetters, '4')
  )()

}

console.log(telephoneWords('2754'))
// let telephoneWords = function(digitString) {
//   //Join flattens an array of array into one array, google 'list monad'
//   var join = arr => arr.reduce((acc, a) => acc.concat(a));
//   // addCombo takes an array of strings and appends every combination of digit to every string
//   let addCombo = (strings, digit) => {
//     let letters = phoneDigitsToLetters[digit].split('');
//     return join(strings.map(s => letters.map(l => s + l))); // Join the array of arrays
//   };
//   // Transform digitString into an array of numbers, and reduce by adding combos successively onto the empty string list
//   return digitString.split('').map(digit => Number(digit)).reduce(addCombo, [''])
// };
