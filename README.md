# Typed Storefront

Shopify Storefront API client

### Motivation

Whilst building a Shopify storefront, I wanted a typed, lightweight library for interacting the the Storefront API.

### Usage

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