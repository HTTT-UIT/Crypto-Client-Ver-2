import React from "react";
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
import { MdAccountCircle, MdArticle, MdBookmark, MdHomeFilled, MdManageAccounts, MdMoney } from 'react-icons/md'
import { TbPlugOff } from 'react-icons/tb'
import {Link, useNavigate} from "react-router-dom"

// Note: This code could be better,
// so I'd recommend you to understand how I solved and you could write yours better :)
// Good luck! 🍀

// Update: Check these awesome headers from Choc UI 👇
// https://choc-ui.tech/docs/elements/headers
const Header = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const navigate = useNavigate()
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white"
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
          onClick={() => navigate('/blog')}
          _hover={{bg: "black"}}
          _active={{bg: "transparent"}}>
            {/* <Link to={"/blog"}> */}
              <Text fontSize={"sm"}>
                  BÀI VIẾT
              </Text>
            {/* </Link> */}
        </Button>
        {/* <Text fontSize={"lg"}>
          <Link to={"/blog"}>
            BÀI VIẾT
          </Link>
        </Text> */}
      </Stack>

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
        >
          <Link to={"/login"}>
            Đăng nhập
          </Link>
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
        >
          <Link to={"/register"}>
            Đăng ký
          </Link>
        </Button>
      </Box>
      <Stack direction='row' spacing={4} marginStart={12}>
        <Menu>
          <MenuButton>
            <Avatar src='https://bit.ly/dan-abramov'>
            <AvatarBadge boxSize='1.25em' bg='green.500'/>
          </Avatar>
          </MenuButton>
          <MenuList textColor="black">
            <MenuGroup title='Cá nhân'>
              <MenuItem icon={<Icon as={MdAccountCircle} w={6} h={6} color="green"/>}>Tài khoản của bạn</MenuItem>
              <MenuItem icon={<Icon as={MdBookmark} w={6} h={6} color="black"/>}>Bài viết yêu thích</MenuItem>
              <MenuItem icon={<Icon as={MdMoney} w={6} h={6} color="orange"/>}>Tiền ảo yêu thích</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title='Quản trị'>
              <MenuItem icon={<Icon as={MdManageAccounts} w={6} h={6} color="black"/>}>Quản trị bài viết</MenuItem>
              <MenuItem icon={<Icon as={TbPlugOff} w={6} h={6} color="red"/>}>Đăng xuất</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Stack>
    </Flex>
  );
};

export default Header;
