import React from 'react';
import LazyLoad from 'vanilla-lazyload';
import { PropTypes } from 'prop-types';
import { isClient } from '../../../../../utils/index';
import lazyloadConfig from '../LazyImage.config';
import { ELEMENTS_CLASS } from '../LazyImage.constants';

// Only initialize it one time on client side for the entire application
if (isClient() && !document.lazyLoadInstance) {
  document.lazyLoadInstance = new LazyLoad(lazyloadConfig);
}

export class LazyImage extends React.Component {
  // Update lazyLoad after first rendering of every image
  componentDidMount() {
    document.lazyLoadInstance.update();
  }

  // Update lazyLoad after rerendering of every image
  componentDidUpdate() {
    document.lazyLoadInstance.update();
  }

  // Just render the image with data-src
  render() {
    const { alt, src, srcset, sizes, className, forwardedRef, ...otherProps } = this.props;
    return (
      <img
        alt={alt}
        className={`${ELEMENTS_CLASS} ${className}`}
        data-src={src}
        data-srcset={srcset}
        data-sizes={sizes}
        ref={forwardedRef}
        {...otherProps}
      />
    );
  }
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  srcset: PropTypes.string,
  sizes: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string.isRequired,
  // We need this because React.forwardRef doesn't work with class components
  forwardedRef: PropTypes.shape({ current: PropTypes.any }),
};

LazyImage.defaultProps = {
  srcset: '',
  sizes: '',
  className: '',
  forwardedRef: null,
};

export default LazyImage;
