// 1. Vanilla TS live coding example

// 1.1 Implement a pipe function

const myPipe = () => undefined;

// 1.2 Implement a compose function

const myCompose = () => undefined;

// 2. Structural Sharing

// 2.1 Modify dateValidator so that it is a pure function

const dateValidator = (data: any) => {
  console.log(data);
  const newData = { ...data }

  newData.valid = newData.date === new Date();
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
  const newData = { ...data };

  newData.cart.subTotal =
    newData.cart.items.reduce(
      (total: number, item: any) => total + item.price, 0
    );
  return newData;
};

// 3.0 Currying, Closures, and Higher Order Functions

// 3.1 Convert each function to HOF
const mult10 = (num: number) => num * 10;

const add1 = (num: number) => num + 1;

// 4.0 Ramda live coding examples

// 4.1 Refactor dateValidator to use Ramda

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
