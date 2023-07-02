import { LOCAL_STORAGE_CART_KEY } from "../../src/client/api";

export const mockProductId = 1;

export const mockProduct = {
  id: mockProductId,
  name: "тестовый продукт",
  price: 100,
};

export const mockProductsList = [mockProduct];

export const mockProductInfo = {
  id: mockProductId,
  name: "Unbranded Chair",
  description:
    "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
  price: 924,
  color: "yellow",
  material: "Soft",
};

export const mockCart = {
  key: LOCAL_STORAGE_CART_KEY,
  data: {
    1: {
      name: "Test product 1",
      count: 3,
      price: 100,
    },
    2: {
      name: "Test product 2",
      count: 2,
      price: 150,
    },
  },
};
