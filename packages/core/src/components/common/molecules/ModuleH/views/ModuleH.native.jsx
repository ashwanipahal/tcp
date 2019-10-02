import React from 'react';
import PropTypes from 'prop-types';

import { DamImage, BodyCopy, Heading, Anchor } from '../../../atoms';
import { getLocator, getScreenWidth, getPixelRatio } from '../../../../../utils/index.native';
import { Carousel } from '../..';
import config from '../config';
import { HeaderWrapper, LinksWrapper, Wrapper } from '../ModuleH.style.native';

/**
 * Module height and width.
 * Height is fixed for mobile
 * Width can vary as per device width.
 */
const MODULE_HEIGHT = config.MODULE_STYLE.height;
const MODULE_WIDTH = getScreenWidth();
const MODULE_DIRECTION = true;

/**
 * TODO: To manage the PixelRatio .
 */
const devicePixelRatio = getPixelRatio();

/**
 * @class ModuleH - global reusable component will provide featured content module
 * with a composite background image and 2-6 CTAs.
 * This component is plug and play at any given slot in layout by passing required data.
 * @param {Object} composites the list of data for header texts, links and images for component.
 */
class ModuleH extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
    this.renderItem = this.renderItem.bind(this);
    this.renderLinks = this.renderLinks.bind(this);
    this.updateCurrentIndex = this.updateCurrentIndex.bind(this);
  }

  /**
   * @function renderItem : renders module H Images.
   * @param {Object} item : Single image object.
   * @return {Node} : Returns Image element.
   */
  renderItem = ({ item, index }) => {
    const { image } = item;
    return (
      <DamImage
        key={index.toString()}
        crop={image.crop_m}
        url={image.url}
        testID={`${getLocator('moduleH_composite_image')}${index + 1}`}
        height={MODULE_HEIGHT}
        width={MODULE_WIDTH}
        alt={image.alt}
        imgConfig={config.IMG_DATA.imgConfig[0]}
      />
    );
  };

  /**
   * @function renderLinks : renders module H links.
   * @param {[Object]} linksData : Moudle links data.
   * @return {Node} : Returns link element.
   */
  renderLinks = (linksData, navigation) => {
    const { currentIndex } = this.state;
    return linksData.map((item, index) => {
      const { link, styled } = item;
      let customStyle = { opacity: 0.8, marginTop: 16 };
      if (currentIndex === index) {
        customStyle = { opacity: 1, marginTop: 16 };
      }
      return (
        <Anchor url={link.url} navigation={navigation}>
          <BodyCopy
            key={index.toString()}
            mobilefontFamily="secondary"
            fontSize="fs22"
            textAlign="left"
            color="white"
            fontWeight={currentIndex === index ? 'black' : null}
            text={styled.text}
            style={customStyle}
            testID={`${getLocator('moduleH_cta_links')}${index + 1}`}
          />
        </Anchor>
      );
    });
  };

  updateCurrentIndex = index => {
    this.setState({ currentIndex: index });
  };

  /**
   * @function render : renders module H .
   */
  render() {
    const { navigation, divCTALinks, headerText: [{ link, textItems }] = {} } = this.props;
    let HeadingFontSize = 'fs36';
    const headerLines = textItems.length;
    if (devicePixelRatio === 'xxxhdpi' || devicePixelRatio === 'xhdpi') {
      HeadingFontSize = 'fs32';
    }
    return (
      <Wrapper>
        <HeaderWrapper>
          {textItems &&
            textItems.map((textLine, index) => {
              return link ? (
                <Anchor key={index.toString()} url={link.url} navigation={navigation}>
                  <Heading
                    fontFamily="primary"
                    fontSize={HeadingFontSize}
                    letterSpacing="ls167"
                    textAlign="left"
                    color="white"
                    fontWeight="black"
                    text={textLine.text}
                    testID={`${getLocator('moduleH_header_text')}${index + 1}`}
                  />
                </Anchor>
              ) : (
                <Heading
                  key={index.toString()}
                  fontFamily="primary"
                  fontSize={HeadingFontSize}
                  letterSpacing="ls167"
                  textAlign="left"
                  color="white"
                  fontWeight="black"
                  text={textLine.text}
                  testID={`${getLocator('moduleH_header_text')}${index + 1}`}
                />
              );
            })}
        </HeaderWrapper>
        {divCTALinks && (
          <Carousel
            onSnapToItem={this.updateCurrentIndex}
            data={divCTALinks}
            renderItem={this.renderItem}
            height={MODULE_HEIGHT}
            width={MODULE_WIDTH}
            vertical={MODULE_DIRECTION}
            carouselConfig={{
              autoplay: true,
              dataLocatorPlay: getLocator('moduleH_play_button'),
              dataLocatorPause: getLocator('moduleH_pause_button'),
            }}
          />
        )}
        {divCTALinks ? (
          <LinksWrapper lines={headerLines}>
            {this.renderLinks(divCTALinks, navigation)}
          </LinksWrapper>
        ) : null}
      </Wrapper>
    );
  }
}

ModuleH.propTypes = {
  headerText: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.array,
    })
  ).isRequired,
  divCTALinks: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      image: PropTypes.object,
      styled: PropTypes.object,
    })
  ).isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

export default ModuleH;
