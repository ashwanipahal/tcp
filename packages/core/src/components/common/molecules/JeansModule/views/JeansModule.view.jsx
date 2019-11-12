import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/JeansModule.style';
import { Carousel } from '../..';
import { Anchor, DamImage, BodyCopy, Image } from '../../../atoms';
import theme from '../../../../../../styles/themes/TCP';
import { getIconPath } from '../../../../../utils';

const { breakpoints } = theme;

const CAROUSEL_OPTIONS = {
  autoplay: false,
  arrows: true,
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
      },
    },
    {
      breakpoint: parseInt(breakpoints.large, 10) - 1,
      settings: {
        slidesToShow: 4.25,
        arrows: false,
        swipeToSlide: true,
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
        <div className="title-section">
          <BodyCopy
            fontSize="fs20"
            fontWeight="semibold"
            fontFamily="secondary"
            color="white"
            textAlign="center"
          >
            {jeansModule.headLine[0].text}
          </BodyCopy>
        </div>
        <Carousel
          className="carousel-item"
          options={CAROUSEL_OPTIONS}
          carouselConfig={{
            autoplay: false,
            customArrowLeft: getIconPath('carousel-big-carrot'),
            customArrowRight: getIconPath('carousel-big-carrot'),
          }}
        >
          {jeansModule.imageTileWrapper.map(
            ({ imageStyled, headLine, subHeadLine, textList, singleCTAButton }, index) => {
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
                    <div className="overlapping-section">
                      <div className="text-container">
                        <BodyCopy
                          className="text-header"
                          textAlign="center"
                          fontSize="fs20"
                          fontWeight="black"
                        >
                          {headLine[0].text}
                        </BodyCopy>
                        <BodyCopy
                          className="text-subheader"
                          textAlign="center"
                          fontWeight="semibold"
                          fontSize="fs12"
                        >
                          {subHeadLine[0].text}
                        </BodyCopy>
                        {textList.map(textItem => {
                          return (
                            <div className="text-line">
                              <Image
                                className="done-button"
                                src="/static/images/confirmation_check.svg"
                              />
                              <BodyCopy
                                className="text-item"
                                fontSize="fs14"
                                fontWeight="extrabold"
                                textAlign="center"
                                fontFamily="secondary"
                              >
                                {textItem.text}
                              </BodyCopy>
                            </div>
                          );
                        })}
                        <Image
                          className={`${imageStyled[0].styled.style} plus-icon`}
                          src="/static/images/plus.png"
                        />
                      </div>
                      <Anchor
                        className="shop-now-link"
                        to={singleCTAButton.url}
                        asPath={singleCTAButton.url}
                        dataLocator="dummy-datalocator"
                      >
                        {singleCTAButton.text}
                      </Anchor>
                    </div>
                  </Anchor>
                </div>
              );
            }
          )}
        </Carousel>
      </div>
    );
  }
}

export { JeansModule as JeansModuleVanilla };
export default withStyles(JeansModule, styles);
