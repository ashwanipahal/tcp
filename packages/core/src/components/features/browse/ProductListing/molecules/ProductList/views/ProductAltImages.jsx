/**
 * @module ProductAltImages
 *
 * @author Agu
 */
import React from 'react';
import { PropTypes } from 'prop-types';
import { isClient, getLocator, getVideoUrl } from '@tcp/core/src/utils';
import { getProductListToPath } from '../utils/productsCommonUtils';
// import cssClassName from '../utils/cssClassName';
import styles, { imageAnchorInheritedStyles } from '../styles/ProductAltImages.style';
import { Anchor, DamImage } from '../../../../../../common/atoms';
import withStyles from '../../../../../../common/hoc/withStyles';
import OutOfStockWaterMark from '../../../../ProductDetail/molecules/OutOfStockWaterMark';

class ProductAltImages extends React.PureComponent {
  nodes = {};

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
    className: PropTypes.string.isRequired,
    keepAlive: PropTypes.bool.isRequired,
    isSoldOut: PropTypes.bool,
    soldOutLabel: PropTypes.string,
    isProductBrandOfSameDomain: PropTypes.bool,
  };

  static defaultProps = {
    onImageChange: () => {},
    analyticsData: {},
    videoUrl: PropTypes.string,
    isShowVideoOnPlp: PropTypes.bool,
    isSoldOut: false,
    soldOutLabel: '',
    isProductBrandOfSameDomain: true,
  };

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

  // onVideoError = () => this.setState({ videoError: true });

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

  // For now we are not showing videos on Product Tile
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
      isProductBrandOfSameDomain,
    } = this.props;
    const { currentIndex, videoHeight } = this.state;
    const unbxdData = analyticsData || {};

    const pdpToPath = isProductBrandOfSameDomain ? getProductListToPath(pdpUrl) : pdpUrl;
    return isMobile ? (
      <figure
        // eslint-disable-next-line no-return-assign
        ref={node => (this.nodes[productName] = node)}
        className={className}
        itemScope
        itemType="http://schema.org/ImageObject"
      >
        <Anchor
          handleLinkClick={e => this.productLink(loadedProductCount, pdpUrl, e)}
          to={pdpToPath}
          asPath={pdpUrl}
          title={productName}
          unbxdattr="product"
          unbxdparam_sku={unbxdData && unbxdData.pId}
          unbxdparam_prank={unbxdData && unbxdData.prank}
          inheritedStyles={imageAnchorInheritedStyles}
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
            // onError={this.onVideoError}
          />
        </Anchor>
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
        <Anchor
          handleLinkClick={e => this.productLink(loadedProductCount, pdpUrl, e)}
          to={pdpToPath}
          asPath={pdpUrl}
          title={productName}
          unbxdattr="product"
          unbxdparam_sku={unbxdData && unbxdData.pId}
          unbxdparam_prank={unbxdData && unbxdData.prank}
          inheritedStyles={imageAnchorInheritedStyles}
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
                // onError={this.onVideoError}
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
        </Anchor>
        <button type="button" className="button-next" onClick={this.handledNextImage}>
          next
        </button>
      </figure>
    );
  }

  renderSoldOutSection = () => {
    const { isSoldOut, keepAlive, soldOutLabel } = this.props;
    return isSoldOut || keepAlive ? <OutOfStockWaterMark label={soldOutLabel} /> : null;
  };

  renderDamImage() {
    const { imageUrls, productName } = this.props;
    const { currentIndex } = this.state;
    const imgData = {
      alt: productName,
      url: imageUrls[currentIndex],
    };
    return (
      <>
        <DamImage
          className="loadImage"
          dataLocator={getLocator('global_productimg_imagelink')}
          imgData={imgData}
          isProductImage
          lazyLoad={false}
        />
        {this.renderSoldOutSection()}
      </>
    );
  }

  renderDamWrapper(isVideoUrl) {
    const {
      pdpUrl,
      productName,
      loadedProductCount,
      analyticsData,
      isProductBrandOfSameDomain,
    } = this.props;
    const unbxdData = analyticsData || {};

    const pdpToPath = isProductBrandOfSameDomain ? getProductListToPath(pdpUrl) : pdpUrl;

    return isVideoUrl ? (
      <div className="video-container">{this.renderDamImage()}</div>
    ) : (
      <Anchor
        handleLinkClick={e => this.productLink(loadedProductCount, pdpUrl, e)}
        to={pdpToPath}
        asPath={pdpUrl}
        title={productName}
        unbxdattr="product"
        unbxdparam_sku={unbxdData && unbxdData.pId}
        unbxdparam_prank={unbxdData && unbxdData.prank}
        inheritedStyles={imageAnchorInheritedStyles}
      >
        {this.renderDamImage()}
      </Anchor>
    );
  }

  renderImageContent() {
    const { imageUrls, productName, className } = this.props;
    const { currentIndex } = this.state;

    const isVideoUrl = getVideoUrl(imageUrls[currentIndex]);
    return imageUrls.length < 2 ? (
      <figure
        className="product-image-container"
        itemScope
        itemType="http://schema.org/ImageObject"
      >
        {this.renderDamWrapper(isVideoUrl)}
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
        {this.renderDamWrapper(isVideoUrl)}
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

  // We are rendering only Images content
  render() {
    return this.renderImageContent();
  }
}

export default withStyles(ProductAltImages, styles);

export { ProductAltImages as ProductAltImagesVanilla };
