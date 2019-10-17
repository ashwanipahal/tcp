import React from 'react';
import LazyLoad from 'vanilla-lazyload';
import { PropTypes } from 'prop-types';
import { isClient, getIconPath } from '../../../../../utils/index';
import lazyloadConfig from '../LazyImage.config';
import { ELEMENTS_CLASS } from '../LazyImage.constants';

// Only initialize it one time on client side for the entire application
if (isClient() && !document.lazyLoadInstance) {
  document.lazyLoadInstance = new LazyLoad(lazyloadConfig);
}

const placeHolderImg = getIconPath('img-placeholder');
export class LazyImage extends React.Component {
  constructor() {
    super();
    this.state = { isImgLoaded: false };
    this.setImgLoaded = this.setImgLoaded.bind(this);
  }

  // Update lazyLoad after first rendering of every image
  componentDidMount() {
    document.lazyLoadInstance.update();
  }

  // Update lazyLoad after rerendering of every image
  componentDidUpdate() {
    document.lazyLoadInstance.update();
  }

  setImgLoaded() {
    this.setState({ isImgLoaded: true });
  }

  // Just render the image with data-src
  render() {
    const { isImgLoaded } = this.state;
    const { alt, src, srcset, sizes, className, placeholderClass, ...otherProps } = this.props;
    return (
      <img
        alt={alt}
        className={`${ELEMENTS_CLASS} ${className} ${!isImgLoaded ? placeholderClass : ''}`}
        src={placeHolderImg}
        data-src={src}
        data-srcset={srcset}
        data-sizes={sizes}
        onLoad={this.setImgLoaded}
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
  placeholderClass: PropTypes.string.isRequired,
};

LazyImage.defaultProps = {
  srcset: '',
  sizes: '',
  className: '',
};

export default LazyImage;
