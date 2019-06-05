import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

import styles from './Image.style';

const Image = ({
  className,
  src,
  srcset,
  sizes,
  placeholderSrc,
  alt,
  inheritedStyles,
  ref,
  ...other
}) => (
  <img
    className={className}
    src={src}
    srcSet={srcset || null}
    sizes={sizes || null}
    alt={alt}
    ref={ref}
    {...other}
    onError={
      placeholderSrc
        ? event => {
            // eslint-disable-next-line no-param-reassign
            event.target.src = placeholderSrc;
          }
        : null
    }
  />
);

Image.propTypes = {
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  srcset: PropTypes.string,
  sizes: PropTypes.string,
  placeholderSrc: PropTypes.string,
  alt: PropTypes.string.isRequired,
  inheritedStyles: PropTypes.string,
  ref: PropTypes.func,
};

Image.defaultProps = {
  srcset: '',
  sizes: '',
  placeholderSrc: '',
  inheritedStyles: '',
  ref: () => {},
};

export default styled(Image)`
  ${styles};
`;
export { Image as ImageVanilla };
