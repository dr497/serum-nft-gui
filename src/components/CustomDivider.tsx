import React from 'react';
import { Progress } from 'antd';

const CustomDivider = ({ fromColor, toColor, width }) => {
  return (
    <Progress
      strokeColor={{
        from: fromColor,
        to: toColor,
      }}
      percent={100}
      size="small"
      showInfo={false}
      style={{ width: width }}
    />
  );
};

export default CustomDivider;
