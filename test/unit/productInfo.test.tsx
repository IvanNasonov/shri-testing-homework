import React from "react";
import { renderWithProviders } from "../utils.ts/renderWithProvider";
import { Product } from "../../src/client/pages/Product";
import { mockProduct, mockProductId } from "../mocks/data";
import { Application } from "../../src/client/Application";
import userEvent from "@testing-library/user-event";

describe("Информация о продукте", () => {
  it("должна отображаться информация о том что товар в корзине", async () => {
    const { findByTestId } = renderWithProviders(<Application />, {
      initialRoute: `/catalog/${mockProductId.toString()}`,
      initialCartState: {
        [mockProductId]: {
          name: mockProduct.name,
          count: 3,
          price: mockProduct.price,
        },
      },
    });

    const cartBadge = await findByTestId("cart-badge");

    expect(cartBadge).toBeTruthy();
    expect(cartBadge?.textContent).toBe("Item in cart");
  });
  it("при нажатии на кнопку добавления в корзину товар должен появиться в корзине", async () => {
    const { store, findByTestId } = renderWithProviders(<Application />, {
      initialRoute: `/catalog/${mockProductId.toString()}`,
    });

    const button = await findByTestId("cart-button");

    await userEvent.click(button);

    const productInCart = store.getState().cart[mockProductId];

    expect(productInCart).toBeTruthy();
    expect(productInCart.count).toBe(1);
  });
  it("при нажатии на кнопку добавления в корзину, если товар уже в корзине, должно увеличиться его количество", async () => {
    const initialAmount = 5;
    const { store, findByTestId } = renderWithProviders(<Application />, {
      initialRoute: `/catalog/${mockProductId.toString()}`,
      initialCartState: {
        [mockProductId]: {
          name: mockProduct.name,
          count: initialAmount,
          price: mockProduct.price,
        },
      },
    });

    const button = await findByTestId("cart-button");

    await userEvent.click(button);

    const productInCart = store.getState().cart[mockProductId];

    expect(productInCart).toBeTruthy();
    expect(productInCart.count).toBe(initialAmount + 1);
  });
});
