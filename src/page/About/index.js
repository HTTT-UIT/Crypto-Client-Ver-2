import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import UserCard from "./component/UserCard"

const AboutPage = () => {
  return (
    <Flex p="12" textAlign={"center"} flexDirection="column" alignItems={"center"}>
      <Heading as="h1" fontSize="2xl">SE COIN GROUP</Heading>
      <Text as="p" align={"center"} fontSize="xl"  mt="5" fontWeight={"600"}>
      Đề tài <br/>
      Xây dựng website theo dõi thị trường tiền ảo có tích hợp chatbot <br/>
      </Text>
      <Text as="p" align={"center"} fontSize="xl"  mt="5" fontWeight={"700"}>
      GVHD: Thầy Tạ Việt Phương
      </Text>
      <Flex mt="4">
        <UserCard role={"Front end"} name={"Huỳnh Quang Trung"} brand={"SE2019"} image={"https://scontent.fsgn13-4.fna.fbcdn.net/v/t1.15752-9/309224763_545663054033883_9109837839235533733_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_ohc=IHC9clTknCQAX-DgypM&tn=LRkstFoZfjoez9k5&_nc_ht=scontent.fsgn13-4.fna&oh=03_AdSMwxwAH32Xe7FOwEkciMGl9OD9Ru_foa9xMNFMIiXcsA&oe=63C6CD8E"}/>
        <UserCard role={"Front end"} name={"Dương Hoài Nam"} brand={"SE2019"} image={"https://scontent.fsgn13-4.fna.fbcdn.net/v/t1.15752-9/310058875_669456241263346_4671965779227893317_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_ohc=xsGJU4k9Z3YAX97kIMX&_nc_ht=scontent.fsgn13-4.fna&oh=03_AdTehH22_qk2djHKZefr4ImhTqEDg-N0LAmzULzaHB3Fdg&oe=63C6C190"} />
        <UserCard role={"Front end"} name={"Lê Hoàng Phú"} brand={"SE2019"} image={"https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.6435-9/84527456_533090324000129_6652491818485153792_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_aid=0&_nc_ohc=eNPvMYQytDMAX-GlsEI&_nc_ht=scontent.fsgn4-1.fna&oh=00_AfDPX0RdVonXYSijvWjrcKap5052-ev16WC24qBayuU_nQ&oe=63C6D9C9"} />
        <UserCard role={"Back end"} name={"Đỗ Văn Bảo"} brand={"SE2019"} image={"https://scontent.fsgn8-2.fna.fbcdn.net/v/t1.6435-9/67647122_2189599164665664_5123339858877612032_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=cExXfGWfdiMAX-2YPli&tn=LRkstFoZfjoez9k5&_nc_ht=scontent.fsgn8-2.fna&oh=00_AfDAjmhHuOZwAGW-eivGFRYPhSeekHAYis-lvlKI6mJZsg&oe=63C6E6D5"} />
        <UserCard role={"Back end"} name={"Đặng Anh Tú"} brand={"SE2019"} image={"https://scontent.fsgn13-2.fna.fbcdn.net/v/t1.15752-9/310642686_1821668028180327_2450116469369911158_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=iqdfsf2VUtgAX-yDbHv&_nc_ht=scontent.fsgn13-2.fna&oh=03_AdSxhp1gRYGphFKsartAQ0LfnxCCCZ43Davw7syepeH68Q&oe=63C6CE31"}/>
      </Flex>
      <Heading as="h1" fontSize="2xl">Lý do chọn đề tài</Heading>
      {/* <Box> */}
        <Text  maxW="80%" as="p" align={"justify"} lineHeight="7" mt="5" fontSize={"lg"}>
        Ngày nay, với xu hướng phát triển của xã hội, tiền điện tử dần đi vào cuộc sống của mỗi người chúng ta, đặc biệt với các nhà đầu tư công nghệ kỹ thuật số. Chính vì sự phát triển nhanh chóng của tiền điện tử, nhóm chúng em mong muốn tạo ra một trang web với mục tiêu chính là theo dõi thị trường, cũng như xây dựng một cộng đồng cùng nhau san sẻ kinh nghiệm về những loại tiền điện tử trên thị trường thế giới
        </Text>
      {/* </Box> */}
    </Flex>
  )
}

export default AboutPage