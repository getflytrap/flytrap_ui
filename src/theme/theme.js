import { extendTheme } from "@chakra-ui/react";
import "@fontsource/inter";
import "@fontsource/inter/300.css";
import "@fontsource/inconsolata";

const customTheme = extendTheme({
  colors: {
    brand: {
      50: "#E3F7E3",
      100: "#E9F6D8",
      200: "#DCF2C4", // logo font
      300: "#25C1AB",
      400: "#B1CF5F", // logo wings
      500: "#1D7D55", // logo background
      600: "#186A4A",
      700: "#135638",
      800: "#0F4230",
      900: "#0A2E1E",
    },
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  styles: {
    global: {
      "*, *::before, *::after": {
        boxSizing: "border-box",
      },
      body: {
        fontWeight: "300",
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: "600",
      },
    },
    Text: {
      baseStyle: {
        fontWeight: "400",
      },
      variants: {
        light: {
          fontWeight: "300",
        },
        bold: {
          fontWeight: "700",
        },
      },
    },
  },
});

export default customTheme;
