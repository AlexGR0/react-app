import React, { useState, useEffect } from 'react';

interface CommonIconProps {
  type?: string;
  src?: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const CommonIcon: React.FC<CommonIconProps> = (props) => {
  const { type, src, size = 16, style = {}, color = '#333', onClick } = props;
  if (src) {
    return (
      <img src={src} alt="icon" style={{ width: size, height: size, ...style }} onClick={onClick} />
    );
  } else if (type) {
    return (
      <i
        className={`iconfont ${type}`}
        style={{ fontSize: size, color, ...style }}
        onClick={onClick}
      ></i>
    );
  } else {
    return null;
  }
};

export default CommonIcon;
