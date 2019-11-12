import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import ButtonList from '../../ButtonList';
import Carousel from '../../Carousel';
import { DamImage, Anchor } from '../../../atoms';
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
  PromoAreaWrapper,
  BorderTopAndBottom,
  AnchorWrapper,
  Wrapper,
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
const { ctaTypes, IMG_DATA } = config;

/**
 * These are button width.
 */

const BUTTON_VARIATION_FULLWIDTH = 'fullwidth';
const BUTTON_VARIATION_HALFWIDTH = 'halfwidth';

/**
 * @param {object} props : Props for Module E multi type of banner list, button list, header text.
 * @desc This is Module E global component. It has capability to display
 * featured content module with  tiles ,links and a CTA Button list.
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

  /**
   * This renderAnchor method return the Anchor  .
   *  @naviagtion is used to navigate the page.
   */
  renderAnchor = navigation => {
    const { shopNowText, shopNowUrl } = this.state;
    return (
      <AnchorWrapper>
        <StyledAnchor
          text={shopNowText}
          url={shopNowUrl}
          navigation={navigation}
          underline
          centered
          fontSizeVariation="large"
          anchorVariation="custom"
          colorName="gray.900"
        />
      </AnchorWrapper>
    );
  };

  /**
   * This renderButton method return the button according button variation .
   *  @naviagtion is used to navigate the page.
   */
  renderButton = (navigation, buttonVariation) => {
    const { shopNowText, shopNowUrl } = this.state;
    if (buttonVariation === BUTTON_VARIATION_FULLWIDTH) {
      return (
        <ButtonWrapper>
          <Border />
          <StyledButton text={shopNowText} url={shopNowUrl} navigation={navigation} />
        </ButtonWrapper>
      );
    }

    return (
      <Wrapper>
        <StyledButton text={shopNowText} url={shopNowUrl} navigation={navigation} />
      </Wrapper>
    );
  };

  /**
   * This renderView method return the images .
   *  @naviagtion is used to navigate the page.
   *  @carouselCtaType is used to manage the type of carouselCtabuttons .
   */
  renderView = (item, naviagtion) => {
    const {
      item: { image, singleCTAButton },
    } = item;

    this.setState({
      shopNowText: singleCTAButton.text,
      shopNowUrl: singleCTAButton.url,
    });

    return (
      <View>
        <Anchor naviagation={naviagtion} url={singleCTAButton.url}>
          <DamImage
            width={MODULE_WIDTH}
            height={MODULE_DEFAULT_HEIGHT}
            url={image.url}
            host={LAZYLOAD_HOST_NAME.HOME}
            crop={image.crop_m}
            imgConfig={IMG_DATA.carouselImgConfig[0]}
          />
        </Anchor>
      </View>
    );
  };

  /**
   * This method return the largeCompImageSimpleCarousel .
   *  @naviagtion is used to navigate the page.
   *  @carouselCtaType is used to manage the type of carouselCtabuttons .
   */

  renderCarousel = (largeCompImageSimpleCarousel, navigation, carouselCtaType) => {
    return (
      <ContainerView>
        {largeCompImageSimpleCarousel && largeCompImageSimpleCarousel.length > 1 ? (
          <Carousel
            height={MODULE_DEFAULT_HEIGHT}
            data={largeCompImageSimpleCarousel}
            renderItem={item => this.renderView(item, navigation)}
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
        {carouselCtaType === 'link' ? this.renderAnchor(navigation) : null}
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
        <Border />
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

  /**
   * This method return the headerText and promoBanner .
   *  @naviagtion is used to navigate the page.
   */

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

  /**
   * This method return the renderEyeBrow method to manage all image .
   *  @naviagtion is used to navigate the page.
   */
  renderEyeBrow = (eyebrow, naviagtion) => {
    return (
      <View>
        {eyebrow && (
          <EyeBrowContainer>
            <StyledImage
              width={MODULE_EYEBROW_WIDTH}
              height={MODULE_EYEBROW_HEIGHT}
              url={eyebrow && eyebrow.mediaLinkedList[0] && eyebrow.mediaLinkedList[0].image.url}
              imgConfig={IMG_DATA.eyeBrowImgConfig[0]}
            />
            <TopPromoWrapper width={MODULE_PROMO_EYEBROW_WIDTH}>
              <PromoBanner naviagtion={naviagtion} promoBanner={eyebrow && eyebrow.promoBanner} />
            </TopPromoWrapper>
            <StyledImage
              width={MODULE_EYEBROW_WIDTH}
              height={MODULE_EYEBROW_HEIGHT}
              url={eyebrow && eyebrow.mediaLinkedList[0] && eyebrow.mediaLinkedList[0].image.url}
              imgConfig={IMG_DATA.eyeBrowImgConfig[0]}
            />
          </EyeBrowContainer>
        )}
      </View>
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
                  imgConfig={IMG_DATA.smallImgConfig[0]}
                />
              </StyledAnchor>

              <StyledBodyCopy
                text={styled.text}
                fontWeight="medium"
                color="gray.900"
                fontFamily="primary"
                fontSize="fs20"
                textAlign="center"
                marginTop="8px"
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

  /**
   * This method return the PromoArea .
   */
  renderPromoArea = (linkedImage, navigation, carouselCtaType) => {
    if (linkedImage && linkedImage.length > 0) {
      return (
        <PromoAreaWrapper type={carouselCtaType}>
          {linkedImage.map(({ image, link }, index) => {
            return (
              <View>
                <StyledAnchor
                  url={link ? link.url : ''}
                  navigation={navigation}
                  key={index.toString()}
                >
                  <StyledImage
                    url={image && image.url}
                    height="67px"
                    width={MODULE_WIDTH}
                    testID={`${getLocator('moduleE_promoarea_img')}${index}`}
                    alt={image && image.alt}
                    imgConfig={IMG_DATA.promoAreaImgConfig[0]}
                  />
                </StyledAnchor>
              </View>
            );
          })}
        </PromoAreaWrapper>
      );
    }
    return null;
  };

  /**
   * This method return the renderTopAndBottomBorder according to pos.
   */
  renderTopAndBottomBorder = pos => {
    return <BorderTopAndBottom pos={pos} />;
  };

  /**
   * This method return the renderTopView method to manage all renderHeaderPromo, renderEyeBrow, renderTopAndBottomBorder .
   *  @naviagtion is used to navigate the page.
   */
  renderTopView = (eyebrow, headerText, promoBanner, navigation) => {
    return (
      <View>
        {!eyebrow && this.renderTopAndBottomBorder('bottom')}
        {eyebrow && this.renderEyeBrow(eyebrow, navigation)}
        {this.renderHeaderPromo(navigation, headerText, promoBanner)}
      </View>
    );
  };

  render() {
    const {
      navigation,
      largeCompImageSimpleCarousel,
      ctaItems,
      eyebrow: eyebrows,
      headerText,
      promoBanner,
      divCTALinks,
      linkedImage,
      ctaType,
      carouselCtaType,
    } = this.props;

    const eyebrow = eyebrows ? eyebrows[0] : null;

    const ctaTypeValue = ctaTypes[ctaType];

    return (
      <Container>
        {this.renderTopView(eyebrow, headerText, promoBanner, navigation)}
        {linkedImage && this.renderPromoArea(linkedImage, navigation, carouselCtaType)}
        {largeCompImageSimpleCarousel &&
          this.renderCarousel(largeCompImageSimpleCarousel, navigation, carouselCtaType)}
        {carouselCtaType === 'button' && !eyebrow
          ? this.renderButton(navigation, BUTTON_VARIATION_HALFWIDTH)
          : null}
        {carouselCtaType === 'button' && eyebrow
          ? this.renderButton(navigation, BUTTON_VARIATION_FULLWIDTH)
          : null}
        {ctaItems && this.renderButtonList(ctaTypeValue, navigation, ctaItems)}
        {this.renderMediaLinkedImage(divCTALinks, navigation)}
        {!eyebrow && this.renderTopAndBottomBorder('top')}
      </Container>
    );
  }
}

ModuleE.defaultProps = {
  eyebrow: null,
  headerText: [],
  promoBanner: null,
  navigation: {},
  ctaItems: [],
  largeCompImageSimpleCarousel: [],
  divCTALinks: [],
  linkedImage: [],
  ctaType: '',
  carouselCtaType: '',
};

ModuleE.propTypes = {
  largeCompImageSimpleCarousel: PropTypes.shape([]),
  headerText: PropTypes.shape([]),
  promoBanner: PropTypes.shape([]),
  ctaItems: PropTypes.shape([]),
  navigation: PropTypes.shape({}),
  eyebrow: PropTypes.shape([]),
  divCTALinks: PropTypes.shape([]),
  linkedImage: PropTypes.shape([]),
  ctaType: PropTypes.string,
  carouselCtaType: PropTypes.string,
};

export default ModuleE;
export { ModuleE as ModuleEVanilla };
