/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  InputGroup,
  InputRightElement,
  Checkbox,
  Spinner,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useJwt } from "../../jwt/jwt";
import * as yup from 'yup';
import { Form } from 'react-router-dom';
import { handleSuccess } from '../../component/SweetAlert';

export default function UserProfileEdit() {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const userId = useJwt().jwt.getUserData().primarysid
  const [data, setData] = useState({})
  const [date, setDate] = useState(new Date())
  const [checkChangePassword, setCheckChangePassword] = useState(false)
  const [fileS, setFileS] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  let schema = yup.object().shape({
    name: yup.string().required("Họ và tên không được bỏ trống"),
    email: yup.string().email("Email chưa đúng định dạng").required("Email không được bỏ trống"),
  })

  const fetchData = async () => {
    setIsLoading(true)
    const response = await useJwt().jwt.getUser({
      userId
    })
    setData(response.data)
    setIsLoading(false)
    console.log(response.data)
  }

  useEffect(() => {
    fetchData()
  }, [navigate])

  useEffect(() => {
    setDate(new Date(data.dob))
    // console.log(`${new Date(data.dob).getFullYear()}-${`0${new Date(data.dob).getMonth() + 1}`.slice(-2)}-${`0${new Date(data.dob).getDate()}`.slice(-2)}`)
  }, [data])

  const handleSubmit = async(e) => {
    e.preventDefault()
    const {target} = e
    const {name, email, date, password, file} = target

    let dataUser = {}
    if (checkChangePassword && password[1] !== undefined && password[1] !== null &&  password[1].value !== "") {
      dataUser = {
        userId,
        name: name.value,
        dob: new Date(date.value),
        password: password[1].value,
        role: data.dob
      }
    } else {
      dataUser = {
        userId,
        name: name.value,
        dob: new Date(date.value),
        role: data.dob
      }
    }
    
    console.log(dataUser)
    try {
      setIsLoading(true)
      await useJwt().jwt.updateUser(dataUser)
      if (fileS !== undefined && fileS !== null) {
        await useJwt().jwt.updateUserAvatar({
          userId,
          image: fileS
        })
      }
      setIsLoading(false)
      handleSuccess("Chỉnh sửa thành công", () => {
        fetchData()
      })
    } catch (error) {
      setIsLoading(false)
    }
    // console.log(name.value, email.value, date.value, password[1].value, file.files[0])
    console.log(file.files[0])
    
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Thông tin tài khoản 
          {
            isLoading && (
              <Spinner ms={14} />
            )
          }
        </Heading>
        <Form onSubmit={handleSubmit}>
          <FormControl id="avatar">
            <FormLabel>Ảnh đại diện</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src={(fileS !== undefined && fileS !== null) ? URL.createObjectURL(fileS) : data.profileImageUrl }>
                  {/* // 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'}> */}
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    icon={<SmallCloseIcon />}
                    onClick={() => setFileS([])}
                  />
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full">
                  Thay đổi ảnh
                  <Input
                      name="file"
                      type="file"
                      height="100%"
                      width="100%"
                      position="absolute"
                      top="0"
                      left="0"
                      opacity="0"
                      aria-hidden="true"
                      accept="image/*"
                      multiple={false}
                      // value={(fileS !== undefined && fileS !== null) ? [...fileS] : []}
                      onChange={e => setFileS(e.target.files[0])}
                  />
                </Button>
                
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="name" isRequired>
            <FormLabel>Họ và tên</FormLabel>
            <Input
              name='name'
              _placeholder={{ color: 'gray.500' }}
              type="text"
              defaultValue={data.name}
            />
          </FormControl>
          {
            false && (
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  name='email'
                  placeholder="email@example.com"
                  _placeholder={{ color: 'gray.500' }}
                  type="email"
                />
              </FormControl>
            )
          }
          <FormControl id="userName" isRequired>
            <FormLabel>Ngày sinh</FormLabel>
            <Input
              name='date'
              type="date"
              onChange={(e) => setDate(new Date(e.target.value))}
              value={`${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)}`}
            />
          </FormControl>
          <FormControl id="userName" isRequired>
            <FormLabel>Tên đăng nhập</FormLabel>
            <Input
              _placeholder={{ color: 'gray.500' }}
              type="text"
              defaultValue={data.userName}
              disabled
            />
          </FormControl>
          <FormControl id="password">
            <Flex alignItems={"center"} justify="space-between">
              <FormLabel>Mật khẩu</FormLabel>
              <Checkbox name='checkbox' onChange={(e) => setCheckChangePassword(e.target.checked)} value={checkChangePassword}>Thay đổi mật khẩu</Checkbox>
            </Flex>
            <InputGroup size='md'>
              <Input
                name='password'
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='******'
                isDisabled={!checkChangePassword}
              />
              <InputRightElement width='4.5rem' paddingRight={"5px"}>
                <Button h='1.75rem' size='sm' onClick={() => setShow(!show)} disabled={!checkChangePassword}>
                  {show ? 'Ẩn' : 'Hiển thị'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          {/* <FormControl id="confirmPassword" isRequired>
            <FormLabel>Xác nhận mật khẩu</FormLabel>
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
              />
              <InputRightElement width='4.5rem' paddingRight={"5px"}>
                <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                  {show ? 'Ẩn' : 'Hiển thị'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl> */}
          <Stack spacing={6} direction={['column', 'row']}>
            {/* <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}>
              Cancel
            </Button> */}
            <Button
              marginTop={"12px"}
              type='submit'
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}>
              Lưu lại
            </Button>
          </Stack>
        </Form>
      </Stack>
    </Flex>
  );
}