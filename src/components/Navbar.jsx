import React from 'react'
import {Stack, Typography} from '@mui/material';
const Navbar = ({text}) => {
  return (
    <Stack
    direction="row"
    alignItems="center"
    p={2}
    sx={{
      position:  "sticky",
      background: '#fff',
      top: 0,
      justifyContent: "space-between",
      borderBottom: "3px solid #19b394",
      }}>

    <Typography variant='h4' color={'#19b394'}>{text}</Typography>
  </Stack>
  )
}

export default Navbar