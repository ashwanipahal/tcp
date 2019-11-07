import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/JeansModule.style';
import { Carousel } from '../..';
import { Anchor, DamImage, BodyCopy } from '../../../atoms';
import theme from '../../../../../../styles/themes/TCP';
import { getIconPath } from '../../../../../utils';

const { breakpoints } = theme;

const CAROUSEL_OPTIONS = {
  autoplay: false,
  arrows: true,
  centerPadding: '16px',
  fade: false,
  speed: 1000,
  lazyLoad: false,
  dots: false,
  swipe: true,
  slidesToShow: 6,
  slidesToScroll: 1,
  infinite: false,
  responsive: [
    {
      breakpoint: parseInt(breakpoints.medium, 10) - 1,
      settings: {
        slidesToShow: 2.5,
        arrows: false,
        swipeToSlide: true,
        centerPadding: '18%',
      },
    },
    {
      breakpoint: parseInt(breakpoints.large, 10) - 1,
      settings: {
        slidesToShow: 4.25,
        arrows: true,
        swipeToSlide: true,
        centerPadding: '13%',
      },
    },
  ],
};

export class JeansModule extends PureComponent {
  static propTypes = {
    jeansModule: PropTypes.shape({}),
    className: PropTypes.string.isRequired,
  };

  static defaultProps = {
    jeansModule: {},
  };

  render() {
    const { jeansModule, className } = this.props;
    return (
      <div className={className}>
        <div className="title-section">{jeansModule.composites.headLine[0].text}</div>
        <Carousel
          options={CAROUSEL_OPTIONS}
          carouselConfig={{
            autoplay: false,
            customArrowLeft: getIconPath('carousel-big-carrot'),
            customArrowRight: getIconPath('carousel-big-carrot'),
          }}
        >
          {jeansModule.composites.imageTileWrapper.map(({ imageStyled }, index) => {
            return (
              <div className="jeans-carousel" key={index.toString()}>
                <Anchor
                  className="image-link"
                  to={imageStyled[0].image.alt}
                  asPath={imageStyled[0].image.url}
                  dataLocator="dummy-datalocator"
                >
                  <DamImage
                    className="carousel-image"
                    imgData={{
                      alt: imageStyled[0].image.alt,
                      url: imageStyled[0].image.url,
                    }}
                  />
                  <BodyCopy className="image-text" fontSize="fs12">
                    {imageStyled[0].styled.text}
                  </BodyCopy>
                </Anchor>
              </div>
            );
          })}
        </Carousel>
      </div>
    );
  }
}

export default withStyles(JeansModule, styles);
