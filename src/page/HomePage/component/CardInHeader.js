import {Grid, GridItem, Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text, Flex, Avatar, Stat, StatHelpText, StatArrow } from "@chakra-ui/react"

const CardInHeader = ({title}) => {
  return (
   <div style={{padding: '8px'}}>
    <Card width={"25vw"} minWidth="250px">
      <CardHeader>
        <Heading size='sm' noOfLines={1}>{title}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='3'>
          <Box>
            <Grid
              h='20px'
              templateRows='repeat(1, 1fr)'
              templateColumns='repeat(6, 1fr)'
              gap={4}
            >
              <GridItem colSpan={1}>
                <Text fontSize={"sm"}>
                  1
                </Text>
              </GridItem>
              <GridItem colSpan={3}>
                <Flex justify={"left"} alignItems="center">
                  <Avatar width={7} height={7} name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                  <Text fontSize={"sm"} fontWeight={500} marginStart="5px">
                    Bitcoin
                  </Text>
                </Flex>
              </GridItem>
              <GridItem colSpan={2}>
                <Flex justify={"right"}>
                  <Stat >
                    <StatHelpText textAlign={"right"} margin={0} padding={0}>
                      <StatArrow type='decrease' />
                      9.05%
                    </StatHelpText>
                  </Stat>
                </Flex>
              </GridItem>
            </Grid>
          </Box>
          <Box>
          <Grid
              h='20px'
              templateRows='repeat(1, 1fr)'
              templateColumns='repeat(6, 1fr)'
              gap={4}
            >
              <GridItem colSpan={1}>
                <Text fontSize={"sm"}>
                  2
                </Text>
              </GridItem>
              <GridItem colSpan={3}>
                <Flex justify={"left"} alignItems="center">
                  <Avatar width={7} height={7} name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                  <Text fontSize={"sm"} fontWeight={500} marginStart="5px">
                    Bitcoin
                  </Text>
                </Flex>
              </GridItem>
              <GridItem colSpan={2}>
                <Flex justify={"right"}>
                  <Stat >
                    <StatHelpText textAlign={"right"} margin={0} padding={0}>
                      <StatArrow type='increase' />
                      9.05%
                    </StatHelpText>
                  </Stat>
                </Flex>
              </GridItem>
            </Grid>
          </Box>
          <Box>
          <Grid
              h='20px'
              templateRows='repeat(1, 1fr)'
              templateColumns='repeat(6, 1fr)'
              gap={4}
            >
              <GridItem colSpan={1}>
                <Text fontSize={"sm"}>
                  3
                </Text>
              </GridItem>
              <GridItem colSpan={3}>
                <Flex justify={"left"} alignItems="center">
                  <Avatar width={7} height={7} name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                  <Text fontSize={"sm"} fontWeight={500} marginStart="5px">
                    Bitcoin
                  </Text>
                </Flex>
              </GridItem>
              <GridItem colSpan={2}>
                <Flex justify={"right"}>
                  <Stat >
                    <StatHelpText textAlign={"right"} margin={0} padding={0}>
                      <StatArrow type='decrease' />
                      9.05%
                    </StatHelpText>
                  </Stat>
                </Flex>
              </GridItem>
            </Grid>
          </Box>
        </Stack>
      </CardBody>
    </Card>
   </div>
  )
}

export default CardInHeader