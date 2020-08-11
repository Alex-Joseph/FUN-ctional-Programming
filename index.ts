import { clone, equals, set, lensProp, prop } from 'ramda';
// 1. Vanilla TS live coding example

// 1.1 Implement a pipe function

const myPipe = (...fns) => initialValue =>
  fns.reduce((returnResult, fn) => fn(returnResult), initialValue);

// 1.2 Implement a compose function

const myCompose = (...fns) => initialValue =>
  fns.reverse().reduce((returnResult, fn) => fn(returnResult), initialValue);

// 2. Structural Sharing

// 2.1 Modify dateValidator so that it is a pure function

const dateValidator1 = (data: any, logger = console.log, date = new Date()) => {
  logger(data);
  const newData = { ...data }

  newData.valid = newData.date === date
  return newData
};

// 2.2 Question: why does idValidator pass and CalcSubTotal fail?

const idValidator = (data: any) => {
  const newData = { ...data };

  newData.valid = newData.id === 3000;
  return newData;
};

// 2.3 Modify CalcSubTotal so it's test passes

const CalcSubTotal = (data: any) => {
  const newData = clone(data)

  newData.cart.subTotal =
    newData.cart.items.reduce(
      (total: number, item: any) => total + item.price, 0
    );
  return newData;
};

// 3.0 Currying, Closures, and Higher Order Functions

// 3.1 Convert each function to HOF
const mult = (base: number) => (factor: number) => base * factor;
const mult10 = mult(10);

const add1 = (num: number) => num + 1;

// 4.0 Ramda live coding examples

// 4.1 Refactor dateValidator to use Ramda

const dateValidator = (date = new Date()) => myPipe(
  clone,
  (newData: any) =>
    set(lensProp('valid'), equals(date, prop('date', newData)), newData),
)

// 4.2 Refactor idValidator to use Ramda

// 4.3 Refactor CalcSubTotal to use Ramda

// 4.4 Create a function pipeline to use dateValidator, idValidator, CalcSubTotal

// Bonus: replace `any` types with TS interfaces

export {
  myPipe,
  myCompose,
  dateValidator,
  idValidator,
  CalcSubTotal,
  mult10,
  add1,
};
