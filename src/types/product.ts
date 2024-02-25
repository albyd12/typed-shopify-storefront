export type ProductImage = {
  url: string;
};

type Price = {
  amount: number;
  currency?: string | null;
};

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface SelectedProductOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  image: ProductImage;
  priceV2: Price;
  availableForSale: boolean;
  selectedOptions: SelectedProductOption[];
}

interface ProductBase {
  handle: string;
  id: string;
  title: string;
  images: ProductImage[];
  priceRange: {
    minVariantPrice: Price;
  };
}

export interface Product extends ProductBase {
  variants: ProductVariant[];
  options: ProductOption[];
  description: string;
}

export interface CollectionProduct extends ProductBase {}

export type Collection = ProductBase[];

export interface LineItem {
  variantId: string;
  amount: number;
}
