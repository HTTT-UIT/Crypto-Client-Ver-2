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
      src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
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
