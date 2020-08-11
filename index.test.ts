import {
  myPipe,
  myCompose,
  dateValidator,
  idValidator,
  CalcSubTotal,
  mult10,
  add1,
} from ".";

const renderMessage = (result: number | string | object) =>
  `The result is: ${result}`;

describe('native pipe/compose functions', () => {
  test("myPipe can take a series of functions and return the expected value", () => {
    const result = myPipe(mult10, add1, renderMessage)(4);

    expect(result).toEqual("The result is: 41");
  });

  test('myCompose works like pipe but in reverse order of operations', () => {
    // @ts-ignore Remove once function is implemented
    const result = myCompose(renderMessage, add1, mult10)(4);

    expect(result).toEqual("The result is: 41");
  })

  test("myPipe is a Higher Order Function", () => {
    // @ts-ignore Remove once function is implemented
    const result = myPipe(renderMessage, add1, mult10);

    expect(typeof renderMessage).toEqual("function");
    expect(typeof result).toEqual("function");
  });
})

const data = {
  id: 1337,
  foo: "bar",
  key: 41,
  valid: true,
  cart: {
    subTotal: 0,
    items: [
      { name: "Nike shoes", price: 99.99 },
      { name: "Cashmere sweater", price: 199.99 },
      { name: "Bell bottom jeans", price: 74.99 },
    ],
  },
};

const assertDataIsNotMutated = () =>
  expect(data.valid).toEqual(true);

describe("structural sharing", () => {
  test("dateValidator does not mutate the data object", () => {
    const result = dateValidator()(data);

    assertDataIsNotMutated();

    expect(result.valid).toEqual(false);
  });

  test("idValidator does not mutate the data object", () => {
    const result = idValidator(data);

    assertDataIsNotMutated();
    expect(result.valid).toEqual(false);
  });

  test("CalcSubTotal does not mutate the data object's subTotal", () => {
    const result = CalcSubTotal(data);

    expect(data.cart.subTotal).toEqual(0);
    expect(result.cart.subTotal).toEqual(374.97);
  });
});