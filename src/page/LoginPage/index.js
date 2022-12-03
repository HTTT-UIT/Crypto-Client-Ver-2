/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  // Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Text
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom"
import { handleInfo, handleSuccess, handleWarning } from "../../component/SweetAlert";
import { useJwt } from "../../jwt/jwt";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [countSubmit, setCountSubmit] = useState(0)

  if (useJwt().jwt.getToken() !== undefined && useJwt().jwt.getToken() !== null) {
    console.log(useJwt().jwt.getToken())
    window.location.href = "/"
  }
  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async () => {
    try {
      setCountSubmit(prev => prev + 1)
      if (username === "" || password === "") {
        handleInfo("Chú ý", "Tên đăng nhập và mật khẩu không được trống")
        return
      }
  
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const response = await useJwt().jwt.login({
        username,
        password
      })
  
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useJwt().jwt.setToken(response.data.token)
      handleSuccess("Thành công", "Đăng nhập thành công")
    } catch (error) {
      handleInfo("Chú ý", "Tên đăng nhập hoặc mật khẩu chưa đúng.")
    }
  }
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">SCG Group</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input isInvalid={countSubmit > 0 && username === ""} type="text" placeholder="Tên đăng nhập" onChange={(e) => setUsername(e.target.value)} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={countSubmit > 0 && password === ""}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Ẩn" : "Hiện"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>Quên mật khẩu?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={handleSubmit}
              >
                Đăng nhập
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Flex>
        Bạn chưa là thành viên?{" "}
        <Link to="/register">
          <Text color="teal.500" marginStart={"12px"} fontWeight={"medium"}>Đăng ký ngay</Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
