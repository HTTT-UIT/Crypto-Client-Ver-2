import { DeleteIcon } from "@chakra-ui/icons"
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Container, Divider, Flex, Heading, Icon, Image, Stack, Text, Textarea, VStack, Wrap, WrapItem } from "@chakra-ui/react"
import { MdFlag, MdSave, MdSend } from "react-icons/md"
import { Link } from "react-router-dom"
import { BlogAuthor, BlogTags } from "../BlogList"


const BlogDetail = () => {
  return (
    <Container maxW={"7xl"} p="10">
      <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2">What we write about</Heading>
        <Card>
          <CardHeader>
            <Button 
              leftIcon={<Icon as={MdFlag} w="4" h="4"/>} 
              variant="outline"
              color={"black"}
              // onClick={() => navigate('/')}
              _hover={{bg: "black", color: "white"}}
              _active={{bg: "transparent", color: "black"}}>
                {/* <Link to={"/"}> */}
                  <Text fontSize={"sm"}>
                      Báo cáo vi phạm
                  </Text>
                {/* </Link> */}
            </Button>
          </CardHeader>
          <CardBody>
            <Text as="p" fontSize="lg" textAlign={"justify"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
              pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
              imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
              sapien. Suspendisse placerat vulputate posuere. Curabitur neque
              tortor, mattis nec lacus non, placerat congue elit.
            </Text>
            <Text as="p" fontSize="lg"  textAlign={"justify"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
              pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
              imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
              sapien. Suspendisse placerat vulputate posuere. Curabitur neque
              tortor, mattis nec lacus non, placerat congue elit.
            </Text>
            <Text as="p" fontSize="lg"  textAlign={"justify"}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
              pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
              imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
              sapien. Suspendisse placerat vulputate posuere. Curabitur neque
              tortor, mattis nec lacus non, placerat congue elit.
            </Text>
            <Flex justify={"end"} width="100%" direction={"row"}>
              <Text fontSize={"md"} color={"#ababab"}>
                Tác giả: Hoàng Phú <br/>
                Đăng ngày: 26-11-2022
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
              {/* <Card width={"100%"} bg="gray.50" marginTop={"12px"}>
                <CardBody >
                  <Box>
                    <Flex justify={"start"} align="center" >
                      <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                      <Stack paddingStart={"12px"}>
                        <Heading fontSize={"md"}>Nguyễn Văn A</Heading>
                        <Text textAlign={"justify"}>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
                        </Text>
                      </Stack>
                    </Flex>
                  </Box>
                </CardBody>
              </Card> */}
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