import React, { useState, useEffect } from 'react';

interface CommonIconProps {
  type?: string;
  src?: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

const CommonIcon: React.FC<CommonIconProps> = (props) => {
  const { type, src, size = 16, style = {}, color = '#333' } = props;
  if (src) {
    return <img src={src} alt="icon" style={{ width: size, height: size, ...style }} />;
  } else if (type) {
    return <i className={`iconfont ${type}`} style={{ fontSize: size, color, ...style }}></i>;
  } else {
    return null;
  }
};

export default CommonIcon;
