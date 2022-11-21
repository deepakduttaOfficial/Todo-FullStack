import { Button } from "@chakra-ui/react";

const AuthButton = ({ onClick, disabled, name, isLoading, loadingText }) => {
  return (
    <Button
      colorScheme="blue"
      size={"md"}
      mt={5}
      w={"full"}
      onClick={onClick}
      disabled={disabled}
      isLoading={isLoading}
      loadingText={loadingText}
    >
      {name}
    </Button>
  );
};

export default AuthButton;
