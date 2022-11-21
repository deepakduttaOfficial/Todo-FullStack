import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("gray.200", "gray.900")(props),
    },
  }),
};

export const theme = extendTheme({
  styles,
});
