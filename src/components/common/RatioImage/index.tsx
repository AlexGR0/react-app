import React, { useEffect, useState } from 'react';
import styles from '@components/common/RatioImage/styles.module.scss';
import CommonIcon from '@components/common/CommonIcon';
import loadingImg from '@assets/images/loading.gif';
import errImg from '@assets/images/errImg.png';
import avatar from '@assets/images/avatar.png';

interface RatioImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  round?: boolean;
  style?: React.CSSProperties;
  ratio?: number; // 图片宽高比例
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  fallbackSrc?: string;
}

const RatioImage: React.FC<RatioImageProps> = (props) => {
  const {
    src = 'undefined',
    alt,
    width,
    height,
    style,
    round = false,
    ratio = 16 / 9,
    objectFit = 'cover',
    fallbackSrc,
  } = props;
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(ratio);

  useEffect(() => {
    round && setAspectRatio(1);
  }, [round]);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    if (target instanceof HTMLImageElement) {
      target.src = round ? avatar : fallbackSrc ? fallbackSrc : errImg;
    }
    setLoading(false);
  };

  return (
    <div
      className={`${styles['img-box']}`}
      style={{
        width: width ? `${width}px` : 'auto',
        height: height ? `${height}px` : 'auto',
        borderRadius: round ? '50%' : '',
        ...style,
      }}
    >
      {loading && (
        <div className={`${styles['tip-box']}`}>
          <CommonIcon src={loadingImg} size={20} />
        </div>
      )}
      {round ? (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{ aspectRatio, borderRadius: round ? '50%' : '', objectFit }}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{ aspectRatio, objectFit: hasError ? 'contain' : objectFit }}
        />
      )}
    </div>
  );
};

export default RatioImage;
