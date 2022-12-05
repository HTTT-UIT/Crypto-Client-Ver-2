/* eslint-disable react-hooks/rules-of-hooks */
import { DeleteIcon } from "@chakra-ui/icons"
import { 
  Avatar, 
  Box, 
  Button, 
  Card, 
  CardBody, 
  CardFooter, 
  CardHeader,
  Container, 
  Divider, 
  Flex, 
  Heading, 
  Icon, 
  Image, 
  Stack, 
  Text, 
  Textarea, 
  VStack,
  Wrap, 
  WrapItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Checkbox, CheckboxGroup,
  useDisclosure, } from "@chakra-ui/react"
import { useRef } from "react"
import { useEffect, useState } from "react"
import { MdFlag, MdSave, MdSend, MdStar } from "react-icons/md"
import { Link, useParams } from "react-router-dom"
import { handleSuccess } from "../../component/SweetAlert"
import { useJwt } from "../../jwt/jwt"
import { BlogAuthor, BlogTags } from "../BlogList"


const BlogDetail = () => {
  const [data, setData] = useState({})
  const {id} = useParams()
  const date = new Date(data.createdAt)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const textareaRef = useRef()
  const [reasons, setReasons] = useState([])

  const  fetchData = async () => {
    try {
      const response = await useJwt().jwt.getArticleWithID({
        id
      })
      setData(response.data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleReport = async () => {
    console.log(textareaRef.current.value)
    console.log(reasons)
    console.log(useJwt().jwt.getUserData().primarysid)
    try {
      const response = await useJwt().jwt.postReport({
        userId: useJwt().jwt.getUserData().primarysid,
        blogId: data.id,
        reason: reasons.toString(),
        content: textareaRef.current.value
      }) 
      console.log(response)
      onClose()
      handleSuccess("Báo cáo thành công", () => {
      })
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <Container maxW={"7xl"} p="10">
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex align={"center"}>
              <Icon as={MdFlag} w="6" h="6" color={"red"}/>
              <Text marginStart={"12px"}>Báo cáo bài viết</Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text marginBottom={"5px"} fontWeight={"medium"}>Nguyên nhân</Text>
            <CheckboxGroup colorScheme='green' defaultValue={reasons} onChange={(value) => setReasons(value)}>
              <Stack spacing={[1, 5]} direction={['row', 'column']}>
                <Checkbox value='Nội dung khiêu dâm'>Nội dung khiêu dâm</Checkbox>
                <Checkbox value='Nội dung bạo lực phản cảm'>Nội dung bạo lực phản cảm</Checkbox>
                <Checkbox value='Nội dung lăng mạ hoặc kích động gây thù hận'>Nội dung lăng mạ hoặc kích động gây thù hận</Checkbox>
                <Checkbox value='Vi phạm bản quyền của tôi'>Vi phạm bản quyền của tôi</Checkbox>
                <Checkbox value='Nội dung không đúng sự thật'>Nội dung không đúng sự thật</Checkbox>
                <Checkbox value='Khác'>Khác</Checkbox>
              </Stack>
            </CheckboxGroup>
            <FormControl marginTop={"12px"}>
              <FormLabel>Nội dung báo cáo</FormLabel>
              <Textarea placeholder='' ref={textareaRef}/>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={handleReport}>
              Gửi báo cáo
            </Button>
            <Button onClick={onClose}>Trở lại</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Card width={"100%"}>
          <CardHeader>
            <Flex justify={"space-between"}>
              <Button 
                leftIcon={<Icon as={MdFlag} w="4" h="4" color={"red"}/>} 
                variant="outline"
                color={"black"}
                onClick={onOpen}
                _hover={{bg: "black", color: "white"}}
                _active={{bg: "transparent", color: "black"}}>
                <Text fontSize={"sm"}>
                    Báo cáo vi phạm
                </Text>
              </Button>
              <Box
                display={"flex"}
                alignItems={"center"}
                marginTop="12px"
              >
                {
                  (data.totalFollower > 1) && (
                    <Text color={"yellow.800"}>{data.totalFollower}</Text>
                  )
                }
                {
                  (data.totalFollower > 0) && (
                    <Icon as={MdStar} w="7" h="7" color={"yellow.700"} />
                  )
                }
                {
                  (data.totalFollower <= 0) && (
                    <Text color={"yellow.800"}>Chưa đánh giá</Text>
                  )
                }
              </Box>
              
            </Flex>
          </CardHeader>
          <Divider/>
          <CardBody>
            <Heading as="h2" marginBottom={"20px"}>{data.header}</Heading>

            <Box
              dangerouslySetInnerHTML={{__html: data.content}}
            >
            </Box>
            <Flex justify={"end"} width="100%" direction={"row"}>
              <Text fontSize={"md"} color={"#ababab"}>
                Tác giả: {data.authorName} <br/>
                Đăng ngày: {`${`0${date.getDate()}`.slice(-2)}-${`0${date.getMonth() + 1}`.slice(-2)}-${date.getFullYear()}`}
              </Text>
            </Flex>
          </CardBody>
          <Divider />
          <CardFooter>
            <Flex justify={"end"} width="100%" direction={"row"}>
              <Button 
                leftIcon={<Icon as={MdSave} w="4" h="4"/>} 
                variant="outline"
                color={"green"}
                // onClick={() => navigate('/')}
                _hover={{bg: "green", color: "white"}}
                _active={{bg: "transparent", color: "green"}}>
                  {/* <Link to={"/"}> */}
                    <Text fontSize={"sm"}>
                      Lưu bài viết
                    </Text>
                  {/* </Link> */}
              </Button>
            </Flex>
          </CardFooter>
        </Card>
        <Card width={"100%"} p="0 40px 40px 40px">
          <CardBody>
            <Stack width={"100%"} paddingTop="24px">
              <Heading fontSize={"lg"}>Suy nghĩ của bạn</Heading>
              <Textarea
                placeholder='Hãy cho chúng tôi biết bạn đang suy nghĩ gì?'
                width={"100%"}
                size='lg'
              />
            </Stack>
            <Flex justify={"end"} width="100%" paddingTop={"12px"}>
              <Button 
                leftIcon={<Icon as={MdSend} w="4" h="4"/>} 
                // width="100px"
                variant="outline"
                bg={"black"}
                color={"white"}
                // onClick={() => navigate('/')}
                _hover={{bg: "green", color: "white"}}
                _active={{bg: "transparent", color: "green"}}>
                  {/* <Link to={"/"}> */}
                    <Text fontSize={"sm"}>
                      Gửi bình luận
                    </Text>
                  {/* </Link> */}
              </Button>
            </Flex>
          </CardBody>
          <Divider />
          <CardFooter>
            <Flex direction={"column"} width="100%">
              <Card width={"100%"} bg="gray.50" marginTop={"12px"}>
                <CardBody >
                  <Box width={"100%"}>
                    <Flex justify={"start"} align="center" >
                      <Stack paddingStart={"12px"} width="100%">
                        <Flex justify="space-between" align="center">
                          <Flex justify={"start"} align="center" width="100%">
                            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                            <Heading fontSize={"md"} paddingStart="12px">Nguyễn Văn A</Heading>
                          </Flex>
                          <Button colorScheme={"red"} size="xs" leftIcon={<DeleteIcon/>}>
                            Xóa
                          </Button>
                        </Flex>
                        <Text textAlign={"justify"}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                          condimentum quam arcu, eu tempus tortor molestie at.
                        </Text>
                      </Stack>
                    </Flex>
                  </Box>
                </CardBody>
              </Card>
              <Card width={"100%"} bg="gray.50" marginTop={"12px"}>
                <CardBody >
                  <Box width={"100%"}>
                    <Flex justify={"start"} align="center" >
                      <Stack paddingStart={"12px"} width="100%">
                        <Flex justify="space-between" align="center">
                          <Flex justify={"start"} align="center" width="100%">
                            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                            <Heading fontSize={"md"} paddingStart="12px">Nguyễn Văn A</Heading>
                          </Flex>
                          <Button colorScheme={"red"} size="xs" leftIcon={<DeleteIcon/>}>
                            Xóa
                          </Button>
                        </Flex>
                        <Text textAlign={"justify"}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                          condimentum quam arcu, eu tempus tortor molestie at.
                        </Text>
                      </Stack>
                    </Flex>
                  </Box>
                </CardBody>
              </Card>
            </Flex>
          </CardFooter>
        </Card>
      </VStack>
      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading>Bài viết khác</Heading>
        <Wrap spacing="40px" marginTop="5" justify={"center"}>
          <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
            <Box w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  <Image
                    transform="scale(1.0)"
                    src={
                      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                    }
                    alt="some text"
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  />
                </Link>
              </Box>
              <BlogTags tags={['Engineering', 'Product']} marginTop="3" />
              <Heading fontSize="xl" marginTop="2">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  Some blog title
                </Link>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </Text>
              <BlogAuthor
                name="John Doe"
                date={new Date('2021-04-06T19:01:27Z')}
              />
            </Box>
          </WrapItem>
          <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
            <Box w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  <Image
                    transform="scale(1.0)"
                    src={
                      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                    }
                    alt="some text"
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  />
                </Link>
              </Box>
              <BlogTags tags={['Engineering', 'Product']} marginTop="3" />
              <Heading fontSize="xl" marginTop="2">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  Some blog title
                </Link>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </Text>
              <BlogAuthor
                name="John Doe"
                date={new Date('2021-04-06T19:01:27Z')}
              />
            </Box>
          </WrapItem>
          <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
            <Box w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  <Image
                    transform="scale(1.0)"
                    src={
                      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                    }
                    alt="some text"
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  />
                </Link>
              </Box>
              <BlogTags tags={['Engineering', 'Product']} marginTop="3" />
              <Heading fontSize="xl" marginTop="2">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  Some blog title
                </Link>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </Text>
              <BlogAuthor
                name="John Doe"
                date={new Date('2021-04-06T19:01:27Z')}
              />
            </Box>
          </WrapItem>
          <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
            <Box w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  <Image
                    transform="scale(1.0)"
                    src={
                      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                    }
                    alt="some text"
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  />
                </Link>
              </Box>
              <BlogTags tags={['Engineering', 'Product']} marginTop="3" />
              <Heading fontSize="xl" marginTop="2">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  Some blog title
                </Link>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </Text>
              <BlogAuthor
                name="John Doe"
                date={new Date('2021-04-06T19:01:27Z')}
              />
            </Box>
          </WrapItem>
          <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
            <Box w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  <Image
                    transform="scale(1.0)"
                    src={
                      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                    }
                    alt="some text"
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  />
                </Link>
              </Box>
              <BlogTags tags={['Engineering', 'Product']} marginTop="3" />
              <Heading fontSize="xl" marginTop="2">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  Some blog title
                </Link>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </Text>
              <BlogAuthor
                name="John Doe"
                date={new Date('2021-04-06T19:01:27Z')}
              />
            </Box>
          </WrapItem>
         </Wrap>
      </VStack>
    </Container>
  )
}

export default BlogDetail