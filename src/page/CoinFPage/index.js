/* eslint-disable react-hooks/rules-of-hooks */
import { Center, Text, Grid, GridItem, Wrap, WrapItem, Flex, Stat, StatHelpText, StatArrow, Box, Card, CardBody, Button } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import {useJwt} from "../../jwt/jwt"
import CardInHeader from "./component/CardInHeader"
import CarouselCS from "./component/Carousel"
import TableCS from "./component/Table"

const CoinFPage = () => {
  const userId = useJwt().jwt.getUserData()?.primarysid
  const [assets, setAssets] = useState([])
  const [fCoins, setFCoins] = useState([])
  const [limit, setLimit] = useState(100)
  const timeRef = useRef()
  const timeInteval = useRef(20000)
  const check = useRef(true)

  useEffect(() => {
    timeInteval.current += 500
    const fetchFCoin = async () => {
      const response = await useJwt().jwt.getFavouriteCoin({
        userId
      })
      setFCoins(response.data.items)
    }

    fetchFCoin()
    setInterval(() => {
      fetchFCoin()
    }, 1000)

  }, [limit])

  useEffect(() => {
    const fetchAssets = async () => {
      const results = []
      const fetchUp = async (index) => {
        if (index >= fCoins.length) return
        const response = await useJwt().jwt.getDataWithID(fCoins[index].refId)
        results.push(response.data.data)
        await fetchUp(index + 1)
      }
      await fetchUp(0)
      // const response = await useJwt().jwt.getDataAssets(limit)
      setAssets(results)
      check.current = true
    }
    fetchAssets()
    // clearInterval(timeInteval.current)
    // timeRef.current = setInterval(() => {
    //   if (check.current) {
    //     check.current = false
    //     fetchAssets()
    //   }
    // }, timeInteval.current)
  }, [fCoins])

  return (
    <Grid
      h='200px'
      templateRows='repeat(4, 1fr)'
      templateColumns='repeat(2, 1fr)'
      gap={4}
      paddingTop="24px"
    >
      <GridItem colSpan={2} bg={"transparent"} marginStart={10}>
        <Text as={"h1"} fontSize="2xl" fontWeight={"medium"}>
          Tiền điện tử đang theo dõi
        </Text>
        <Flex
          justify={"left"}
          marginTop="12px"
        >
          <Text>
            Vốn hóa thị trường tiền điện tử toàn cầu là <b>$842,14B</b>. Tăng
          </Text>
          <Box width="fit-content">
            <Stat>
              <StatHelpText textAlign={"center"} margin={0} padding="0 5px">
                <StatArrow type='increase' />
                9.05%
              </StatHelpText>
            </Stat>
          </Box>
          <Text>
            trong ngày hôm qua.
          </Text>
        </Flex>
      </GridItem>
      {/* <GridItem colSpan={2} bg='transparent' padding="10px 0 0 0">
        <Wrap spacing='30px' justify={"center"}>
          <WrapItem>
            <Center>
              <CardInHeader title={"🔥 Xu hướng"} />
            </Center>
          </WrapItem>
          <WrapItem>
            <Center>
              <CardInHeader title={"🕔 Đã thêm gần đây"}/>
            </Center>
          </WrapItem>
          <WrapItem>
            <Center>
              <CardInHeader title={"🕔 Đã thêm gần đây"}/>
            </Center>
          </WrapItem>
          <WrapItem>
          </WrapItem>
        </Wrap>
      </GridItem> */}
      <GridItem colSpan={2} bg='transparent' padding={"10px 10px 0 10px"}>
        <Card boxShadow={"2xl"}>
          <CardBody>
            <TableCS data={assets}/>
          </CardBody>
        </Card>
      </GridItem>
      {
        false && (
          <GridItem colSpan={2} bg='transparent' paddingBottom={"20px"}>
            <Flex justify={"center"}>
              <Button
                bgColor={"black"}
                isLoading={assets.length !== limit}
                loadingText='Đang tải'
                spinnerPlacement='start'
                // leftIcon={<Icon as={MdArticle} w="4" h="4"/>}
                color={"white"}
                onClick={() => setLimit(limit+ 50)}
                _hover={{bg: "black"}}
                _active={{bg: "transparent"}}>
                  {/* <Link to={"/blog"}> */}
                    <Text fontSize={"sm"}>
                        XEM THÊM
                    </Text>
                  {/* </Link> */}
              </Button>
            </Flex>
          </GridItem>

        )
      }
      <GridItem colSpan={2} bg='tomato' />
    </Grid>
  )
}

export default CoinFPage