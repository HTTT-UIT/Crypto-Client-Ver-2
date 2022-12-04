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
import { useNavigate } from 'react-router';
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
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
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
  const [pageSize, setPageSize] = useState(2)
  const [tagIds, setTagIds] = useState("")
  const [options, setOptions] = useState([])
  const [checkSpinner, setCheckSpinner] = useState(false)

  const fetchData = async (params) => {
    try {
      const response = await useJwt().jwt.getArticles(params)
      setCheckSpinner(false)
      const optionsResponse = await useJwt().jwt.getTags()
      console.log(optionsResponse)
      setDataItems(response.data.items)
      setData(response.data)
      setOptions(optionsResponse.data.items)
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
      fetchData({
        page,
        pageSize,
        tagIds
      })
    }, 2000)
  }, [page, pageSize, tagIds])

  const navigate = useNavigate()
  return (
    <Container maxW={'7xl'} p="12">
      <Box
        display={"flex"}
      >
        <Heading as="h1" fontSize="2xl">DANH MỤC BÀI VIẾT</Heading>
        {
          checkSpinner && (
            <Spinner marginStart={"12px"} />
          )
        }

      </Box>

      <Box 
        position={"absolute"}
        right={"150px"}
        top={"124px"}
        display={"flex"}
        zIndex={"999"}
        justifyContent={"right"}>
          <Box
            maxW={"200px"} 
          >
            <MultiSelecCS onChange={(value) => handleFilter(value)} title={"Thể loại"} options={options} />
          </Box>
      </Box>
      {/* <Divider marginTop="7" marginBottom="10" /> */}
      {
        (dataItems.length > 0) && (
        <Box
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
                <Image
                  borderRadius="lg"
                  src={
                    'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                  }
                  alt="some good alt text"
                  objectFit="contain"
                  onClick={() =>  window.location.href = (`/blog/${ dataItems[0].id}`)}
                />
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
                  onClick={() =>  window.location.href = (`/blog/${ dataItems[0].id}`)}>
                  {
                    dataItems[0]['header']
                  }
                </Link>
              </Heading>
            <Box
              // as="p"
              marginTop="2"
              color={useColorModeValue('gray.700', 'gray.200')}
              fontSize="lg"
              dangerouslySetInnerHTML={{__html: dataItems[0]["content"]}}>
            </Box>
            <BlogAuthor name={dataItems[0]["authorName"]} date={new Date(dataItems[0]["createdAt"])} />
          </Box>
        </Box>
        )
      }
     
      {/* <Heading as="h2" marginTop="5" fontSize="2xl">
        Latest articles
      </Heading> */}
      <Divider marginTop="5" />
      <Wrap spacing="40px" marginTop="5" justify={"center"}>
        {
          dataItems.map((item, index) => {
            if (index > 0) {
              return (
                <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }} key={index}>
                  <Box w="100%">
                    <Box borderRadius="lg" overflow="hidden">
                      <Link 
                        textDecoration="none" 
                        _hover={{ textDecoration: 'none' }}
                        onClick={() =>  window.location.href = (`/blog/${item.id}`)}>
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
                        onClick={() => window.location.href = (`/blog/${item.id}`)}>
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
        (data === null || (data !== null && data.pageSize < data.totalRow)) && (
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
      {/* <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2">What we write about</Heading>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
          pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
          imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
          sapien. Suspendisse placerat vulputate posuere. Curabitur neque
          tortor, mattis nec lacus non, placerat congue elit.
        </Text>
      </VStack> */}
    </Container>
  );
};

export default ArticleList;