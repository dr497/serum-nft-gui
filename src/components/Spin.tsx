import React from 'react';
import { Spin as SpinAntd } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;

const Spin = () => {
  return <SpinAntd indicator={antIcon} />;
};

export default Spin;
