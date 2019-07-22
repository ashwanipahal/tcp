import React from 'react';
import { PropTypes } from 'prop-types';

import withStyles from '../../../hoc/withStyles';
import styles from '../Image.style';

const Image = props => {
  const {
    className,
    src,
    srcset,
    sizes,
    placeholderSrc,
    alt,
    inheritedStyles,
    ref,
    url,
    ...other
  } = props;
  return (
    <img
      className={className}
      src={src || url}
      srcSet={srcset}
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
};

Image.propTypes = {
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  srcset: PropTypes.string,
  sizes: PropTypes.string,
  placeholderSrc: PropTypes.string,
  alt: PropTypes.string.isRequired,
  inheritedStyles: PropTypes.string,
  ref: PropTypes.func,
  url: PropTypes.string,
};

Image.defaultProps = {
  srcset: '',
  sizes: '',
  placeholderSrc: '',
  inheritedStyles: '',
  ref: () => {},
  url: '',
};

export default withStyles(Image, styles);
export { Image as ImageVanilla };
