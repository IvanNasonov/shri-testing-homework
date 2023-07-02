import React from "react";
import userEvent from "@testing-library/user-event";

import { Application } from "../../src/client/Application";
import { renderWithProviders } from "../utils.ts/renderWithProvider";

describe("Хедер", () => {
  it("Должен иметь внутри себя ссылки на остальные страницы сайта", () => {
    const { container } = renderWithProviders(<Application />);

    const navbar = container.querySelector(".navbar");

    const links = navbar?.querySelectorAll(".nav-link");

    expect(navbar).toBeTruthy();
    expect(links?.length).toBe(4);
    expect(links?.item(0).getAttribute("href")).toBe("/catalog");
    expect(links?.item(1).getAttribute("href")).toBe("/delivery");
    expect(links?.item(2).getAttribute("href")).toBe("/contacts");
    expect(links?.item(3).getAttribute("href")).toBe("/cart");

    const logo = navbar?.querySelector(".navbar-brand");

    expect(logo).toBeTruthy();
    expect(logo?.getAttribute("href")).toBe("/");
  });
  it("При нажатии на кнопку открытия меню должно открываться меню навигации", async () => {
    const { container, getByText, getByTestId } = renderWithProviders(
      <Application />
    );

    await userEvent.click(getByTestId("hamburger"));

    const collapsedComponent = container.querySelector(".collapse");

    expect(collapsedComponent).toBeFalsy();

    await userEvent.click(getByText("Contacts"));

    const collapsedComponentAfterNavClick =
      container.querySelector(".collapse");

    expect(collapsedComponentAfterNavClick).toBeTruthy();
  });
  it("рядом со ссылкой на корзину должно отображаться количество уникальных товаров в ней", async () => {
    const { getByTestId } = renderWithProviders(<Application />, {
      initialState: {
        details: {},
        cart: {
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
      },
    });

    const cartButton = getByTestId("cart-link");

    expect(cartButton).toBeTruthy();
    expect(cartButton.textContent).toBe("Cart (2)");
  });
  it("если в корзине нет товаров то должено отображаться только название раздела", async () => {
    const { getByTestId } = renderWithProviders(<Application />);

    const cartButton = getByTestId("cart-link");

    expect(cartButton).toBeTruthy();
    expect(cartButton.textContent).toBe("Cart");
  });
});
