import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

const RedeemButton = styled(Button)`
  margin: 20px 0px 0px 0px;
  background: #f23b69;
  border-color: #f23b69;
  &:hover {
    background: #000;
    border-color: #000;
    color: #f23b69;
    border: solid 2px;
  }
`;
