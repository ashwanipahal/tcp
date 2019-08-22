/**
 * @module ProductAltImages
 *
 * @author Agu
 */
import React from 'react';
import { PropTypes } from 'prop-types';
import { isClient, getLocator } from '@tcp/core/src/utils';
import cssClassName from '../utils/cssClassName';
import styles, { imageAnchorInheritedStyles } from '../styles/ProductAltImages.style';
import { Anchor } from '../../../../../../common/atoms';
import withStyles from '../../../../../../common/hoc/withStyles';

class ProductAltImages extends React.PureComponent {
  static propTypes = {
    /** callback for when the shown image changes. Accepts: image index */
    onImageChange: PropTypes.func,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    productName: PropTypes.string.isRequired,
    pdpUrl: PropTypes.string.isRequired,
    analyticsData: PropTypes.shape({
      pId: PropTypes.string.isRequired,
      prank: PropTypes.string.isRequired,
      requestId: PropTypes.string.isRequired,
    }),
    videoUrl: PropTypes.string,
    isShowVideoOnPlp: PropTypes.bool,
    isMobile: PropTypes.bool.isRequired,
    loadedProductCount: PropTypes.number.isRequired,
    isPLPredesign: PropTypes.bool.isRequired,
    keepAlive: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
  };

  static defaultProps = {
    onImageChange: () => {},
    analyticsData: {},
    videoUrl: PropTypes.string,
    isShowVideoOnPlp: PropTypes.bool,
  };

  nodes = {};

  constructor(props, context) {
    super(props, context);

    this.state = {
      currentIndex: 0,
      videoHeight: '',
    };

    this.handledPrevImage = this.handledPrevImage.bind(this);
    this.handledNextImage = this.handledNextImage.bind(this);
    this.handlePrevImage = this.handlePrevImage.bind(this);
    this.handleNextImage = this.handleNextImage.bind(this);
  }

  componentDidMount() {
    const { videoUrl, isShowVideoOnPlp } = this.props;
    if (isShowVideoOnPlp && videoUrl) {
      const { productName } = this.props;
      const rect =
        this.nodes && this.nodes[productName] ? this.nodes[productName].getBoundingClientRect() : 0;
      this.setState({ videoHeight: rect.width });
    }
  }

  onVideoError = () => this.setState({ videoError: true });

  productLink = (loadedProductCount, pdpUrl, event) => {
    event.preventDefault();
    if (isClient()) {
      window.sessionStorage.setItem('LAST_PAGE_PATH', window.location.pathname);
      window.sessionStorage.setItem('LOADED_PRODUCT_COUNT', loadedProductCount);
      window.sessionStorage.setItem('SCROLL_POINT', window.pageYOffset);
      window.location = pdpUrl;
    }
  };

  handledNextImage() {
    const { currentIndex } = this.state;
    const { imageUrls, onImageChange } = this.props;
    let idx = currentIndex + 1;
    if (idx > imageUrls.length) {
      idx = 0;
    }
    this.setState({ currentIndex: idx });
    if (onImageChange) onImageChange(idx);
  }

  handledPrevImage() {
    const { currentIndex } = this.state;
    const { imageUrls, onImageChange } = this.props;
    let idx = currentIndex - 1;
    if (idx < 0) {
      idx += imageUrls.length + 1;
    }
    this.setState({ currentIndex: idx });
    if (onImageChange) onImageChange(idx);
  }

  handlePrevImage() {
    const { currentIndex } = this.state;
    const { imageUrls, onImageChange } = this.props;
    let idx = currentIndex - 1;
    if (idx < 0) {
      idx += imageUrls.length;
    }
    this.setState({ currentIndex: idx });
    if (onImageChange) onImageChange(idx);
  }

  handleNextImage() {
    const { currentIndex } = this.state;
    const { imageUrls, onImageChange } = this.props;
    const idx = (currentIndex + 1) % imageUrls.length;
    this.setState({ currentIndex: idx });
    if (onImageChange) onImageChange(idx);
  }

