import React from "react";
import { Cart } from "../../src/client/pages/Cart";
import { renderWithProviders } from "../utils.ts/renderWithProvider";
import userEvent from "@testing-library/user-event";

describe("Корзина", () => {
  it("пустая корзина должна отображать ссылку на каталог", () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<Cart />);

    const catalogLink = getByTestId("catalog-link");

    expect(catalogLink.getAttribute("href")).toBe("/catalog");

    const form = queryByTestId("checkout-form-container");
    expect(form).toBeFalsy();

    const items = queryByTestId("cart-items");
    expect(items).toBeFalsy();
  });

  it("должен корректно отображаться тотал", () => {
    const { getByTestId } = renderWithProviders(<Cart />, {
      initialCartState: {
        1: {
          name: "тестовый товар",
          count: 3,
          price: 100,
        },
        2: {
          name: "тестовый товар 2",
          count: 2,
          price: 100,
        },
      },
    });

    const total = getByTestId("cart-total");

    expect(total.textContent).toBe("$500");
  });
  it("корзина должна очищаться по нажатию на кнопку", async () => {
    const { store, getByTestId } = renderWithProviders(<Cart />, {
      initialCartState: {
        1: {
          name: "тестовый товар",
          count: 3,
          price: 100,
        },
        2: {
          name: "тестовый товар 2",
          count: 2,
          price: 100,
        },
      },
    });

    const button = getByTestId("clear-button");

    expect(button).toBeTruthy();

    await userEvent.click(button);

    expect(store.getState().cart).toEqual({});
  });
  it("должна отображаться ошибка о невалидном номере телефона", async () => {
    const { getByTestId, queryByTestId } = renderWithProviders(<Cart />, {
      initialCartState: {
        1: {
          name: "тестовый товар",
          count: 3,
          price: 100,
        },
      },
    });

    const phoneInput = getByTestId("phone-input");
    const checkout = getByTestId("checkout-button");

    await userEvent.type(phoneInput, "12345");
    await userEvent.click(checkout);

    let isInvalidField: boolean | undefined =
      phoneInput.className.includes("is-invalid");

    expect(isInvalidField).toBe(true);

    await userEvent.type(phoneInput, "123-123-1234");
    await userEvent.click(checkout);

    const phoneInputAfterCheckout = queryByTestId("phone-input");

    isInvalidField = phoneInputAfterCheckout?.className.includes("is-invalid");

    expect(isInvalidField).toBe(false);
  });
});
