import { useState, useRef } from "react";
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
  Text,
  FormErrorMessage,
  Icon
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaIdCard } from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom"
import { handleInfo, handleSuccess, handleWarning } from "../../component/SweetAlert";
import { useJwt } from "../../jwt/jwt";
import { MdArrowBack } from "react-icons/md";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CIdCard = chakra(FaIdCard);

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [countSubmit, setCountSubmit] = useState(0)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      setCountSubmit(prev => prev + 1)
      console.log(username, password, confirmPassword)
      if (username === "" || password === "" || confirmPassword === "") {
        handleInfo("Chú ý", "Tên đăng nhập, mật khẩu và xác nhận mật khẩu không được trống")
        return
      }
      if (password !== confirmPassword) {
        handleInfo("Chú ý", "Mật khẩu và mật khẩu xác nhận phải giống nhau.")
        return
      }
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const response = await useJwt().jwt.register({
        username,
        password
      })
      if (response.status === 200) {
        handleSuccess("Đăng ký thành viên thành công", () => {
          navigate("/login")
        })
      }
      
    } catch (error) {
      handleWarning("Cảnh báo", "Tên đăng nhập hiện tại đã có trong hệ thống.<br/>Vui lòng chọn tên đăng nhập khác.")
    }
  }
  return (
    <Box
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
    >
    <Button 
        leftIcon={<Icon as={MdArrowBack} w="4" h="4"/>} 
        margin={"12px"}
        bg={"black"}
        color={"white"}
        _hover={{bg: "white", color: "black"}}
        onClick={() => window.location.href = "/"}
        _active={{bg: "transparent"}}>
          {/* <Link to={"/"}> */}
            <Text fontSize={"sm"}>
                TRỞ VỀ
            </Text>
          {/* </Link> */}
      </Button>
      <Flex
        flexDirection="column"
        width="100wh"
        height="90%"
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
          <Avatar bg="black" />
          <Heading color="black" onClick={() => navigate('/')} cursor="pointer">SCG Group</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                {/* <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CIdCard color="gray.300" />}
                    />
                    <Input type="text" placeholder="Họ và tên" />
                  </InputGroup>
                </FormControl> */}
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
                      placeholder="Xác nhận mật khẩu"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      isInvalid={countSubmit > 0 && confirmPassword === ""} 
                    />
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={10}
                  variant="solid"
                  bg="black"
                  color="white"
                  width="full"
                  _hover={{bg: 'white', color: "black", border: '2px solid black'}}
                  onClick={() => handleSubmit()}
                >
                  Đăng ký
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Flex>
          Bạn đã là thành viên?{" "}
          <Link color="black" to="/login">
            <Text color="black" marginStart={'12px'} fontWeight={"medium"}>Đăng nhập</Text>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default RegisterPage;
