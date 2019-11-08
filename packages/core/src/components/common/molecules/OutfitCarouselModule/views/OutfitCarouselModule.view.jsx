import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import { Anchor, DamImage, BodyCopy } from '../../../atoms';
import styles from '../styles/OutfitCarouselModule.style';
import { getIconPath } from '../../../../../utils';
import theme from '../../../../../../styles/themes/TCP';
import Carousel from '../../Carousel';

const { breakpoints } = theme;

const CAROUSEL_OPTIONS = {
  autoplay: false,
  arrows: true,
  centerMode: false,
  fade: false,
  speed: 1000,
  lazyLoad: false,
  dots: false,
  swipe: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: false,
  responsive: [
    {
      breakpoint: parseInt(breakpoints.medium, 10) - 1,
      settings: {
        slidesToShow: 2,
        arrows: true,
        swipeToSlide: true,
      },
    },
    {
      breakpoint: parseInt(breakpoints.large, 10) - 1,
      settings: {
        slidesToShow: 4,
        arrows: true,
        swipeToSlide: true,
      },
    },
  ],
};

export class OutfitCarouselModule extends PureComponent {
  static propTypes = {
    outfitModule: PropTypes.shape({}),
    className: PropTypes.string,
  };

  static defaultProps = {
    outfitModule: {},
    className: '',
  };

  render() {
    const { outfitModule, className } = this.props;
    return (
      <div className={className}>
        <BodyCopy fontSize={['fs16', 'fs16', 'fs28']} fontWeight="black" className="heading">
          {outfitModule.headLine[0].text}
        </BodyCopy>
        <BodyCopy fontSize={['fs15', 'fs15', 'fs22']} fontWeight="regular" className="subheading">
          {outfitModule.subHeadLine[0].text}
        </BodyCopy>
        <Carousel
          options={CAROUSEL_OPTIONS}
          carouselConfig={{
            autoplay: false,
            customArrowLeft: getIconPath('carousel-big-carrot'),
            customArrowRight: getIconPath('carousel-big-carrot'),
          }}
        >
          {outfitModule.mediaLinkedList.map(({ image, link }, index) => {
            return (
              <div key={index.toString()}>
                <Anchor
                  className="image-link"
                  to={image.url}
                  asPath={image.url}
                  dataLocator="dummy-datalocator"
                >
                  <DamImage
                    className={`${className} carousel-image`}
                    imgData={{
                      alt: image.title,
                      url: image.url,
                    }}
                  />
                </Anchor>
                <Anchor
                  className="image-link"
                  to={link.url}
                  asPath={link.url}
                  fontSizeVariation="small"
                  dataLocator="dummy-datalocator"
                >
                  {`${link.text} >`}
                </Anchor>
              </div>
            );
          })}
          {outfitModule.mediaLinkedList.map(({ image, link }, index) => {
            return (
              <div key={index.toString()}>
                <Anchor
                  className="image-link"
                  to={image.url}
                  asPath={image.url}
                  dataLocator="dummy-datalocator"
                >
                  <DamImage
                    className={`${className} carousel-image`}
                    imgData={{
                      alt: image.title,
                      url: image.url,
                    }}
                  />
                </Anchor>
                <Anchor
                  className="image-link"
                  to={link.url}
                  asPath={link.url}
                  fontSizeVariation="small"
                  dataLocator="dummy-datalocator"
                >
                  {link.text}
                </Anchor>
              </div>
            );
          })}
        </Carousel>
      </div>
    );
  }
}

export default withStyles(OutfitCarouselModule, styles);
