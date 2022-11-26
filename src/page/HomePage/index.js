import { Center, Text, Grid, GridItem, Wrap, WrapItem, Flex, Stat, StatHelpText, StatArrow, Box } from "@chakra-ui/react"
import CardInHeader from "./component/CardInHeader"
import CarouselCS from "./component/Carousel"
import TableCS from "./component/Table"

const HomePage = () => {
  return (
    <Grid
      h='200px'
      templateRows='repeat(3, 1fr)'
      templateColumns='repeat(2, 1fr)'
      gap={4}
      paddingTop="24px"
    >
      <GridItem colSpan={2} bg={"transparent"} marginStart={10}>
        <Text as={"h1"} fontSize="2xl" fontWeight={"medium"}>
          Giá tiền điện tử hôm nay theo giới hạn thị trường
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
      <GridItem colSpan={2} bg='transparent' padding="10px 0 0 0">
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
            {/* <CarouselCS /> */}
            {/* <Center> */}
         
              {/* <CardInHeader title={"⭐ Các bài viết đáng chú ý"}/> */}
            {/* </Center> */}
          </WrapItem>
        </Wrap>
      </GridItem>
      <GridItem colSpan={2} bg='transparent' padding={10}>
        <TableCS />
      </GridItem>
      <GridItem colSpan={2} bg='papayawhip' />
      <GridItem colSpan={2} bg='tomato' />
    </Grid>
  )
}

export default HomePage