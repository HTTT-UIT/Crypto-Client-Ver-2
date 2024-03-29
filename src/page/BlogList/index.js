/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  Flex,
  Button,
  Icon,
  Spinner,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';
import { useParams } from 'react-router-dom'
import { useJwt } from "../../jwt/jwt";
import MultiSelecCS from '../../component/MuiltiSelect';
import { MdStar } from 'react-icons/md';


export const BlogTags = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};


export const BlogAuthor = (props) => {
  return (
    <HStack position={"absolute"} bottom="10px" marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderStyle={"dashed"}
        borderWidth={"2px"}
        borderColor={"gray"}
        borderRadius="full"
        boxSize="40px"
        objectFit={"cover"}
        src={(props.image !== undefined && props.image !== null && props.image !== "") ? props.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Faenza-avatar-default-symbolic.svg/1024px-Faenza-avatar-default-symbolic.svg.png"} 
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const ArticleList = () => {
  const [data, setData] = useState(null)
  const [dataItems, setDataItems] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(3)
  const [tagIds, setTagIds] = useState("")
  const [options, setOptions] = useState([])
  const [checkSpinner, setCheckSpinner] = useState(false)
  // const {search} = useParams()
  const location = useLocation()


  const fetchData = async (params) => {
    try {
      const response = await useJwt().jwt.getArticles(params)
      setCheckSpinner(false)
      const optionsResponse = await useJwt().jwt.getTags()
      console.log(optionsResponse)
      setDataItems(response.data.items)
      setData(response.data)
      setOptions([{id: -1 , title: "Tất cả"}, ...optionsResponse.data.items])
    } catch (error) {
    }
  }

  const handleFilter = (value) => {
    console.log(value)
    const arrTagId = value.map(item => `tagIds=${item}&`)
    setTagIds(arrTagId)
  }

  useEffect(() => {
    setCheckSpinner(true)
    setTimeout(() => {
    const query = new URLSearchParams(window.location.search)
      fetchData({
        page,
        pageSize,
        tagIds,
        followerId: '',
        authorId: '',
        search: (query.get("search") !== undefined && query.get("search") !== null) ? query.get("search") : ""
      })
    }, 0)
  }, [page, pageSize, tagIds, location])

  const navigate = useNavigate()

  useEffect(() => {
    setPageSize(3)
    // const query = new URLSearchParams(window.location.search)
    // fetchData({
    //   page,
    //   pageSize,
    //   tagIds,
    //   followerId: '',
    //   authorId: '',
    //   search: (query.get("search") !== undefined && query.get("search") !== null) ? query.get("search") : ""
    // })
  }, [navigate])

  return (
    <Container maxW={'7xl'} p="12">
      <Box
        display={"flex"}
      >
        <Heading as="h1" fontSize="2xl">DANH MỤC BÀI VIẾT</Heading>
        {
          checkSpinner && (
            <Spinner marginStart={"15px"} />
          )
        }
      </Box>

      <Box 
        position={"absolute"}
        right={"150px"}
        top={"124px"}
        display={"flex"}
        zIndex={"524"}
        justifyContent={"right"}>
          <Box
            maxW={"200px"} 
            mt="20px"
          >
            <MultiSelecCS onChange={(value) => handleFilter(value)} title={"Thể loại"} options={options} />
          </Box>
      </Box>

      {/* <Divider marginTop="7" marginBottom="10" /> */}
      {
        (dataItems.length > 0) && (
        <Box
          position={"relative"}
          marginTop={{ base: '1', sm: '5' }}
          display="flex"
          flexDirection={{ base: 'column', sm: 'row' }}
          justifyContent="space-between">
          <Box
            display="flex"
            flex="1"
            marginRight="3"
            position="relative"
            alignItems="center">
            <Box
              width={{ base: '100%', sm: '85%' }}
              zIndex="2"
              marginLeft={{ base: '0', sm: '5%' }}
              marginTop="5%">
              <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                <Flex justifyContent={"center"}>
                  <Image
                    borderRadius="lg"
                    src={
                      (dataItems[0].imageUrl !== undefined && dataItems[0].imageUrl !== null && dataItems[0].imageUrl !== "") ? dataItems[0].imageUrl : 'https://guwahatiplus.com/public/web/images/default-news.png'
                    }
                    alt="some good alt text"
                    objectFit="contain"
                    maxHeight={"300px"}
                    onClick={() =>  navigate(`/blog/${ dataItems[0].id}`)}
                  />
                </Flex>
              </Link>
            </Box>
            <Box zIndex="1" width="100%" position="absolute" height="100%">
              <Box
                bgGradient={useColorModeValue(
                  'radial(orange.600 1px, transparent 1px)',
                  'radial(orange.300 1px, transparent 1px)'
                )}
                backgroundSize="20px 20px"
                opacity="0.4"
                height="100%"
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: '3', sm: '0' }}>
            <BlogTags tags={
              dataItems[0].tags.map(item => item.title)
            } />
            <Box
              display={"flex"}
              alignItems={"center"}
              marginTop="12px"
            >
              {
                (dataItems[0].totalFollower > 1) && (
                  <Text color={"yellow.800"}>{dataItems[0].totalFollower}</Text>
                )
              }
              {
                (dataItems[0].totalFollower > 0) && (
                  <Icon as={MdStar} w="7" h="7" color={"yellow.700"} />
                )
              }
              {
                (dataItems[0].totalFollower <= 0) && (
                  <Text color={"yellow.800"}>Chưa đánh giá</Text>
                )
              }
            </Box>
              <Heading marginTop="1">
                <Link 
                  textDecoration="none" 
                  _hover={{ textDecoration: 'none' }}
                  onClick={() =>  navigate(`/blog/${ dataItems[0].id}`)}>
                  {
                    dataItems[0]['header']
                  }
                </Link>
              </Heading>
            <Box
              // as="p"
              maxHeight={"300px"}
              marginTop="2"
              color={useColorModeValue('gray.700', 'gray.200')}
              fontSize="lg"
              dangerouslySetInnerHTML={{__html: dataItems[0]["subContent"]}}>
            </Box>
            <BlogAuthor image={dataItems[0]["authorImageUrl"]} name={dataItems[0]["authorName"]} date={new Date(dataItems[0]["createdAt"])} />
          </Box>
        </Box>
        )
      }
      <Divider marginTop="50px" />
      <Wrap spacing="40px" marginTop="5" justify={"center"}>
        {
          dataItems.map((item, index) => {
            if (index > 0) {
              return (
                <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }} key={index}>
                  <Box 
                    w="100%" 
                    h={"500px"}
                    position={"relative"}
                    padding={"10px"}
                    borderRadius={"10px"}
                    borderStyle={"dotted"}
                    borderWidth={"2px"}>
                    <Box borderRadius="lg" overflow="hidden">
                      <Link 
                        textDecoration="none" 
                        _hover={{ textDecoration: 'none' }}
                        onClick={() =>  navigate(`/blog/${item.id}`)}>
                        <Image
                          transform="scale(1.0)"
                          src={
                              (item.imageUrl !== undefined && item.imageUrl !== null && item.imageUrl !== "") ? item.imageUrl : 'https://guwahatiplus.com/public/web/images/default-news.png'

                          }
                          alt="some text"
                          objectFit="contain"
                          width="100%"
                          maxHeight={"220px"}
                          transition="0.3s ease-in-out"
                          _hover={{
                            transform: 'scale(1.05)',
                          }}
                        />
                      </Link>
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
                    <Heading fontSize="xl" marginTop="2">
                      <Link 
                        textDecoration="none" 
                        _hover={{ textDecoration: 'none' }}
                        onClick={() => navigate(`/blog/${item.id}`)}>
                        {item.header}
                      </Link>
                    </Heading>
                    <Box
                      textAlign={"justify"} 
                      fontSize="md" 
                      marginTop="2" 
                      dangerouslySetInnerHTML={{__html: item.subContent}}>
                    </Box>
                    <BlogAuthor
                      image={item.authorImageUrl}
                      name={item.authorName}
                      date={new Date(item.createdAt)}
                    />
                  </Box>
                </WrapItem>
              )
            }
          }
          )
        }
      </Wrap>
      <Divider marginTop="5" />
      {
        ((data !== null && data.pageSize < data.totalRow)) && (
          <Box>
            <Flex justify={"center"}>
              <Button
                marginTop={"12px"}
                bgColor={"black"}
                isLoading={data === null || (data !== null && data.pageSize !== pageSize)}
                loadingText='Đang tải'
                spinnerPlacement='start'
                // leftIcon={<Icon as={MdArticle} w="4" h="4"/>}
                color={"white"}
                onClick={() => {
                  // setPage(page + 1)
                  setPageSize(pageSize + 2)
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
    </Container>
  );
};

export default ArticleList;