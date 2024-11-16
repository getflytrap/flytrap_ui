import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    brand: {
      50: "#E3F7E3",
      100: "#E9F6D8",
      200: "#DCF2C4", // logo font
      300: "#B1CF5E",
      400: "#B1CF5F", // logo wings
      500: "#1D7D55", // logo background
      600: "#186A4A",
      700: "#135638",
      800: "#0F4230",
      900: "#0A2E1E",
    },
  },
  fonts: {
    heading: "Roboto, sans-serif",
    body: "Roboto, sans-serif",
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

// 50: #E3F7E3
// 100: #C1EBC1
// 200: #A0E1A0
// 300: #7FD77F
// 400: #5ECF5E
// 500: #1D7D55 (Base color)
// 600: #186A4A
// 700: #135638
// 800: #0F4230
// 900: #0A2E1E

export default customTheme;
