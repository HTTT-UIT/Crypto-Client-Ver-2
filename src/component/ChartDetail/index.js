import React, { useState, useEffect, memo } from 'react';
import ReactDOM from 'react-dom';
import { Area } from '@ant-design/plots';

const ChartDetail = ({item}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(`https://api.coincap.io/v2/assets/${item.id}/history?interval=m30 `)
      .then((response) => response.json())
      .then((json) => setData(json.data))
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
      tickCount: 5,
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