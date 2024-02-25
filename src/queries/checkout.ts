import { Checkout } from "../types/checkout";
import { LineItem } from "../types/product";
import { Client } from "../types/client";

import { gql } from "../gql";

/**
 * Creates a checkout
 * @param client 
 * @param lineItems 
 * @returns 
 */
export const createCheckout = async (
  client: Client,
  lineItems: LineItem[],
): Promise<Checkout> => {
  const lineItemsObject = lineItems.map((item) => {
    return `{ variantId: "${item.variantId}", quantity: ${item.amount} }`;
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
