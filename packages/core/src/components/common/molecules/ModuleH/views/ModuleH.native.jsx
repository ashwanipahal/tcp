import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Anchor, Image } from '../../../atoms';
import { getLocator, getScreenWidth, UrlHandler } from '../../../../../utils/utils.native';
import { Carousel } from '../..';
import config from '../config';
import colors from '../../../../../../styles/themes/colors/common';
import fonts from '../../../../../../styles/themes/TCP/fonts';
import { Header, HeaderWrapper, LinksWrapper, Wrapper } from '../ModuleH.style.native';

// @flow
type Props = {
  divCTALinks: Array<Object>,
  headerText: Object,
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

/**
 * TODO: Link style has to be updated
 * as per gymboree styleguide in future.
 */
const linkStyle = {
  color: colors.white,
  fontSize: fonts.fontSize.body.bodytext.copy6,
  lineHeight: 20,
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
    this.getUrlWithCrop = this.getUrlWithCrop.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderLinks = this.renderLinks.bind(this);
    this.updateCurrentIndex = this.updateCurrentIndex.bind(this);
  }

  /**
   * @function getUrlWithCrop : prepare image src with crop details.
   * @param {String} url : Image url.
   * @return {String} function returns updated image url.
   */
  getUrlWithCrop = (url: String) => {
    return url.replace('upload/', `upload/c_fill,g_center,h_425,w_${getScreenWidth()}/`);
  };

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
        alt={image.alt}
        source={{ uri: this.getUrlWithCrop(image.url) }}
        data-locator={`${getLocator('moduleH_composite_image')}_${index + 1}`}
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
  renderLinks = linksData => {
    const { currentIndex } = this.state;
    const { maxLimit } = config.MODULE_H_CTALINKS;
    const lessThanSixLinkStyle = Object.assign({}, linkStyle, { marginTop: 38 });
    return linksData.map((item, index) => {
      const { link, styled } = item;
      return (
        <Anchor
          key={index.toString()}
          fontWeightVariation={currentIndex === index ? 'active' : null}
          data-locator={`${getLocator('moduleH_cta_links')}_${index + 1}`}
          onPress={() => {
            UrlHandler(link.url);
          }}
          style={linksData.length < maxLimit ? lessThanSixLinkStyle : linkStyle}
        >
          {styled.text}
        </Anchor>
      );
    });
  };

  updateCurrentIndex = index => {
    this.setState({ currentIndex: index });
  };

  render() {
    const { divCTALinks, headerText: { link, textLines } = {} } = this.props;

    return (
      <Wrapper>
        <HeaderWrapper>
          {textLines &&
            textLines.map((textLine, index) => {
              return link ? (
                <TouchableOpacity
                  key={index.toString()}
                  accessibilityRole="link"
                  onPress={() => UrlHandler(link.url)}
                >
                  <Header data-locator={`${getLocator('moduleH_header_text')}_${index + 1}`}>
                    {textLine.text}
                  </Header>
                </TouchableOpacity>
              ) : (
                <Header data-locator={getLocator('moduleH_header_text')}>{textLine.text}</Header>
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
            carouselConfig={{
              autoplay: true,
            }}
          />
        )}
        {divCTALinks ? <LinksWrapper>{this.renderLinks(divCTALinks)}</LinksWrapper> : null}
      </Wrapper>
    );
  }
}

export default ModuleH;
