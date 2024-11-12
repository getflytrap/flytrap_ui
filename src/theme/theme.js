import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  colors: {
    brand: {
      50: "#E3F7E3",
      100: "#C1EBC1",
      200: "#DDF5C5",
      300: "#B1CF5E", // from logo
      400: "#5ECF5E", // from logo
      500: "#1D7D55", // from logo
      600: "#186A4A",
      700: "#135638",
      800: "#0F4230",
      900: "#0A2E1E",
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
