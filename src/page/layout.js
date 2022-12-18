import Header from "../component/header"
import {Outlet} from 'react-router-dom'
import {useRef} from "react"
import { 
  Box, 
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  ButtonGroup,
  Stack,
  Icon,
  Flex,
  Text
  // PopoverAnchor,
} from "@chakra-ui/react"
import { ChatIcon } from "@chakra-ui/icons"
import Chatbot from "../component/Chatbot"
import { TbRobot } from "react-icons/tb"
const Layout = () => {
  const initialFocusRef = useRef()
  return (
    <>
      <Header/>
      <Box pt={20}>
        <Outlet/>
      </Box>
      <div style={{
        position: 'fixed',
        display: 'block',
        bottom: "24px",
        right: "24px",
        zIndex: "999"
      }}>
        <Popover
          initialFocusRef={initialFocusRef}
          placement='top'
          closeOnBlur={false}
        >
          <PopoverTrigger>
            <Button leftIcon={<ChatIcon/>}>Chatbot</Button>
          </PopoverTrigger>
          <PopoverContent shadow={"xl"} color='white' bg='white' borderWidth={"2px"} borderColor='teal.500' height={"80vh"} width={"30vw"} minW={"300px"} minH={"300px"}>
            <PopoverHeader pt={4} fontWeight='bold' border='0' color="black">
              <Flex align={"center"}>
                <Icon as={TbRobot} w="10" h="10" paddingEnd={"12px"}/>
                <Text fontSize={"xl"}>Trợ lý SCG</Text>
              </Flex>
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton color={"black"}/>
            <PopoverBody height={"80%"}>
              <Stack>
                <Box>
                  <Chatbot/>
                </Box>
              </Stack>
            </PopoverBody>
            <PopoverFooter
              border='0'
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              pb={4}
            >
              {/* <Box fontSize='sm'>Step 2 of 4</Box>
              <ButtonGroup size='sm'>
                <Button colorScheme='green'>Setup Email</Button>
                <Button colorScheme='blue' ref={initialFocusRef}>
                  Next
                </Button>
              </ButtonGroup> */}
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}

export default Layout