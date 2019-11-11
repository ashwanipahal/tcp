import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import ButtonList from '../../ButtonList';
import Carousel from '../../Carousel';
import { DamImage } from '../../../atoms';
import LinkText from '../../LinkText';
import PromoBanner from '../../PromoBanner';
import { getLocator } from '../../../../../utils';
import { getScreenWidth, LAZYLOAD_HOST_NAME } from '../../../../../utils/index.native';
import {
  Container,
  ContainerView,
  HeaderWrapper,
  PromoBannerWrapper,
  HeaderView,
  EyeBrowContainer,
  StyledImage,
  TopPromoWrapper,
  StyledButton,
  Border,
  ImageContainer,
  StyledAnchor,
  ImageWrapper,
  StyledBodyCopy,
  ButtonWrapper,
} from '../styles/ModuleE.style.native';
import config from '../config';

/**
 * Module height and width.
 * Height is fixed for mobile : TCP & Gymb
 * Width can vary as per device width.
 */

const MODULE_DEFAULT_HEIGHT = 373;
const MODULE_WIDTH = getScreenWidth();
const MODULE_EYEBROW_WIDTH = 117;
const MODULE_EYEBROW_HEIGHT = 18;
const MODULE_PROMO_EYEBROW_WIDTH = getScreenWidth() - 234;

/**
 * These are button width.
 */
const buttonWidth = 164;

// TODO: keys will be changed once we get the actual data from CMS
const { ctaTypes } = config;

const ctaType = 'stackedCTAButtons';

/**
 * @param {object} props : Props for Module E multi type of banner list, button list, header text.
 * @desc This is Module A global component. It has capability to display
 * featured content module with 1 backckground color tiles ,links and a CTA Button list.
 * Author can surface teaser content leading to corresponding pages.
 * To manage the TCP And Gymboree View .
 */

