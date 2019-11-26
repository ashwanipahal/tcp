import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Anchor, DamImage } from '../../../atoms';
import { getLocator } from '../../../../../utils';
import config from '../moduleT.config';
import PromoBanner from '../../PromoBanner';
import LinkText from '../../LinkText';
import ButtonList from '../../ButtonList';
import {
  Container,
  PromoContainer,
  HeaderContainer,
  ImageContainer,
  MessageContainer,
  Wrapper,
  ButtonContainer,
  ButtonLinksContainer,
  Border,
  ImageWrapper,
} from '../ModuleT.style.native';

// TODO: keys will be changed once we get the actual data from CMS
const { IMG_DATA, ctaTypes } = config;

/**
 * These are button width.
 */
const buttonWidth = 164;

/**
 * @param {object} props : Props for Module T multi type of banner list, button list, header text.
 * @desc This is Module T global component. It has capability to display
 * featured content module with links and a CTA Button list.
 * Author can surface teaser content leading to corresponding pages.
 */

// TODO: keys will be changed once we get the actual data from CMS

class ModuleT extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * This method return the ButtonList View according to the different variation .
   *  @ctaType are four types : 'imageCTAList' ,'stackedCTAList','scrollCTAList','linkCTAList'.
   *  @naviagtion is used to navigate the page.
   */
  renderButtonListItem = (ctaType, navigation, ctaItems, locator, color) => {
    return (
      <ButtonList
        buttonListVariation={ctaType}
        navigation={navigation}
        buttonsData={ctaItems}
        locator={locator}
        color={color}
      />
    );
  };

  /**
   * This method return the renderButtonList method to manage all the different type variation .
   *  @ctaType are four types : 'imageCTAList' ,'stackedCTAList','scrollCTAList','linkCTAList'.
   *  @naviagtion is used to navigate the page.
   */
  renderButtonList(ctaType, navigation, ctaItems) {
    const ctaTypeValue = ctaTypes[ctaType];
    return (
      <View>
        {ctaTypeValue === ctaTypes.divImageCTACarousel && (
          <View>
            {this.renderButtonListItem(
              ctaTypeValue,
              navigation,
              ctaItems,
              'moduleT_cta_links',
              'black'
            )}
          </View>
        )}

        {ctaTypeValue === ctaTypes.stackedCTAButtons && (
          <View>
            <Border />
            {this.renderButtonListItem(
              ctaTypeValue,
              navigation,
              ctaItems,
              'stacked_cta_list',
              'fixed-width'
            )}
            <Border />
          </View>
        )}

        {ctaTypeValue === ctaTypes.scrollCTAList && (
          <ButtonContainer>
            {this.renderButtonListItem(
              ctaTypeValue,
              navigation,
              ctaItems,
              'scroll_cta_list',
              'gray'
            )}
          </ButtonContainer>
        )}

        {ctaTypeValue === ctaTypes.linkList && (
          <ButtonLinksContainer>
            {this.renderButtonListItem(ctaTypeValue, navigation, ctaItems, 'link_cta_list', 'gray')}
          </ButtonLinksContainer>
        )}
      </View>
    );
  }

  /**
   * This method return the renderMediaLinkedImage method to manage all product image with cropping rule .
   *  @naviagtion is used to navigate the page.
   */
  renderMediaLinkedImage = (mediaLinkedList, navigation) => {
    return (
      <ImageContainer>
        {mediaLinkedList.map(({ image, link, video }, index) => {
          const videoData = video &&
            video.url && {
              videoWidth: buttonWidth,
              videoHeight: 202,
              ...video,
            };
          const imgData = image || {};
          return (
            <ImageWrapper tileIndex={index}>
              {imgData && Object.keys(imgData).length > 0 ? (
                <Anchor url={link ? link.url : ''} navigation={navigation} key={index.toString()}>
                  <DamImage
                    url={imgData.url}
                    height="202px"
                    width={`${buttonWidth}px`}
                    testID={`${getLocator('moduleT_product_img')}${index}`}
                    alt={imgData.alt}
                    imgConfig={IMG_DATA.promoImgConfig[0]}
                  />
                </Anchor>
              ) : null}
              {videoData && Object.keys(videoData).length > 0 ? (
                <DamImage
                  height="202px"
                  width={`${buttonWidth}px`}
                  testID={`${getLocator('moduleT_product_img')}${index}`}
                  videoData={videoData}
                  imgConfig={IMG_DATA.promoImgConfig[0]}
                />
              ) : null}
            </ImageWrapper>
          );
        })}
      </ImageContainer>
    );
  };

  render() {
    const { navigation, mediaLinkedList, headerText, promoBanner, ctaItems, ctaType } = this.props;

    return (
      <Container>
        <MessageContainer>
          <Wrapper>
            <HeaderContainer>
              {headerText && (
                <LinkText
                  navigation={navigation}
                  headerText={headerText}
                  testID={getLocator('moduleT_header_text')}
                  useStyle
                />
              )}
            </HeaderContainer>
          </Wrapper>

          {promoBanner && (
            <PromoContainer>
              <PromoBanner
                testID={getLocator('moduleT_promobanner_text')}
                promoBanner={promoBanner}
                navigation={navigation}
              />
            </PromoContainer>
          )}
        </MessageContainer>
        {this.renderMediaLinkedImage(mediaLinkedList, navigation)}
        {this.renderButtonList(ctaType, navigation, ctaItems)}
      </Container>
    );
  }
}

ModuleT.defaultProps = {
  promoBanner: [],
};

ModuleT.propTypes = {
  headerText: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.array,
    })
  ).isRequired,
  promoBanner: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.object,
      textItems: PropTypes.array,
    })
  ),
  ctaItems: PropTypes.shape([]).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  mediaLinkedList: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      link: PropTypes.object,
    })
  ).isRequired,
  ctaType: PropTypes.oneOf(['stackedCTAButtons', 'linkCTAList', 'scrollCTAList', 'imageCTAList'])
    .isRequired,
};

export default ModuleT;
export { ModuleT as ModuleTVanilla };
