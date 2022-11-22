import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("#ffffff", "gray.900")(props),
    },
  }),
};

export const theme = extendTheme({
  styles,
});
