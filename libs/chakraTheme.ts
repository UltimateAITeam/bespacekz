import { extendTheme } from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  colors: {
    "primary-6": {
      500: "#366EF6",
    },
  },
};

// 3. extend the theme
export const theme = extendTheme(config);
