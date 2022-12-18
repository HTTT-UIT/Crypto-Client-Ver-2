/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
  AvatarBadge,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { MdAccountCircle, MdArticle, MdBookmark, MdHomeFilled, MdManageAccounts, MdMoney, MdPageview } from 'react-icons/md'
import { TbPlugOff } from 'react-icons/tb'
import {Link, useNavigate} from "react-router-dom"
import { useJwt } from "../../jwt/jwt";

// Note: This code could be better,
// so I'd recommend you to understand how I solved and you could write yours better :)
// Good luck! 🍀

// Update: Check these awesome headers from Choc UI 👇
// https://choc-ui.tech/docs/elements/headers
const Header = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const userId = useJwt().jwt.getUserData().primarysid
  
  const handleSignOut = () => {
    useJwt().jwt.signOut()
    window.location.reload()
  }

  const fetchData = async () => {
    // setIsLoading(true)
    if (userId !== undefined && userId !== null) {
      const response = await useJwt().jwt.getUser({
        userId
      })
      setData(response.data)
    }
    // setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
    console.log(window.location.pathname)
  }, [navigate])

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      pos={"fixed"}
      padding={3}
      w="full"
      bg="#4950c0"
      color="white"
      zIndex={999}
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          <Link to={"/"}>
            SCG
          </Link>
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
        marginStart="30px"
      >
        <Button 
          leftIcon={<Icon as={MdHomeFilled} w="4" h="4"/>} 
          variant="outline"
          color={"white"}
          bg={(window.location.pathname === "/") ? "black" : "transparent"}
          onClick={() => navigate('/')}
          _hover={{bg: "black"}}
          _active={{bg: "transparent"}}>
            {/* <Link to={"/"}> */}
              <Text fontSize={"sm"}>
                  TRANG CHỦ
              </Text>
            {/* </Link> */}
        </Button>
        <Button
          variant="outline"
          leftIcon={<Icon as={MdArticle} w="4" h="4"/>}
          color={"white"}
          bg={(window.location.pathname === "/blog") ? "black" : "transparent"}
          onClick={() => navigate('/blog')}
          _hover={{bg: "black"}}
          _active={{bg: "transparent"}}>
            {/* <Link to={"/blog"}> */}
              <Text fontSize={"sm"}>
                  BÀI VIẾT
              </Text>
            {/* </Link> */}
        </Button>
        <Button
          variant="outline"
          leftIcon={<Icon as={MdBookmark} w="4" h="4"/>}
          color={"white"}
          onClick={() => navigate('/about')}
          bg={(window.location.pathname === "/about") ? "black" : "transparent"}
          _hover={{bg: "black"}}
          _active={{bg: "transparent"}}>
            {/* <Link to={"/blog"}> */}
              <Text fontSize={"sm"}>
                  GIỚI THIỆU
              </Text>
            {/* </Link> */}
        </Button>
        {/* <Text fontSize={"lg"}>
          <Link to={"/blog"}>
            BÀI VIẾT
          </Link>
        </Text> */}
      </Stack>
      {
        (useJwt().jwt.getToken() === undefined || useJwt().jwt.getToken() === null) && (
          <>
            <Box
              display={{ base: isOpen ? "block" : "none", md: "block" }}
              mt={{ base: 4, md: 0 }}
            >
              <Button
                size="sm"
                variant="solid"
                backgroundColor="white"
                _hover={{ bg: "teal.700", borderColor: "teal.700", textColor: "white" }}
                marginEnd="12px"
                color={"black"}
                onClick={() => navigate("/login")}
              >
                  Đăng nhập
              </Button>
            </Box>
            <Box
              display={{ base: isOpen ? "block" : "none", md: "block" }}
              mt={{ base: 4, md: 0 }}
            >
              <Button
                size="sm"
                variant="outline"
                _hover={{ bg: "teal.700", borderColor: "teal.700" }}
                onClick={() => navigate("/register")}
              >
                  Đăng ký
              </Button>
            </Box>
          </>
        )
      }
      {
        (useJwt().jwt.getToken() !== undefined && useJwt().jwt.getToken() !== null) && (
          <Stack direction='row' spacing={4} marginStart={12}>
            <Menu>
              <MenuButton me="4">
                  <Flex>
                    <Text m={2}>{(data !== null && data.name !== undefined && data.name !== null) ? data.name : ''}</Text>
                    <Avatar src= { (data !== null && data.profileImageUrl !== undefined && data.profileImageUrl !== null) ? data.profileImageUrl : 'https://bit.ly/dan-abramov'}>
                      <AvatarBadge boxSize='1.25em' bg='green.500'/>
                    </Avatar>
                  </Flex>
              </MenuButton>
              <MenuList textColor="black">
                <MenuGroup title='Cá nhân'>
                  <MenuItem icon={<Icon as={MdAccountCircle} w={6} h={6} color="green"/>} onClick={() => navigate('/my-account')}>Hồ sơ của bạn</MenuItem>
                  <MenuItem icon={<Icon as={MdBookmark} w={6} h={6} color="black"/>} onClick={() => navigate('/my-article')}>Bài viết yêu thích</MenuItem>
                  <MenuItem icon={<Icon as={MdMoney} w={6} h={6} color="orange"/>}>Tiền ảo yêu thích</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title='Quản trị'>
                  <MenuItem icon={<Icon as={MdManageAccounts} w={6} h={6} color="black"/>}>Quản trị bài viết</MenuItem>
                  <MenuItem icon={<Icon as={TbPlugOff} w={6} h={6} color="red"/>} onClick={handleSignOut}>Đăng xuất</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Stack>
        )
      }
    </Flex>
  );
};

export default Header;
