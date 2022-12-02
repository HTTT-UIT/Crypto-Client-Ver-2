import React, { useState, useEffect, memo } from 'react';
import ReactDOM from 'react-dom';
import { Area } from '@ant-design/plots';

const changeUSD = (money) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(Number.parseFloat(money).toFixed(2))
}

const ChartDetail = ({item}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    let date = new Date()
    const end = date.getTime()
    date = new Date(`${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)}`)
    const start = date.getTime()
    console.log(start, ' ', end)
    fetch(`https://api.coincap.io/v2/assets/${item.id}/history?interval=m5&start=${start}&end=${end}`)
      .then((response) => response.json())
      .then((json) => {
        let data = json.data
        data.map((item, index) => {
          data[index].priceUsd = Number.parseFloat(data[index].priceUsd)
          const date = new Date(data[index].date)
          // data[index].date =  `${`0${date.getDate()}`.slice(-2)}-${`0${date.getMonth() + 1}`.slice(-2)}-${date.getFullYear()}`
          data[index].date =  `${`0${date.getHours()}`.slice(-2)}-${`0${date.getMinutes()}`.slice(-2)}`
        })
        setData(data)
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  
  const config = {
    data,
    xField: 'date',
    yField: 'priceUsd',
    xAxis: {
      range: [0, 1],
      tickCount: 7,
    },
    yAxis: {
      range: [0, 1],
      tickCount: 1
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
    },
  };

  return <Area {...config} />;
};

export default memo(ChartDetail)

// [
//   {
//     "Date": "2010-01",
//     "scales": 1998
//   },
// ]