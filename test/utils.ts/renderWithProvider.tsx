import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { PreloadedState, createStore } from "redux";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";

import {
  ApplicationState,
  createRootReducer,
  initStore,
} from "../../src/client/store";
import { MemoryRouter } from "react-router";
import { mockProductsList, mockProductInfo } from "../mocks/data";
import { ExampleApi } from "../../src/client/api";
import { CartState } from "../../src/common/types";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  initialCartState?: CartState;
  store?: ReturnType<typeof initStore>;
  initialRoute?: string;
}

const fakeApi = {
  basename: "fake",
  getProducts: () =>
    Promise.resolve({
      data: mockProductsList,
    }),
  getProductById: () =>
    Promise.resolve({
      data: mockProductInfo,
    }),
  checkout: () =>
    Promise.resolve({
      data: true,
    }),
};

const getFakeCart = (initialCart: CartState) => {
  const fakeCart = {
    getState: () => initialCart ?? {},
    setState: (newState: any) => console.log("setting new state", newState),
  };
  return fakeCart;
};

export function renderWithProviders(
  ui: React.ReactElement,
  {
    initialCartState = {},
    // Automatically create a store instance if no store was passed in
    initialRoute,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const store = initStore(
    fakeApi as unknown as ExampleApi,
    getFakeCart(initialCartState)
  );

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <MemoryRouter initialEntries={[initialRoute ?? "/"]} initialIndex={0}>
        <Provider store={store}>{children}</Provider>;
      </MemoryRouter>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
