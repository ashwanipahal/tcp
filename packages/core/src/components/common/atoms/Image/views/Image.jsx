import React from 'react';
import { PropTypes } from 'prop-types';
import Anchor from '../../Anchor';
import withStyles from '../../../hoc/withStyles';
import styles from '../Image.style';
import { configureInternalNavigationFromCMSUrl, isMobileWeb, isClient } from '../../../../../utils';

const renderImage = imageProps => {
  const {
    className,
    src,
    url,
    srcset,
    sizes,
    alt,
    ref,
    placeholderSrc,
    dataLocator,
    role,
    onLoad,
    ...other
  } = imageProps;

  const setRole = isClient() && isMobileWeb() && src && src.toLowerCase().includes('.svg');
  return (
    <img
      data-locator={dataLocator}
      className={className}
      src={src || url}
      srcSet={srcset}
      sizes={sizes || null}
      alt={alt}
      ref={ref}
      role={setRole ? role : null}
      {...other}
      onLoad={onLoad}
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

const Image = props => {
  const {
    link,
    className,
    src,
    url,
    srcset,
    sizes,
    alt,
    ref,
    placeholderSrc,
    onLoad,
    ...others
  } = props;

  const imageProps = {
    className,
    src,
    url,
    srcset,
    sizes,
    alt,
    ref,
    placeholderSrc,
    onLoad,
    ...others,
  };

  if (!link) {
    return renderImage(imageProps);
  }

  const { url: ctaUrl, target, title, actualUrl, className: ctaClassName } = link;

  let to = actualUrl;
  if (!actualUrl) {
    to = configureInternalNavigationFromCMSUrl(ctaUrl);
  }

  return (
    <Anchor
      className={ctaClassName}
      to={to}
      asPath={ctaUrl}
      target={target}
      title={title}
      dataLocator="image-link"
    >
      {renderImage(imageProps)}
    </Anchor>
  );
};

Image.propTypes = {
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  srcset: PropTypes.string,
  sizes: PropTypes.string,
  placeholderSrc: PropTypes.string,
  ref: PropTypes.func,
  url: PropTypes.string,
  role: PropTypes.string,
  onLoad: PropTypes.func,
};

Image.defaultProps = {
  srcset: '',
  sizes: '',
  placeholderSrc: '',
  // TODO: Update this so that ref is not a prop. Use forwardRef() for this.
  ref: () => {},
  url: '',
  link: null,
  role: 'img',
  onLoad() {},
};

export default withStyles(Image, styles);
export { Image as ImageVanilla };
