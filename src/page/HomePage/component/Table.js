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
} from '@chakra-ui/react'

import { Line } from '@ant-design/charts';
import TinyLineCS from './TinyLine';
import CardInHeader from './CardInHeader';

const TableCS = () => {
  return (
    <TableContainer>
      <Table variant='striped' colorScheme='gray' size={"sm"}>
        <TableCaption>SCG - Thị trường tiền ảo thế giới</TableCaption>
        <Thead>
          <Tr>
            <Th width={20}>#</Th>
            <Th width={100}>Tiền ảo</Th>
            <Th isNumeric width={50}>Giá</Th>
            <Th>1h %</Th>
            <Th>24h %</Th>
            <Th>7d %</Th>
            <Th>Vốn hóa</Th>
            <Th>Tổng số khai thác</Th>
            <Th width={200}>7 ngày gần nhất</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>a</Td>
            <Td isNumeric>25.4</Td>
            <Td>a</Td>
            <Td>a</Td>
            <Td>a</Td>
            <Td>a</Td>
            <Td>a</Td>
            <Td>
              <TinyLineCS />
            </Td>
          </Tr>
          <Tr>
            <Td>2</Td>
            <Td>a</Td>
            <Td isNumeric>25.4</Td>
            <Td>a</Td>
            <Td>a</Td>
            <Td>a</Td>
            <Td>a</Td>
            <Td>a</Td>
            <Td>
              <TinyLineCS />
            </Td>
          </Tr>
          <Tr>
            <CardInHeader />
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>#</Th>
            <Th>Tiền ảo</Th>
            <Th isNumeric>Giá</Th>
            <Th>1h %</Th>
            <Th>24h %</Th>
            <Th>7d %</Th>
            <Th>Vốn hóa</Th>
            <Th>Tổng số khai thác</Th>
            <Th>7 ngày gần nhất</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}

export default TableCS