import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
// Chakra ui
import {
  Container,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
// Icons
import { SiGnuprivacyguard } from "react-icons/si";
// Custom file import
import AuthInput from "../../components/input/AuthInput";
import AuthButton from "../../components/button/AuthButton";
// error animation -- React toastify
import { signupErrorHandaler } from "../../errorHandaler/auth";
import { ToastContainer, toast } from "react-toastify";
// Api helper-------------??
import { authenticate, isAuthenticate, signin } from "../../apiHelper/auth";
import Topbar from "../../components/navbar/Topbar";

const Signin = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: false,
    success: false,
    loading: false,
  });
  const [errorHandle, setErrorHandle] = useState({});
  const { email, password, loading } = value;

  const handleChange = (name) => (e) => {
    setValue({
      ...value,
      [name]: e.target.value,
      error: false,
      success: false,
      loading: false,
    });
    setErrorHandle(false);
  };
  // Main submit from to backend
  const isSubmit = () => {
    const errors = signupErrorHandaler(value);
    setErrorHandle(errors);
    if (JSON.stringify(errors) !== "{}") return;
    setValue({ ...value, error: false, success: false, loading: true });
    signin({ email, password }).then((response) => {
      if (response.error) {
        setValue({ ...value, error: true, success: false, loading: false });
        toast.error(`${response.error}`, { theme: "dark", autoClose: 2000 });
      } else {
        authenticate(response, () => {
          setValue({
            email: "",
            password: "",
            error: false,
            success: true,
            loading: false,
          });
          toast.success(`Redirecting`, { theme: "dark", autoClose: 2000 });
        });
      }
    });
  };

  const navigatePerformed = () => {
    if (isAuthenticate()) {
      return <Navigate to={`/`} />;
    }
  };

  return (
    <>
      {navigatePerformed()}
      <ToastContainer />
      <Topbar />
      <Container mt={10}>
        <VStack
          border={"1px"}
          borderColor={useColorModeValue("gray.300", "gray.700")}
          p={[2, 5, 7]}
          spacing={8}
          borderRadius={"md"}
          bgColor={useColorModeValue("whiteAlpha.900", "gray.700")}
        >
          <VStack>
            <SiGnuprivacyguard fontSize={"3rem"} />
            <Heading>Sign in</Heading>
          </VStack>
          <VStack w={"full"} spacing={5}>
            <AuthInput
              lable={"Enter your email"}
              value={email}
              onChange={handleChange("email")}
              error={errorHandle?.email}
              disabled={loading}
            />
            <AuthInput
              lable={"Enter your Password"}
              value={password}
              onChange={handleChange("password")}
              type={"password"}
              error={errorHandle?.password}
              autoComplete={"true"}
              disabled={loading}
            />

            <HStack justifyContent={"space-between"} w="full">
              <Text
                fontSize={"sm"}
                as={NavLink}
                to="/signup"
                color="blue.400"
                _hover={{ textDecoration: "underLine" }}
              >
                Don't have any acount? Sign up.
              </Text>
              <Text
                fontSize={"sm"}
                as={NavLink}
                to="/"
                color="blue.400"
                _hover={{ textDecoration: "underLine" }}
              >
                Forget password
              </Text>
            </HStack>
          </VStack>
          <AuthButton
            onClick={isSubmit}
            disabled={loading}
            isLoading={loading}
            loadingText="Submitting"
            name={"Sign in"}
          />
        </VStack>
      </Container>
    </>
  );
};

export default Signin;
