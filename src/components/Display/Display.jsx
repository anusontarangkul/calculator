import React from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Display = ({ displayValue }) => {
  return (
    <Container
      sx={{
        borderRadius: 5,
        marginTop: 4,
        height: 130,
        border: '4px solid #255585',
      }}
    >
      <Typography
        sx={{
          fontSize: 70,
          textAlign: 'right',
        }}
        data-testid='display'
      >
        {displayValue}
      </Typography>
    </Container>
  );
};

export default Display;
