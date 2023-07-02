import React from "react";

import { Application } from "../../src/client/Application";
import { renderWithProviders } from "../utils.ts/renderWithProvider";
import { mockProduct, mockProductId } from "../mocks/data";
import { Catalog } from "../../src/client/pages/Catalog";

describe("Карточка продукта", () => {
  it("должна быть ссылка на страницу с информацией о товаре", async () => {
    const { findByTestId } = renderWithProviders(<Catalog />, {
      initialRoute: "/catalog",
      initialCartState: {
        [mockProductId]: {
          name: mockProduct.name,
          count: 3,
          price: mockProduct.price,
        },
      },
    });

    const product = await findByTestId(mockProductId.toString());

    expect(product).toBeTruthy();

    const cartBadge = product.querySelector('[data-testid="cart-badge"]');
    expect(cartBadge).toBeTruthy();
    expect(cartBadge?.textContent).toBe("Item in cart");
  });

  it("должна отображаться ссылка на страницу продукта", async () => {
    const { findByTestId, getByTestId } = renderWithProviders(<Catalog />, {
      initialRoute: "/catalog",
    });

    const product = await findByTestId(mockProductId.toString());

    expect(product).toBeTruthy();

    const link = getByTestId("details-link");
    expect(link).toBeTruthy();

    expect(link.getAttribute("href")).toBe(`/catalog/${mockProductId}`);
  });
});
