/* eslint-disable react-hooks/rules-of-hooks */
import { UnderlineOutlined } from "@ant-design/icons"
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
  useDisclosure,
  Alert,
  AlertIcon, } from "@chakra-ui/react"
import { useId, useRef } from "react"
import { useEffect, useState } from "react"
import { MdFlag, MdSave, MdSend, MdStar } from "react-icons/md"
import { Link, useParams } from "react-router-dom"
import { useNavigate } from 'react-router';
import { handleQuestion, handleSuccess } from "../../component/SweetAlert"
import { useJwt } from "../../jwt/jwt"
import { BlogAuthor, BlogTags } from "../BlogList"


const BlogDetail = () => {
  const userId = useJwt().jwt.getUserData()?.primarysid
  console.log(userId)
  const [data, setData] = useState({})
  const {id} = useParams()
  const date = new Date(data.createdAt)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const textareaRef = useRef()
  const [reasons, setReasons] = useState([])
  const [isVote, setIsVote] = useState(false)
  const commentRef = useRef()
  const [dataComments, setDataComments] = useState({})
  const [userInfos, setUserInfos] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [articleData, setArticleData] = useState([])
  const [tagIds, setTagIds] = useState([])
  const navigate = useNavigate()

  const  fetchData = async () => {
    try {
      const response = await useJwt().jwt.getArticleWithID({
        id
      })
      setData(response.data)
    } catch (error) {
      
    }
  }

  const fetchArticles = async (params) => {
    try {
      const response = await useJwt().jwt.getArticles(params)
      setArticleData(response.data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchData()
    setPageSize(3)
  }, [navigate])

  const handleFilter = () => {
    // const arrTagId = data.tags.map(item => `tagIds=${item.id}&`)
    // setTagIds(arrTagId)
    setTagIds([])
  }

  useEffect(() => {
    const userVote = data.followUsers?.filter(item => item.id === userId)
    setIsVote(userVote?.length > 0)
    loadComments()
    handleFilter()
    fetchArticles({
      page,
      pageSize,
      tagIds
    })
  }, [data, pageSize])

  const handleReport = async () => {
    try {
      const response = await useJwt().jwt.postReport({
        userId,
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

  const handleVote = async () => {
    try {
      const response = await useJwt().jwt.postFollowReport({
        userId,
        blogId: data.id,
      }) 
      setIsVote(!isVote)
      fetchData()
      if (!isVote)
        handleSuccess("Cảm ơn bạn ❤️", () => {
      })
    } catch (error) {
      console.log(error)
      
    }
  }

  const handleComment = async () => {
    try {
      const response = await useJwt().jwt.postCommentReport({
        userId,
        blogId: data.id,
        content: commentRef.current.value
      }) 
      commentRef.current.value = ""
      fetchData()
      // handleSuccess("Thành công", () => {
      // })
    } catch (error) {
      console.log(error)
    }
  }

  const loadComments = async () => {
    try {
      const response = await useJwt().jwt.getComment({
        blogId: data.id,
      })
      setDataComments(response.data)
    } catch (error) {
      
    }
  }

  const handleDeleteComment =  (commentId) => {
    try {
      handleQuestion("Bạn muốn tiếp tục?", "Việc xóa bình luận sẽ không thể hoàn tác lại.", async (res) => {
        if (res.isConfirmed) {
          const response = await useJwt().jwt.deleteComment({
            blogId: data.id,
            userId,
            commentId
          })
          fetchData()
        }
      })
      // setDataComments(response.data)
    } catch (error) {
      
    }
  }
  
  const handleHours = (sDate) => {
    const datePast = new Date(sDate)
    const dateCurrent = new Date()
    let period = Math.abs(dateCurrent.getTime() - datePast.getTime())
    period = Math.round(period / 1000)
    if (period < 60) {
      return `${period} giây trước`
    }
    
    period = Math.round(period / 60)
    if (period < 60) {
      return `${period} phút trước`
    }

    period = Math.round(period / 60)
    if (period < 24) {
      return `${period} giờ trước`
    }
    return `${Math.round(period / 24)} ngày trước`
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
        <Flex direction={"column"} width="100%" alignItems={"center"}>
          <Card width={"70%"}>
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
              {
                (data.tags !== undefined) && (
                  <BlogTags tags={
                    data.tags.map(item => item.title)
                  } />
                )
              }
              <Box fontSize={"20px"}
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
                  leftIcon={<Icon as={MdStar} w="4" h="4" color="yellow.700"/>} 
                  variant="outline"
                  color={"yellow.700"}
                  _active={{bg: "transparent"}}
                  onClick={() => handleVote()}
                  isDisabled={(userId === undefined || userId === null)}
                >
                  <Text fontSize={"sm"}>
                    {isVote ? "Hủy tặng 1 sao" : "Tặng 1 sao"}
                  </Text>
                </Button>
              </Flex>
            </CardFooter>
          </Card>
          <Card width={"70%"} p="0 40px 40px 40px" marginTop={"12px"}>
            <CardBody>
            <Alert status='info' visibility={(userId !== undefined && userId !== null) ? 'collapse' : 'visible'}>
              <AlertIcon />
              Bạn hãy đăng nhập để trải nghiệm tính năng bình luận và tặng ⭐ nhé!
            </Alert>
              <Stack width={"100%"} paddingTop="24px">
                <Heading fontSize={"lg"}>{'BÌNH LUẬN'}</Heading>
                <Textarea
                  // borderRadius={"10px"}
                  ref={commentRef}
                  placeholder={(userId === undefined || userId === null) ? 'Tính năng này đang bị khóa...' : 'Hãy cho chúng tôi biết bạn đang suy nghĩ gì?'}
                  width={"100%"}
                  height="120px"
                  size='lg'
                  readOnly={(userId === undefined || userId === null) ? true : false}
                />
              </Stack>
              <Flex justify={"end"} width="100%" paddingTop={"12px"}>
                <Button
                  leftIcon={<Icon as={MdSend} w="4" h="4"/>} 
                  variant="outline"
                  bg={"black"}
                  color={"white"}
                  _hover={{bg: "black.700", color: "white"}}
                  // _active={{bg: "transparent", color: "green"}}
                  onClick={() => handleComment()}
                  isDisabled={(userId === undefined || userId === null)}
                  // visibility={(userId !== undefined || userId !== null) ? 'hidden' : 'visible'}
                >
                  <Text fontSize={"sm"}>
                    Gửi bình luận
                  </Text>
                </Button>
              </Flex>
            </CardBody>
            <Divider />
            <CardFooter>
              <Flex direction={"column"} width="100%">
                {
                  dataComments.items?.slice(0).reverse().map(item => {
                    return (
                      <div key={item.id}>
                        <Divider marginTop="14px" marginBottom="14px"/>
                        <Flex justify="space-between" align="center">
                          <Flex justify={"start"} align="center" width="100%">
                            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                            <Heading fontSize={"md"} paddingStart="12px">{item.username}</Heading>
                          </Flex>
                          {
                            (item.userId === userId || data.authorId === userId) && (
                              <Button variant={"outline"} colorScheme={"red"} size="xs" leftIcon={<DeleteIcon/>} onClick={() => handleDeleteComment(item.id)}>
                                Xóa
                              </Button>
                            )
                          }
                        </Flex>
                        <Card bg="gray.50" marginTop={"12px"} width="fit-content" borderRadius={"20px"}>
                          <CardBody>
                            <Box>
                              <Stack paddingStart={"12px"}>
                                <Text textAlign={"justify"} dangerouslySetInnerHTML={{__html:  item.content.replaceAll("\n", "<br/>")}}>
                                </Text>
                                <Text textAlign={"start"} fontSize="12px">
                                  {
                                    handleHours(item.createdAt)
                                  }
                                </Text>
                              </Stack>
                            </Box>
                          </CardBody>
                        </Card>
                      </div>
                    )
                  })
                }              
              </Flex>
            </CardFooter>
          </Card>
        </Flex>
      </VStack>
      <VStack paddingTop="40px" width={"100%"} spacing="2" alignItems="flex-start">
        <Heading>Bài viết khác</Heading>
        <Divider/>
        <Wrap width={"100%"} spacing="40px" marginTop="5" justify={"center"}>
          {
            articleData.items?.map(item => {
              return (
                <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }} key={item.id}>
                  <Box 
                    w="100%" 
                    h={"500px"}
                    position={"relative"}
                    padding={"10px"}
                    borderRadius={"10px"}
                    borderStyle={"dotted"}
                    borderWidth={"2px"}>
                    <Box borderRadius="lg" overflow="hidden">
                      {/* <Link 
                        textDecoration="none" 
                        _hover={{ textDecoration: 'none' }}
                        > */}
                        <Image
                          transform="scale(1.0)"
                          src={
                              (item.imageUrl !== undefined && item.imageUrl !== null && item.imageUrl !== "") ? item.imageUrl : 'https://guwahatiplus.com/public/web/images/default-news.png'

                          }
                          alt="some text"
                          objectFit="contain"
                          width="100%"
                          h={"250px"}
                          transition="0.3s ease-in-out"
                          _hover={{
                            transform: 'scale(1.05)',
                            cursor: 'pointer'
                          }}
                          onClick={() =>  navigate(`/blog/${item.id}`)}
                        />
                      {/* </Link> */}
                    </Box>
                    <BlogTags tags={item.tags.map(item => item.title)} marginTop="3" />
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      marginTop="12px"
                    >
                       {
                          (item.totalFollower > 1) && (
                            <Text color={"yellow.800"}>{item.totalFollower}</Text>
                          )
                        }
                        {
                          (item.totalFollower > 0) && (
                            <Icon as={MdStar} w="7" h="7" color={"yellow.700"} />
                          )
                        }
                        {
                          (item.totalFollower <= 0) && (
                            <Text color={"yellow.800"}>Chưa đánh giá</Text>
                          )
                        }
                    </Box>
                    <Heading 
                      fontSize="xl" 
                      marginTop="2" 
                      onClick={() =>  navigate(`/blog/${item.id}`)}
                      _hover={{
                        textDecoration: 'underline'
                      }}
                    >
                      <Link 
                        textDecoration="none" 
                        _hover={{ textDecoration: 'none' }}
                        >
                        {item.header}
                      </Link>
                    </Heading>
                    <Box
                      textAlign={"justify"} 
                      fontSize="md" 
                      marginTop="2" 
                      dangerouslySetInnerHTML={{__html: item.content}}>
                    </Box>
                    <BlogAuthor
                      image={item.authorImageUrl}
                      name={item.authorName}
                      date={new Date(item.createdAt)}
                    />
                  </Box>
                </WrapItem>
              )
            })
          }
         </Wrap>
         <Divider marginTop="5" />
          {
            (articleData === null || (articleData !== null && articleData.pageSize < articleData.totalRow)) && (
              <Box width={"100%"}>
                <Flex justify={"center"}>
                  <Button
                    marginTop={"12px"}
                    bgColor={"black"}
                    isLoading={articleData === null || (articleData !== null && articleData.pageSize !== pageSize)}
                    loadingText='Đang tải'
                    spinnerPlacement='start'
                    // leftIcon={<Icon as={MdArticle} w="4" h="4"/>}
                    color={"white"}
                    onClick={() => {
                      // setPage(page + 1)
                      setPageSize(pageSize + 3)
                    }}
                    _hover={{bg: "black"}}
                    _active={{bg: "transparent"}}>
                      {/* <Link to={"/blog"}> */}
                        <Text fontSize={"sm"}>
                            XEM THÊM
                        </Text>
                      {/* </Link> */}
                  </Button>
                </Flex>
              </Box>
            ) 
          }
      </VStack>
    </Container>
  )
}

export default BlogDetail