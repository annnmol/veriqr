
type IProductIdentifier = "veriqr";

const identifier = process.env.EXPO_PUBLIC_PRODUCT_NAME! as IProductIdentifier;

const productName = identifier?.charAt(0)?.toUpperCase() + identifier?.slice(1);

const productConfig = {
  name: productName,
  identifier: identifier,
  logoDark: "",
  logoWhite: "",
};

export default productConfig;
