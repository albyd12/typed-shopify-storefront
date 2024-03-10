# Typed Storefront

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/0xalby/typed-shopify-storefront.svg)](https://github.com/0xalby/typed-shopify-storefront/issues)


A simple, lightweight, explicit library for interacting with the Shopify Storefront API

### Example

```typescript
import shopify, { ProductVariant, SelectedProductOption, LineIem } from 'typed-shopify-storefront'

const client = shopify({
    accessToken: 'somestore_storefront_token',
    domain: 'somestore.myshopify.com'
})

(async () => {
    // Fetch all products within store
    const collection = await client.product.all()

    // Fetch data of a single product
    const product = await client.product.get(collection[0])

    // Find a product variant from selected options
    const options: SelectedProductOptions[] = [
        { name: "Color", value: "Black" },
        { name: "Size", value: "1" }
    ]
    const variant = client.product.findVariant(product.variants, options)

    // Create a checkout
    const cart: LineItem[] = [
        { variantId: variant.id, amount: 1 }
    ]
    const checkout = await client.checkout.create(cart)

    console.log(checkout.webUrl)
})
```
## Documentation

Initialize the client
```typescript
const  client = shopify({
    accessToken:  'somestore_storefront_token',
    domain:  'somestore.myshopify.com'
})
```
Once initialized, the client object is created with methods for interacting with the Shopify API.

#### Product
| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `all()` | Retrieves all products from the store. | None | `Collection` |
| `get(handle)` | Retrieves a product by its handle. | `handle: string` | `Product` |
| `findVariant(variants, selectedOptions)` | Finds a variant of a product based on selected options. | `variants: ProductVariant[], selectedOptions: SelectedProductOption[]` | `ProductVariant \| undefined` |

#### Checkout
| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `create(lineItems)` | Creates a new checkout with specified line items. | `lineItems: LineItem[]` | `Checkout` |



