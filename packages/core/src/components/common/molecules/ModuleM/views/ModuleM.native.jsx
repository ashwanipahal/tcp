/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';

import { getLocator, isGymboree } from '../../../../../utils';
import { getScreenWidth } from '../../../../../utils/index.native';
import { Anchor, BodyCopy, /* DamImage, */ Image } from '../../../atoms';
import {
  Container,
  HeaderContainer,
  SecondHeaderContainer,
  PromoContainer,
  ButtonTabsContainer,
  ButtonContainer,
  ImageContainer,
  Tile,
} from '../styles/ModuleM.style.native';
import LinkText from '../../LinkText';
import PromoBanner from '../../PromoBanner';
import ButtonTabs from '../../ButtonTabs';
import config from '../moduleM.config';
import spacing from '../../../../../../styles/themes/TCP/spacing';

const MODULE_WIDTH = getScreenWidth();

/**
 * @class ModuleM - global reusable component will display display a featured
 * category module with category links and featured product images
 * This component is plug and play at any given slot in layout by passing required data
 * @param {headerText} headerText the list of data for header
 * @param {promoBanner} promoBanner promo banner data
 * @param {divTabs} divTabs division tabs data
 */
class ModuleM extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTabItem: 'tablList-0',
    };
  }

  componentDidMount() {
    const { divTabs } = this.props;
    const tabItems = this.getButtonTabItems(divTabs);
    const { id } = tabItems.length && tabItems[0];
    this.setState({ currentTabItem: id });
  }

  /*
    Calculate image dimensions dynamically
    as per screen width
  */
  getImageDimension = totalImages => {
    const { OFFSET, GUTTER_SPACE } = config;
    const moduleWidth = MODULE_WIDTH - OFFSET;
    const divider = totalImages <= 3 ? 2 : 3;
    const gutter = totalImages <= 3 ? GUTTER_SPACE : GUTTER_SPACE * 2;
    return parseInt((moduleWidth - gutter) / divider, 10);
  };

  onTabChange = id => {
    this.setState({ currentTabItem: id });
  };

  /*
    Create a required data object for the ButtonTabs components
  */
  getButtonTabItems = tabItems => {
    return tabItems.map((item, index) => {
      const {
        text: { text },
      } = item;
      return { label: text, id: `tablList-${index}` };
    });
  };

  /*
    Create a required data object for the Image list
  */
  getImageItems = data => {
    return data.map((item, index) => {
      const { smallCompImage, linkClass } = item;
      return { id: `tablList-${index}`, smallCompImage, linkClass };
    });
  };

  render() {
    const { headerText, promoBanner, divTabs, navigation } = this.props;
    const { currentTabItem } = this.state;
    const tabItems = this.getButtonTabItems(divTabs);
    const images = this.getImageItems(divTabs);
    let currentTabData = '';
    if (currentTabItem) {
      currentTabData = images.find(obj => obj.id === currentTabItem);
    }
    const { smallCompImage, linkClass } = currentTabData;
    console.log(smallCompImage, linkClass);
    const totalImages = smallCompImage && smallCompImage.length;
    const imageDimension = this.getImageDimension(totalImages);
    return (
      <Container>
        <HeaderContainer>
          {[headerText[0]] && (
            <LinkText
              navigation={navigation}
              headerText={[headerText[0]]}
              testID={getLocator('moduleM_header_text_0')}
              fontFamily="primary"
              fontSize="fs32"
              textAlign="center"
              color="text.primary"
              fontWeight="black"
              type="heading"
            />
          )}
        </HeaderContainer>
        <SecondHeaderContainer>
          {[headerText[1]] && (
            <LinkText
              navigation={navigation}
              headerText={[headerText[1]]}
              testID={getLocator('moduleM_header_text_1')}
              renderComponentInNewLine
              useStyle
            />
          )}
        </SecondHeaderContainer>
        {promoBanner && (
          <PromoContainer>
            <PromoBanner
              testID={getLocator('moduleM_promobanner_text')}
              promoBanner={promoBanner}
              navigation={navigation}
            />
          </PromoContainer>
        )}
        {tabItems.length > 1 ? (
          <ButtonTabsContainer>
            <ButtonTabs
              selectedTabId={currentTabItem}
              onTabChange={this.onTabChange}
              tabs={tabItems}
              navigation={navigation}
            />
          </ButtonTabsContainer>
        ) : null}

        {smallCompImage && smallCompImage.length > 0 ? (
          <ImageContainer>
            {smallCompImage.map(({ image, link }, index) => {
              // const { IMG_DATA } = config;
              return (
                <Tile tileIndex={index} imageCount={totalImages} key={index.toString()}>
                  <Anchor url={link.url} navigation={navigation}>
                    <Image
                      source={{ uri: image.url }}
                      height={imageDimension}
                      width={imageDimension}
                      marginBottom={parseInt(spacing.ELEM_SPACING.XXS, 10)}
                      borderRadius={isGymboree() ? 50 : 0}
                    />
                    {/* TODO: Need to use DAM Image Component */}
                    {/* <DamImage
                      alt={image.alt}
                      url={image.url}
                      testID={`${getLocator('moduleM_image')}${index}`}
                      marginBottom={parseInt(spacing.ELEM_SPACING.XXS, 10)}
                      height={imageDimension}
                      width={imageDimension}
                      imgData={image}
                      imgConfig={IMG_DATA.productImgConfig[0]}
                    /> */}
                  </Anchor>
                  <Anchor
                    url={link.url}
                    navigation={navigation}
                    testID={`${getLocator('moduleM_textlink')}${index}`}
                  >
                    <BodyCopy
                      mobileFontFamily="secondary"
                      fontSize="fs15"
                      fontWeight="regular"
                      color="gray.900"
                      text={link.text}
                      textAlign="center"
                    />
                  </Anchor>
                </Tile>
              );
            })}
            {linkClass ? (
              <Anchor
                url={linkClass.url}
                navigation={navigation}
                testID={getLocator('moduleM_cta_btn')}
              >
                <ButtonContainer imageCount={totalImages} imageDimension={imageDimension}>
                  <BodyCopy
                    mobileFontFamily="primary"
                    fontSize="fs20"
                    fontWeight="extrabold"
                    color="white"
                    letterSpacing="ls1"
                    text={linkClass.text}
                    textAlign="center"
                  />
                </ButtonContainer>
              </Anchor>
            ) : null}
          </ImageContainer>
        ) : null}
      </Container>
    );
  }
}

ModuleM.defaultProps = {
  promoBanner: [],
};

ModuleM.propTypes = {
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
  navigation: PropTypes.shape({}).isRequired,
  divTabs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.object,
      category: PropTypes.object,
      smallCompImage: PropTypes.array,
    })
  ).isRequired,
  singleCTAButton: PropTypes.shape({}).isRequired,
};

export default ModuleM;