  renderVideoContent() {
    const {
      isMobile,
      videoUrl,
      imageUrls,
      pdpUrl,
      productName,
      loadedProductCount,
      analyticsData,
      isPLPredesign,
      className,
    } = this.props;
    const { currentIndex, videoHeight } = this.state;
    const unbxdData = analyticsData || {};
    return isMobile ? (
      <figure
        // eslint-disable-next-line no-return-assign
        ref={node => (this.nodes[productName] = node)}
        className={className}
        itemScope
        itemType="http://schema.org/ImageObject"
      >
        <a
          onClick={e => this.productLink(loadedProductCount, pdpUrl, e)}
          title={productName}
          unbxdattr="product"
          unbxdparam_sku={analyticsData && analyticsData.pId}
          unbxdparam_prank={analyticsData && analyticsData.prank}
          href={pdpUrl}
        >
          {/* <div style={{ position: 'absolute', height: '100%', width: '100%' }} /> */}
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            width="100%"
            height={videoHeight}
            onError={this.onVideoError}
          />
        </a>
      </figure>
    ) : (
      <figure
        // eslint-disable-next-line no-return-assign
        ref={node => (this.nodes[productName] = node)}
        className={className}
        itemScope
        itemType="http://schema.org/ImageObject"
      >
        <button type="button" className="button-prev" onClick={this.handledPrevImage}>
          prev
        </button>
        <a
          onClick={e => this.productLink(loadedProductCount, pdpUrl, e)}
          title={productName}
          unbxdattr="product"
          unbxdparam_sku={unbxdData.pId}
          unbxdparam_prank={unbxdData.prank}
          href={pdpUrl}
        >
          {currentIndex === 0 ? (
            <React.Fragment>
              {/* <div style={{ position: 'absolute', height: '100%', width: '100%' }} /> */}
              <video
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                width="100%"
                height={videoHeight}
                onError={this.onVideoError}
              />
            </React.Fragment>
          ) : (
            <img
              className="product-image-content img-item"
              src={imageUrls[currentIndex - 1]}
              srcSet={
                isPLPredesign
                  ? `${imageUrls[currentIndex - 1]}?w=200 1x, ${
                      imageUrls[currentIndex - 1]
                    }?w=300 1.5x, ${imageUrls[currentIndex - 1]}?w=400 2x`
                  : ''
              }
              alt={productName}
              itemProp="contentUrl"
            />
          )}
        </a>
        <button type="button" className="button-next" onClick={this.handledNextImage}>
          next
        </button>
      </figure>
    );
  }

  renderImageContent() {
    const {
      isMobile,
      keepAlive,
      imageUrls,
      pdpUrl,
      productName,
      loadedProductCount,
      analyticsData,
      isPLPredesign,
      className,
    } = this.props;
    const { currentIndex } = this.state;
    const unbxdData = analyticsData || {};
    const productImageCss = cssClassName('product-image-content', ' img-item');

    return isMobile || imageUrls.length < 2 ? (
      <figure
        className="product-image-container"
        itemScope
        itemType="http://schema.org/ImageObject"
      >
        <a
          className={keepAlive && 'out-of-stock-overlap'}
          onClick={e => this.productLink(loadedProductCount, pdpUrl, e)}
          title={productName}
          unbxdattr="product"
          unbxdparam_sku={unbxdData && unbxdData.pId}
          unbxdparam_prank={unbxdData && unbxdData.prank}
          href={pdpUrl}
        >
          <img
            className={productImageCss}
            src={imageUrls[0]}
            srcSet={
              isPLPredesign
                ? `${imageUrls[0]}?w=200 1x, ${imageUrls[0]}?w=300 1.5x, ${imageUrls[0]}?w=400 2x`
                : ''
            }
            alt={productName}
            itemProp="contentUrl"
          />
        </a>
      </figure>
    ) : (
      <figure
        // eslint-disable-next-line no-return-assign
        ref={node => (this.nodes[productName] = node)}
        className={className}
        itemScope
        itemType="http://schema.org/ImageObject"
      >
        <button
          data-locator={getLocator('global_imagecursors_arrows')}
          type="button"
          className="button-prev"
          onClick={this.handlePrevImage}
        >
          prev
        </button>

        <Anchor
          handleLinkClick={e => this.productLink(loadedProductCount, pdpUrl, e)}
          to={pdpUrl}
          title={productName}
          unbxdattr="product"
          unbxdparam_sku={unbxdData.pId}
          unbxdparam_prank={unbxdData.prank}
          inheritedStyles={imageAnchorInheritedStyles}
        >
          <img
            className={productImageCss}
            src={imageUrls[currentIndex]}
            data-locator={getLocator('global_productimg_imagelink')}
            srcSet={
              isPLPredesign
                ? `${imageUrls[currentIndex]}?w=200 1x, ${imageUrls[currentIndex]}?w=300 1.5x, ${
                    imageUrls[currentIndex]
                  }?w=400 2x`
                : ''
            }
            alt={productName}
            itemProp="contentUrl"
          />
        </Anchor>
        <button
          data-locator={getLocator('global_imagecursors_arrows')}
          type="button"
          className="button-next"
          onClick={this.handleNextImage}
        >
          next
        </button>
      </figure>
    );
  }

  render() {
    const { videoUrl, isShowVideoOnPlp, keepAlive } = this.props;
    const { videoError } = this.state;
    return isShowVideoOnPlp && videoUrl && !videoError && !keepAlive
      ? this.renderVideoContent()
      : this.renderImageContent();
  }
}

export default withStyles(ProductAltImages, styles);

export { ProductAltImages as ProductAltImagesVanilla };
