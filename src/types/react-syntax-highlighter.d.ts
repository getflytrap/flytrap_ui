declare module "react-syntax-highlighter" {
  import { FC } from "react";

  export const Prism: FC<any>;
  export const Light: FC<any>;
}

declare module "react-syntax-highlighter/dist/esm/styles/hljs" {
  import { PrismStyle } from "react-syntax-highlighter";
  const atomOneLight: PrismStyle;
  export { atomOneLight };
}
