import { Box } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="not-found" style={{
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '24px'
  }}>
    <img
      src="https://itphutran.com/wp-content/uploads/2017/05/H%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-x%E1%BB%AD-l%C3%BD-chuy%E1%BB%83n-h%C6%B0%E1%BB%9Bng-khi-b%E1%BB%8B-l%E1%BB%97i-404-Page-Not-Found-trong-Java.jpg"
      alt="not-found"
      width="500px"
    />
    <Link to="/" className="link-home">
      <Box
        padding={"8px 24px"}
        backgroundColor={"black"}
        textColor={"white"}
        borderRadius={"20px"}
        marginTop={"12px"}>
        Trang chủ
      </Box>
    </Link>
  </div>
);

export default NotFound;
