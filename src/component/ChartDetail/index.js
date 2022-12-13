import React, { useState, useEffect, memo, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Area } from '@ant-design/plots';

const changeUSD = (money) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(Number.parseFloat(money).toFixed(0))
}

const ChartDetail = ({item, filter}) => {
  const [data, setData] = useState([]);

  const getInterval = () => {
    switch (filter) {
      case "day":
        var date = new Date()
        var end = date.getTime()
        // date = new Date(`${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)}`)
        date = new Date(`${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)} 0:00:00`)
        var start = date.getTime()
        return {
          interval: "m1",
          start,
          end
        }
        case "week":
          // date = new Date()
          // end = date.getTime()
          // if (date.getDay() > 0) {
          //   date.setDate(date.getDate() + 1 - date.getDay())
          // } else {
          //   date.setDate(date.getDate() - 6)
          // }
          // date = new Date(`${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)}`)
          // start = date.getTime()
          date = new Date()
          end = date.getTime()
          date.setDate(date.getDate() - 7)
          date = new Date(`${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)} 0:00:00`)
          start = date.getTime()
          return {
            interval: "d1",
            start,
            end
          }
        case "month":
          // date = new Date()
          // end = date.getTime()
          // date.setDate(1 - date.getDate())
          // date = new Date(`${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)}`)
          // start = date.getTime()
          date = new Date()
          end = date.getTime()
          date.setDate(date.getDate() - 30)
          date = new Date(`${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)} 0:00:00`)
          start = date.getTime()
          return {
            interval: "d1",
            start,
            end
          }
        case "year":
          date = new Date()
          end = date.getTime()
          date = new Date(`${date.getFullYear()}-01-01 0:00:00`)
          start = date.getTime()
          return {
            interval: "d1",
            start,
            end
          }
        case "year2":
          date = new Date()
          end = date.getTime()
          date = new Date(`${Number.parseInt(date.getFullYear()) - 1}-01-01 0:00:00`)
          start = date.getTime()
          return {
            interval: "d1",
            start,
            end
          }
      default:
        return "d1"
    }
  }

  const asyncFetch = () => {
    fetch(`https://api.coincap.io/v2/assets/${item.id}/history?interval=${getInterval().interval}&start=${getInterval().start}&end=${getInterval().end}`)
      .then((response) => response.json())
      .then((json) => {
        let data = json.data
        data.map((item, index) => {
          data[index].priceUsd = Number.parseFloat(data[index].priceUsd)
          const date = new Date(data[index].date)
          // data[index].date =  `${`0${date.getDate()}`.slice(-2)}-${`0${date.getMonth() + 1}`.slice(-2)}-${date.getFullYear()}`
          if (filter === "day")
            data[index].date =  `${`0${date.getHours()}`.slice(-2)}h${`0${date.getMinutes()}`.slice(-2)}'`
          else {
            data[index].date =  `${`0${date.getDate()}`.slice(-2)}-${`0${date.getMonth() + 1}`.slice(-2)}-${date.getFullYear()}`
          }
        })
        setData(data)
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  let intervalRef = useRef()
  useEffect(() => {
    clearInterval(intervalRef.current)
    asyncFetch();
    intervalRef.current = setInterval(() => {
      asyncFetch();
    }, 5000)
    console.log(filter)
  }, [filter]);
  
  const config = {
    data,
    xField: 'date',
    yField: 'priceUsd',
    meta: {
      y: {
        tick: (value, index) => index
      }
    },
    xAxis: {
      range: [0, 1],
      tickCount: 10,

    },
    yAxis: {
      range: [0, 1],
      tickCount: 20,
      label: {
        autoHide: true,
        formatter: (v) => changeUSD(v),
      
      },
    },
    // forceFit: true,
    tooltip: {
      formatter: (datum) => {
        return { name: "Giá", value: changeUSD(datum.priceUsd)};
      },
    },
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
    },
    animation: false
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