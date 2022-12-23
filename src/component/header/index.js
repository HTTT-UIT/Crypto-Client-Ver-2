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
  LinkBox,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  ScaleFade,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
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
  const userId = useJwt().jwt.getUserData()?.primarysid
  const [iconSearch, setIconSearch] = useState(true)
  const [searchValue, setSearchValue] = useState("")

  const handleSignOut = () => {
    useJwt().jwt.signOut()
    window.location.href = '/'
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
      bg="#d9a15f"
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
        direction={{ base: "row", md: "row" }}
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
          <Text fontSize={"sm"}>
              TRANG CHỦ
          </Text>
        </Button>
        <Button
          variant="outline"
          leftIcon={<Icon as={MdArticle} w="4" h="4"/>}
          color={"white"}
          bg={(window.location.pathname === "/blog") ? "black" : "transparent"}
          onClick={() => navigate('/blog')}
          _hover={{bg: "black"}}
          _active={{bg: "transparent"}}>
          <Text fontSize={"sm"}>
              BÀI VIẾT
          </Text>
        </Button>
        <Button
          variant="outline"
          leftIcon={<Icon as={MdBookmark} w="4" h="4"/>}
          color={"white"}
          onClick={() => navigate('/about')}
          bg={(window.location.pathname === "/about") ? "black" : "transparent"}
          _hover={{bg: "black"}}
          _active={{bg: "transparent"}}>
          <Text fontSize={"sm"}>
              GIỚI THIỆU
          </Text>
        </Button>
      </Stack>
      {
        iconSearch && (
          <Box
            cursor={"pointer"}
            bg="transperant" 
            border={"2px solid black"}
            color="black"
            p="5px 12px 5px 12px" 
            borderRadius={"10"} 
            textAlign="center" 
            alignItems={"center"}
            onClick={() => setIconSearch(!iconSearch)}
            >
            <SearchIcon 
              w='5' 
              h='5'
              cursor={"pointer"}
            />
          </Box>
        )
      }
      {
      <Box
        display={(!iconSearch) ? "block" : "none"}
      >
        <ScaleFade initialScale={0.9} in={!iconSearch}>
            <InputGroup 
            >
              <InputLeftElement
                pointerEvents='none'
                children={<SearchIcon color='gray.300' />}
              />
              <Input 
                type='tel' 
                placeholder='Tìm kiếm bài viết' 
                maxWidth={"400px"} 
                bg="white" 
                color={"black"}
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/blog/?search=${e.target.value}`)
                  }
                }}
              />
              <InputRightElement 
                children={<CloseIcon color='black' />} 
                onClick={() => {
                  setIconSearch(!iconSearch)
                  setSearchValue("")
                  const params = new URLSearchParams(window.location.search)
                  if (params.get('search') !== undefined && params.get('search') !== null)
                    navigate(`/blog`)
                }}
                cursor="pointer"
              />
            </InputGroup>
        </ScaleFade>
      </Box>
      }
      {
        (useJwt().jwt.getToken() === undefined || useJwt().jwt.getToken() === null) && (
          <>
            <Box
              display={{ base: isOpen ? "block" : "none", md: "block" }}
              mt={{ base: 4, md: 0 }}
              marginStart="30px"
            >
              <Button
                size="sm"
                variant="solid"
                backgroundColor="white"
                _hover={{ bg: "black", border: "1px solid white", textColor: "white" }}
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
                _hover={{ bg: "black", border: "1px solid white", textColor: "white"}}
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
          <Stack direction='row' spacing={4} marginStart={8}>
            <Menu>
              <MenuButton me="4">
                  <Flex>
                    <Text border={"dotted"} borderRadius="10" borderColor="black" p="1px 7px 1px 7px" textColor={"black"} fontSize="md" fontWeight={"700"} m={2}>{(data !== null && data.name !== undefined && data.name !== null) ? data.name : ''}</Text>
                    <Avatar boxShadow={"xl"} src= { (data !== null && data.profileImageUrl !== undefined && data.profileImageUrl !== null) ? data.profileImageUrl : 'https://bit.ly/dan-abramov'}>
                      <AvatarBadge boxSize='1.25em' bg='green.500'/>
                    </Avatar>
                  </Flex>
              </MenuButton>
              <MenuList textColor="black">
                <MenuGroup title='Cá nhân'>
                  <MenuItem icon={<Icon as={MdAccountCircle} w={6} h={6} color="green"/>} onClick={() => navigate('/my-account')}>Hồ sơ của bạn</MenuItem>
                  <MenuItem icon={<Icon as={MdBookmark} w={6} h={6} color="black"/>} onClick={() => navigate('/my-article')}>Bài viết yêu thích</MenuItem>
                  <MenuItem icon={<Icon as={MdMoney} w={6} h={6} color="orange"/>} onClick={() => navigate('/favourite-coin')}>Tiền ảo yêu thích</MenuItem>
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
