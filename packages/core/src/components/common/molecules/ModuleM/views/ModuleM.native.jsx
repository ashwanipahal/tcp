import React from 'react';
import PropTypes from 'prop-types';

import { getLocator } from '../../../../../utils';
import { getScreenWidth } from '../../../../../utils/index.native';
import { Button, DamImage } from '../../../atoms';
import {
  Container,
  HeaderContainer,
  SecondHeaderContainer,
  PromoContainer,
  ButtonTabsContainer,
  ButtonContainer,
  ImageContainer,
} from '../styles/ModuleM.style.native';
import LinkText from '../../LinkText';
import PromoBanner from '../../PromoBanner';
import ButtonTabs from '../../ButtonTabs';
import config from '../moduleM.config';

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
    const { IMG_DATA } = config;
    const imageDimension = this.getImageDimension();
    console.log(imageDimension);
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
            {smallCompImages.map(({ image, link }, index) => (
              <DamImage
                key={index.toString()}
                className="promo-img"
                imgConfigs={IMG_DATA.productImgConfig}
                imgData={image}
                data-locator={`${getLocator('moduleM_product_img')}${index}`}
                link={link}
                width={imageDimension}
                height={imageDimension}
              />
            ))}
          </ImageContainer>
        ) : null}
        {singleCTAButton ? (
          <ButtonContainer>
            <Button
              width="225px"
              text={singleCTAButton.text}
              url={singleCTAButton.url}
              navigation={navigation}
              testID={getLocator('moduleM_cta_btn')}
            />
          </ButtonContainer>
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
