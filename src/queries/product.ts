import { gql } from "../gql";
import { Client } from "../types/client";

import { Product } from "../types/product";

export const getAllProducts = async (client: Client): Promise<Product[]> => {
  const query = `{
        products(first: 250) {
          edges {
            node {
  
              id
              handle
  
              title
  
              priceRange {
                  minVariantPrice {
                    amount
                  }
              }
  
              images(first: 5) {
                  edges {
                    node {
                      url
                    }
                  }
              }
  
            }
          }
        }
      }`;
  const response = await gql(client, JSON.stringify({ query }));
  return response.products;
};

export const getProduct = async (
  client: Client,
  handle: string,
): Promise<Product> => {
  const query = `
  {
    product(handle: "${handle}") {
      id
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
            url
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              url
            }
            title
            id
            availableForSale
            priceV2 {
              amount
            }
          }
        }
      }
    }
  }`;
  const response = await gql(client, JSON.stringify({ query }));
  return response.product;
};
