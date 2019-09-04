import React from 'react';
import { Image, BodyCopy, Heading, Anchor } from '../../../atoms';
import { getLocator, getScreenWidth } from '../../../../../utils/index.native';
import { Carousel } from '../..';
import config from '../config';
import colors from '../../../../../../styles/themes/colors/common';
import fonts from '../../../../../../styles/themes/TCP/fonts';
import { HeaderWrapper, LinksWrapper, Wrapper } from '../ModuleH.style.native';

// @flow
type Props = {
  divCTALinks: Array<Object>,
  headerText: Object,
  navigation: Object,
};

type State = {
  currentIndex: Number,
};

/**
 * Module height and width.
 * Height is fixed for mobile
 * Width can vary as per device width.
 */
const MODULE_HEIGHT = config.MODULE_STYLE.height;
const MODULE_WIDTH = getScreenWidth();
const MODULE_DIRECTION = true;

/**
 * TODO: Link style has to be updated
 * as per gymboree styleguide in future.
 */
const linkStyle = {
  color: colors.white,
  fontSize: fonts.fontSize.body.bodytext.copy6,
  marginTop: 28,
};

/**
 * @class ModuleH - global reusable component will provide featured content module
 * with a composite background image and 2-6 CTAs.
 * This component is plug and play at any given slot in layout by passing required data.
 * @param {Object} composites the list of data for header texts, links and images for component.
 */
class ModuleH extends React.PureComponent<Props, State> {
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
      <Image
        key={index.toString()}
        crop={image.crop_m}
        url={image.url}
        testID={`${getLocator('moduleH_composite_image')}${index + 1}`}
        height={MODULE_HEIGHT}
        width={MODULE_WIDTH}
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
    const { maxLimit } = config.MODULE_H_CTALINKS;
    const lessThanSixLinkStyle = Object.assign({}, linkStyle, { marginTop: 38 });
    return linksData.map((item, index) => {
      const { link, styled } = item;
      return (
        <Anchor url={link.url} navigation={navigation}>
          <BodyCopy
            key={index.toString()}
            fontFamily="secondary"
            fontSize="fs20"
            letterSpacing="ls167"
            textAlign="left"
            color="white"
            fontWeight={currentIndex === index ? 'extrabold' : null}
            text={styled.text}
            style={linksData.length < maxLimit ? lessThanSixLinkStyle : linkStyle}
            testID={`${getLocator('moduleH_cta_links')}${index + 1}`}
          />
        </Anchor>
      );
    });
  };

  updateCurrentIndex = index => {
    this.setState({ currentIndex: index });
  };

  render() {
    const { navigation, divCTALinks, headerText: [{ link, textItems }] = {} } = this.props;
    return (
      <Wrapper>
        <HeaderWrapper>
          {textItems &&
            textItems.map((textLine, index) => {
              return link ? (
                <Anchor key={index.toString()} url={link.url} navigation={navigation}>
                  <Heading
                    fontFamily="primary"
                    fontSize="fs36"
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
                  fontFamily="primary"
                  fontSize="fs36"
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
          <LinksWrapper>{this.renderLinks(divCTALinks, navigation)}</LinksWrapper>
        ) : null}
      </Wrapper>
    );
  }
}

export default ModuleH;