class ModuleE extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shopNowText: '',
      shopNowUrl: '',
    };
  }

  renderButton = navigation => {
    const { shopNowText, shopNowUrl } = this.state;
    return (
      <ButtonWrapper marginTop="8px">
        <Border />
        <StyledButton text={shopNowText} url={shopNowUrl} navigation={navigation} />
      </ButtonWrapper>
    );
  };

  renderView = item => {
    const {
      item: { image, singleCTAButton },
    } = item;

    this.setState({
      shopNowText: singleCTAButton.text,
      shopNowUrl: singleCTAButton.url,
    });

    return (
      <ContainerView>
        <DamImage
          width={MODULE_WIDTH}
          height={MODULE_DEFAULT_HEIGHT}
          url={image.url}
          host={LAZYLOAD_HOST_NAME.HOME}
          crop={image.crop_m}
        />
      </ContainerView>
    );
  };

  renderCarousel = largeCompImageSimpleCarousel => {
    return (
      <ContainerView>
        {largeCompImageSimpleCarousel && largeCompImageSimpleCarousel.length > 1 ? (
          <Carousel
            height={MODULE_DEFAULT_HEIGHT}
            data={largeCompImageSimpleCarousel}
            renderItem={item => this.renderView(item)}
            width={MODULE_WIDTH}
            carouselConfig={{
              autoplay: true,
            }}
            showDots
            overlap
          />
        ) : (
          <View>{this.renderView({ item: largeCompImageSimpleCarousel[0] })}</View>
        )}
      </ContainerView>
    );
  };

  /**
   * This method return the ButtonList View according to the different variation .
   *  @ctaType are four types : 'imageCTAList' ,'stackedCTAList','scrollCTAList','linkCTAList'.
   *  @naviagtion is used to navigate the page.
   */
  renderButtonList = (ctaTypeValue, navigation, ctaItems, locator, color) => {
    return (
      <View>
        <ButtonList
          buttonListVariation={ctaTypeValue}
          navigation={navigation}
          buttonsData={ctaItems}
          locator={locator}
          color={color}
        />
        <Border />
      </View>
    );
  };

  renderHeaderPromo = (navigation, headerText, promoBanner) => {
    return (
      <HeaderWrapper>
        <HeaderView>
          {headerText && (
            <LinkText
              type="heading"
              fontFamily="primary"
              fontWeight="black"
              navigation={navigation}
              headerText={headerText}
              locator="moduleE_header_text"
              textAlign="center"
              useStyle
              renderComponentInNewLine
            />
          )}
        </HeaderView>
        <PromoBannerWrapper>
          {promoBanner && (
            <PromoBanner
              promoBanner={promoBanner}
              navigation={navigation}
              locator="moduleE_promobanner_text"
            />
          )}
        </PromoBannerWrapper>
      </HeaderWrapper>
    );
  };

  renderEyeBrow = (eyebrow, naviagtion) => {
    return (
      <EyeBrowContainer>
        <StyledImage
          width={MODULE_EYEBROW_WIDTH}
          height={MODULE_EYEBROW_HEIGHT}
          url={eyebrow[0].mediaLinkedList[0].image.url}
        />
        <TopPromoWrapper width={MODULE_PROMO_EYEBROW_WIDTH}>
          <PromoBanner naviagtion={naviagtion} promoBanner={eyebrow[0].promoBanner} />
        </TopPromoWrapper>
        <StyledImage
          width={MODULE_EYEBROW_WIDTH}
          height={MODULE_EYEBROW_HEIGHT}
          url={eyebrow[0].mediaLinkedList[0].image.url}
        />
      </EyeBrowContainer>
    );
  };

  /**
   * This method return the renderMediaLinkedImage method to manage all product image with cropping rule .
   *  @naviagtion is used to navigate the page.
   */
  renderMediaLinkedImage = (divCTALinks, navigation) => {
    return (
      <ImageContainer>
        {divCTALinks.map(({ image, link, styled }, index) => {
          return (
            <ImageWrapper tileIndex={index}>
              <StyledAnchor
                url={link ? link.url : ''}
                navigation={navigation}
                key={index.toString()}
              >
                <StyledImage
                  url={image && image.url}
                  height="202px"
                  width={`${buttonWidth}px`}
                  testID={`${getLocator('moduleE_product_img')}${index}`}
                  alt={image && image.alt}
                />
              </StyledAnchor>

              <StyledBodyCopy
                text={styled.text}
                fontWeight="medium"
                color="gray.900"
                fontFamily="primary"
                fontSize="fs20"
                textAlign="center"
                marginTop="16px"
                marginBottom="16px"
                letterSpacing="ls2"
                width="160px"
              />

              <StyledButton text={styled.text} naviagtion={navigation} />
            </ImageWrapper>
          );
        })}
      </ImageContainer>
    );
  };

  render() {
    const {
      navigation,
      largeCompImageSimpleCarousel,
      ctaItems,
      eyebrow,
      headerText,
      promoBanner,
      divCTALinks,
    } = this.props;

    const ctaTypeValue = ctaTypes[ctaType];

    return (
      <Container>
        {eyebrow && this.renderEyeBrow(eyebrow, navigation)}
        {this.renderHeaderPromo(navigation, headerText, promoBanner)}
        {largeCompImageSimpleCarousel &&
          this.renderCarousel(largeCompImageSimpleCarousel, navigation)}
        {navigation && this.renderButton(navigation)}
        {ctaItems && this.renderButtonList(ctaTypeValue, navigation, ctaItems)}
        {this.renderMediaLinkedImage(divCTALinks, navigation)}
      </Container>
    );
  }
}

ModuleE.defaultProps = {
  eyebrow: [],
  headerText: [],
  promoBanner: [],
  navigation: {},
  ctaItems: [],
  largeCompImageSimpleCarousel: [],
  divCTALinks: [],
};

ModuleE.propTypes = {
  largeCompImageSimpleCarousel: PropTypes.shape([]),
  headerText: PropTypes.shape([]),
  promoBanner: PropTypes.shape([]),
  ctaItems: PropTypes.shape([]),
  navigation: PropTypes.shape({}),
  eyebrow: PropTypes.shape([]),
  divCTALinks: PropTypes.shape([]),
};

export default ModuleE;
export { ModuleE as ModuleEVanilla };
