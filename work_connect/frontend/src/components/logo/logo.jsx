import React from 'react';
import styled from 'styled-components';

const StyledH3 = styled.h3`
  margin-top: 24px;
  margin-bottom: 24px;
  margin-left: 20px;
  margin-right: 20px;
`;

const Logo = () => (
  <StyledH3>
    <span style={{ color: '#4285f4' }}>W</span>ork&<span style={{ color: '#4285f4' }}>C</span>
    onnect
  </StyledH3>
);

export default Logo;
