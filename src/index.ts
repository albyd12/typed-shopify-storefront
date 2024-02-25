//queries/shopify api
import queries from "./queries";
//utilis
import { findVariant } from "./utils/shopify";

import { Client } from "./types/client";
import {
  Collection,
  Product,
  ProductVariant,
  SelectedProductOption,
} from "./types/product";
import { CartItem } from "./types/cart";
import { Checkout } from "./types/checkout";

//type exports
export {
  Product,
  ProductVariant,
  ProductImage,
  SelectedProductOption,
  ProductOption,
  CollectionProduct,
  Collection,
} from "./types/product";
export { CartItem } from "./types/cart";

/**
 * Initializes Shopify Storefront client
 * @param {Client} client The Shopify client instance.
 * @returns {Object} An object containing Shopify API methods.
 */
const shopify = (
  client: Client,
): {
  product: {
    all: () => Promise<Collection>;
    get: (handle: string) => Promise<Product>;
    findVariant: (
      variants: ProductVariant[],
      selectedOptions: SelectedProductOption[],
    ) => ProductVariant | undefined;
  };
  checkout: {
    create: (lineItems: CartItem[]) => Promise<Checkout>;
  };
} => {
  return {
    product: {
      // Queries
      /**
       * Retrieves all products from the store.
       * @returns {Promise<Collection>} A promise that resolves to a collection of products.
       */
      all: (): Promise<Collection> => queries.product.getAllProducts(client),
      /**
       * Retrieves a product by its handle.
       * @param {string} handle The handle of the product to fetch.
       * @returns {Promise<Product>} A promise that resolves to the fetched product.
       */
      get: (handle: string): Promise<Product> =>
        queries.product.getProduct(client, handle),

      /**
       * Finds a variant of a product based on selected options.
       * @param {ProductVariant[]} variants The variants of the product to search through.
       * @param {SelectedProductOption[]} selectedOptions The options of the variant to find.
       * @returns {ProductVariant | undefined} The found variant, or undefined if not found.
       */
      findVariant,
    },
    checkout: {
      /**
       * Creates a new checkout with specified line items.
       * @param {CartItem[]} lineItems The line items to include in the checkout.
       * @returns {Promise<Object>} A promise that resolves to the created checkout object.
       */
      create: (lineItems: CartItem[]) =>
        queries.checkout.createCheckout(client, lineItems),
    },
  };
};

export default shopify;
