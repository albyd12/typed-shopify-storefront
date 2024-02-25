import { Checkout } from "../types/checkout";
import { CartItem } from "../types/cart";

import { Client } from "../types/client";

import { gql } from "../gql";

export const createCheckout = async (
  client: Client,
  lineItems: CartItem[],
): Promise<Checkout> => {
  const lineItemsObject = lineItems.map((item) => {
    return `{ variantId: "${item.variant.id}", quantity:  ${item.amount} }`;
  });
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [${lineItemsObject}]
      }) {
        checkout {
          id
          webUrl
        }
      }
    }`;
  const response = await gql(client, JSON.stringify({ query }));
  return response.checkoutCreate.checkout;
};
