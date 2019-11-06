import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/JeansModule.style';
import { Carousel } from '../..';
import { Anchor, DamImage } from '../../../atoms';
import theme from '../../../../../../styles/themes/TCP';
import { getIconPath } from '../../../../../utils';

const { breakpoints } = theme;

const CAROUSEL_OPTIONS = {
  autoplay: false,
  arrows: true,
  centerMode: false,
  centerPadding: '0px',
  fade: false,
  speed: 1000,
  lazyLoad: false,
  dots: false,
  swipe: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: parseInt(breakpoints.medium, 10) - 1,
      settings: {
        slidesToShow: 2,
        arrows: true,
        swipeToSlide: true,
        centerPadding: '18%',
      },
    },
    {
      breakpoint: parseInt(breakpoints.large, 10) - 1,
      settings: {
        slidesToShow: 4,
        arrows: true,
        swipeToSlide: true,
        centerPadding: '13%',
      },
    },
  ],
};

export class JeansModule extends PureComponent {
  static propTypes = {
    jeanModule: PropTypes.shape({}),
    className: PropTypes.string,
  };

  static defaultProps = {
    jeanModule: {},
    className: '',
  };

  render() {
    const { jeanModule, className } = this.props;
    return (
      <div className={className}>
        <Carousel
          options={CAROUSEL_OPTIONS}
          carouselConfig={{
            autoplay: false,
            customArrowLeft: getIconPath('carousel-big-carrot'),
            customArrowRight: getIconPath('carousel-big-carrot'),
          }}
        >
          {jeanModule.composites.imageTileWrapper.map(({ imageStyled, link }, index) => {
            return (
              <div key={index.toString()}>
                <Anchor
                  className="image-link"
                  to={imageStyled[0].url}
                  asPath={imageStyled[0].url}
                  dataLocator="dummy-datalocator"
                >
                  <DamImage
                    className={`${className} carousel-image`}
                    imgData={{
                      alt: imageStyled[0].title,
                      url: imageStyled[0].url,
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

export default withStyles(JeansModule, styles);
