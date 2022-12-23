/* eslint-disable react-hooks/rules-of-hooks */
import { BellIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Flex,
  Avatar,
  Text,
  Stat,
  StatHelpText,
  StatArrow,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  Button,
  useDisclosure,
  Tooltip,
  Stack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react'
import { useJwt } from "../../../jwt/jwt"
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import ChartDetail from '../../../component/ChartDetail';
import { FaBellSlash } from 'react-icons/fa';
const changeUSD = (money) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(Number.parseFloat(money).toFixed(2))
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const TableCS = ({data}) => {
  const userId = useJwt().jwt.getUserData()?.primarysid
  const [stateData, setStateData] = useState(data)
  const state = useRef([])
  useMemo(() => {
    const arr = []
    data.forEach((item, index) => {
      if (index >= stateData.length) arr.push("null")
      else if (Number.parseFloat(stateData[index].priceUsd) < Number.parseFloat(item.priceUsd)) arr.push("increase")
      else if (Number.parseFloat(stateData[index].priceUsd) > Number.parseFloat(item.priceUsd)) arr.push("decrease")
      else arr.push(state.current[index])
    })
    state.current = [...arr]
    setTimeout(()=> {
      setStateData(data)
    }, 1000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [dataChoose, setDataChoose] = useState({
    name: '',
    symbol: ''
  })
  const [coinInfo, setCoinInfo] = useState()
  const [checkFavourite, setCheckFavourite] = useState(false)

  const getCoinInfo = async () => {
    try {
      setCheckFavourite(prev => false)
      const response = await useJwt().jwt.getCoin({
        coinID: dataChoose.id,
      })
      const userId = useJwt().jwt.getUserData()?.primarysid
      response.data.users.map(item => {
        if (item.id === userId) {
          setCheckFavourite(prev => true)
        }
      })
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getCoinInfo()
  }, [dataChoose])

  const openDetail = (item) => {
    setDataChoose(item)
    onOpen()
  }
  const [value, setValue] = useState('day')

  const handleFollow = async () => {
    const userId = useJwt().jwt.getUserData()?.primarysid
    try {
      await useJwt().jwt.postFavouriteCoin({
        coinID: dataChoose.id,
        userId
      })
      getCoinInfo()
      
    } catch (error) {
      
    }
  }
  
  return (
    <>
      {isOpen && (
        <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose} size="6xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Box>
                <Flex justify={"space-between"} alignItems="center">
                  <Flex justify={"left"} alignItems="center">
                    <Avatar width={12} height={12} name='' src={`https://assets.coincap.io/assets/icons/${dataChoose.symbol.toLowerCase()}@2x.png`} />
                    <Box>
                      <Text fontSize={"lg"} fontWeight={500} marginStart="7px">
                        {
                          dataChoose.name 
                        }
                      </Text>
                    </Box>
                  </Flex>
                  <Flex justify={"left"} alignItems="center">
                    <CloseIcon cursor={"pointer"} w={4} h={4} color="red.700" onClick={onClose}/>
                  </Flex>
                </Flex>
              </Box>
            </ModalHeader>
            <ModalBody pb={6}>
              <RadioGroup onChange={setValue} value={value} marginBottom="12px">
                <Stack direction='row'>
                  <Radio value='day'>Hôm nay</Radio>
                  <Radio value='week'>7 ngày gần nhất</Radio>
                  <Radio value='month'>30 ngày gần nhất</Radio>
                  <Radio value='year'>Năm nay</Radio>
                  <Radio value='year2'>2 năm gần nhất</Radio>
                </Stack>
              </RadioGroup>
              <ChartDetail item={dataChoose} filter={value}/>
            </ModalBody>

            <ModalFooter>
              <Flex>
                <Button disabled={userId === undefined} leftIcon={(checkFavourite) ? <FaBellSlash h={5} w={5} color={"orange.600"}/> : <BellIcon h={5} w={5} color={"orange.600"}/>} marginRight="12px" color={"orange.600"} onClick={() => {
                  handleFollow()
                }}>{(checkFavourite) ? "Hủy theo dõi" : "Theo dõi"}</Button>
                <Button onClick={onClose}>Trở lại</Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <TableContainer>
        <Table variant='simple' size={"sm"}>
          <TableCaption>SCG - Thị trường tiền ảo thế giới</TableCaption>
          <Thead>
            <Tr>
              <Th>
                <Text fontWeight={"semibold"}>
                  Rank
                </Text>
              </Th>
              <Th>
                <Text fontWeight={"semibold"}>
                  Name
                </Text>
              </Th>
              <Th>
                <Text fontWeight={"semibold"}>
                  Price
                </Text>
              </Th>
              <Th>
                <Text fontWeight={"semibold"}>
                  Market Cap
                </Text>
              </Th>
              <Th>
                <Text fontWeight={"semibold"}>
                  VWAP (24Hr)
                </Text>
              </Th>
              <Th>
                <Text fontWeight={"semibold"}>
                  Supply
                </Text>
              </Th>
              <Th>
                <Text fontWeight={"semibold"}>
                  Volume (24Hr)
                </Text>
              </Th>
              <Th>
                <Text fontWeight={"semibold"}>
                  Change (24Hr)
                </Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              data.map((item, index) => {
                return (
                  <Tooltip label="Xem chi tiết" aria-label='A tooltip' key={index}>
                    <Tr onClick={() => openDetail(item)}  _hover={{bg: '#efefef'}} bg={ (state.current.length <= index || stateData.length <= index || state.current[index] === "null" || stateData[index].priceUsd === item.priceUsd) ? "transparent" : ((state.current[index] === "decrease") ? "#ffe6e6" : "#e6ffe6")}>
                      <Td>
                        {
                          item.rank
                        }
                      </Td>
                      <Td >
                        <Box>
                          <Flex justify={"left"} alignItems="center">
                            <Avatar width={7} height={7} name='' src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png`} />
                            <Box>
                              <Text fontSize={"md"} fontWeight={500} marginStart="7px">
                                {
                                  item.name
                                }
                              </Text>
                              <Text fontSize={"sm"} marginStart="5px" marginTop="7px">
                                {
                                  item.symbol
                                }
                              </Text>
                            </Box>

                          </Flex>
                        </Box>
                      </Td>
                      <Td>
                        {
                          (state.current.length > index && state.current[index] !== "null") ? (
                            <Stat >
                              <StatHelpText textAlign={"left"} margin={0} padding={0}>
                                <StatArrow type={state.current[index]} />
                                {
                                  changeUSD(item.priceUsd)
                                }
                              </StatHelpText>
                            </Stat>
                          ) : changeUSD(item.priceUsd)
                        }
                      </Td>
                      <Td>{changeUSD(item.marketCapUsd)}</Td>
                      <Td>{changeUSD(item.vwap24Hr)}</Td>
                      <Td>{numberWithCommas(Number.parseFloat(item.supply).toFixed(3))}</Td>
                      <Td>{changeUSD(item.volumeUsd24Hr)}</Td>
                      <Td>
                        <Text color={( Number.parseFloat(item.changePercent24Hr) < 0) ? "red.500" : "green"}>
                          {
                            Number.parseFloat(item.changePercent24Hr).toFixed(2)
                          }%
                        </Text>
                      </Td>
                    </Tr>
                  </Tooltip>
                )
              })
            }
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>
                <Text fontWeight={"semibold"}>
                  Rank
                </Text>
              </Th>
              <Th>
                <Text fontWeight={"semibold"}>
                  Name
                </Text>
              </Th>
              <Th>
                <Text fontWeight={"semibold"}>
                  Price
                </Text>
              </Th>
              <Th>
                <Text fontWeight={"semibold"}>
                  Market Cap
                </Text>
              </Th>
              <Th>
                <Text fontWeight={"semibold"}>
                  VWAP (24Hr)
                </Text>
              </Th>
              <Th>
                <Text fontWeight={"semibold"}>
                  Supply
                </Text>
              </Th>
              <Th>
                <Text fontWeight={"semibold"}>
                  Volume (24Hr)
                </Text>
              </Th>
              <Th>
                <Text fontWeight={"semibold"}>
                  Change (24Hr)
                </Text>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  )
}

export default memo(TableCS)