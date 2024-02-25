import { ProductVariant, SelectedProductOption } from "../types/product";

export const findVariant = (
  variants: ProductVariant[],
  selectedOptions: SelectedProductOption[],
): ProductVariant | undefined => {
  //each variant contains it's selected options
  const variant = variants.find((variant) => {
    //this contains the correct options
    //we now need to cycle through each one and find out if it
    for (const variantOption of variant.selectedOptions) {
      //each option of a variant
      const selectedEquivalent = selectedOptions.find(
        (selectedOption) => selectedOption.name == variantOption.name,
      );
      if (
        selectedEquivalent &&
        selectedEquivalent.value !== variantOption.value
      )
        return false;
      return variant;
    }
  });
  return variant;
};
