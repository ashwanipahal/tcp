import React from 'react';
import PropTypes from 'prop-types';

import { getLocator } from '../../../../../utils';
import { getScreenWidth } from '../../../../../utils/index.native';
import { Anchor, BodyCopy, DamImage } from '../../../atoms';
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
class ModuleM extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTabItem: '',
    };
  }

  componentDidMount() {
    const { divTabs } = this.props;
    const tabItems = this.getButtonTabItems(divTabs);
    const { id } = tabItems.length && tabItems[0];
    this.setState({ currentTabItem: id });
  }

  getImageDimension = () => {
    const { OFFSET, GUTTER_SPACE } = config;
    return parseInt((MODULE_WIDTH - OFFSET - GUTTER_SPACE) / 3, 10);
  };

  onTabChange = (catId, tabItem) => {
    this.setState({ currentTabItem: tabItem });
  };

  /*
    Create a required data object for the ButtonTabs components
    which is being used in the ProductTabList view.
  */
  getButtonTabItems = tabItems => {
    return tabItems.map(item => {
      const {
        category: { cat_id: catId } = {},
        text: { text },
      } = item;
      return { label: text, id: catId };
    });
  };

  /*
    Create a required data object for the Image list
  */
  getImageItems = data => {
    return data.map(item => {
      const { category: { cat_id: catId } = {}, smallCompImages } = item;
      return { id: catId, smallCompImages };
    });
  };

  render() {
    const { headerText, promoBanner, divTabs, navigation, singleCTAButton } = this.props;
    const { currentTabItem } = this.state;
    const tabItems = this.getButtonTabItems(divTabs);
    const images = this.getImageItems(divTabs);
    let currentTabData = '';
    if (currentTabItem) {
      currentTabData = images.find(obj => obj.id === currentTabItem);
    }
    const { smallCompImages } = currentTabData;
    const imageDimension = this.getImageDimension();
    return (
      <Container>
        <HeaderContainer>
          {[headerText[0]] && (
            <LinkText
              navigation={navigation}
              headerText={[headerText[0]]}
              testID={getLocator('moduleM_header_text_0')}
              useStyle
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
        <ButtonTabsContainer>
          <ButtonTabs selectedTabId={1} onTabChange={this.onTabChange} tabs={tabItems} />
        </ButtonTabsContainer>
        {smallCompImages && smallCompImages.length > 0 ? (
          <ImageContainer>
            {smallCompImages.map(({ image, link }, index) => {
              const { IMG_DATA } = config;
              const anchorEnable = true;
              return (
                <Tile tileIndex={index} key={index.toString()}>
                  <Anchor url={link.url} navigation={navigation}>
                    <DamImage
                      alt={image.alt}
                      testID={`${getLocator('moduleM_image')}${index}`}
                      url={image.url}
                      height={imageDimension}
                      marginBottom={parseInt(spacing.ELEM_SPACING.XXS, 10)}
                      width={imageDimension}
                      imgConfig={IMG_DATA.productImgConfig[0]}
                      link={link}
                    />
                  </Anchor>
                  <Anchor
                    testID={`${getLocator('moduleM_textlink')}${index}`}
                    fontSizeVariation="large"
                    text={link.text}
                    visible={anchorEnable}
                    url={link.url}
                    navigation={navigation}
                    anchorVariation="primary"
                  />
                </Tile>
              );
            })}
            {singleCTAButton ? (
              <Anchor
                url={singleCTAButton.url}
                navigation={navigation}
                testID={getLocator('moduleM_cta_btn')}
              >
                <ButtonContainer imageDimension={imageDimension}>
                  <BodyCopy
                    mobileFontFamily="primary"
                    fontSize="fs20"
                    fontWeight="extrabold"
                    color="white"
                    letterSpacing="ls1"
                    text={singleCTAButton.text}
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
      smallCompImages: PropTypes.array,
    })
  ).isRequired,
  singleCTAButton: PropTypes.shape({}).isRequired,
};

export default ModuleM;
