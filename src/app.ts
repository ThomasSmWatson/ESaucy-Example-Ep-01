import { IProjector, IState } from "esaucy";
import db from "./database";
import { AddProductToCart } from "./events/AddProductToCart";
interface CartState extends IState {
  products: {
    [sku: string]: number; //quantity
  };
}

class AddProductToCartProjector implements IProjector<AddProductToCart, CartState> {
  async project(currentState: CartState, event: AddProductToCart): Promise<CartState> {
    return {
      index: currentState.index + 1,
      products: {
        ...currentState.products,
        [event.sku]: (currentState.products[event.sku] ?? 0) + event.quantity,
      },
    };
  }
}

let state: CartState = {
  index: 0,
  products: {},
};

const addProductToCartProjector = new AddProductToCartProjector();

const buildState = async () => {
  for (const event of db) {
    console.log({ event, state });
    state = await addProductToCartProjector.project(state, event);
    console.log({ state });
  }
};
buildState();
