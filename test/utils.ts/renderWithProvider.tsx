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

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  initialState?: PreloadedState<ApplicationState>;
  store?: ReturnType<typeof initStore>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    initialState = {
      details: {},
      cart: {},
    },
    // Automatically create a store instance if no store was passed in
    store = createStore(createRootReducer({}), initialState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <MemoryRouter>
        <Provider store={store}>{children}</Provider>;
      </MemoryRouter>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
