import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Anchor, DamImage } from '../../../atoms';
import { getLocator } from '../../../../../utils/index.native';
import config from '../config';
import PromoBanner from '../../PromoBanner';
import LinkText from '../../LinkText';
import ButtonList from '../../ButtonList';
import { getScreenWidth } from '../../../../../utils/utils.app';
import {
  Container,
  PromoContainer,
  HeaderContainer,
  ImageContainer,
  MessageContainer,
  Wrapper,
  DivImageCTAContainer,
  ButtonContainer,
  ButtonLinksContainer,
  Border,
} from '../ModuleT.style.native';

// TODO: keys will be changed once we get the actual data from CMS
const { IMG_DATA } = config;

/**
 * These are button width.
 */
const buttonWidth = getScreenWidth() / 2 - 14;

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
    return (
      <View>
        {ctaType === 'imageCTAList' && (
          <DivImageCTAContainer>
            {this.renderButtonListItem(ctaType, navigation, ctaItems, 'moduleT_cta_links', 'black')}
          </DivImageCTAContainer>
        )}

        {ctaType === 'stackedCTAList' && (
          <View>
            <Border background="gray" />
            {this.renderButtonListItem(
              ctaType,
              navigation,
              ctaItems,
              'stacked_cta_list',
              'fixed-width'
            )}
            <Border background="gray" />
          </View>
        )}

        {ctaType === 'scrollCTAList' && (
          <ButtonContainer>
            {this.renderButtonListItem(ctaType, navigation, ctaItems, 'scroll_cta_list', 'gray')}
          </ButtonContainer>
        )}

        {ctaType === 'linkCTAList' && (
          <ButtonLinksContainer>
            {this.renderButtonListItem(ctaType, navigation, ctaItems, 'link_cta_list', 'gray')}
          </ButtonLinksContainer>
        )}
      </View>
    );
  }

  render() {
    const { navigation, mediaLinkedList, headerText, promoBanner, ctaItems } = this.props;
    const ctaType = 'imageCTAList';
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
        <ImageContainer>
          <Anchor navigation={navigation} url={mediaLinkedList[0] && mediaLinkedList[0].link.url}>
            <DamImage
              url={mediaLinkedList[0] && mediaLinkedList[0].image.url}
              height="202px"
              width={`${buttonWidth}px`}
              testID={`${getLocator('moduleT_promobanner_img')}${0}`}
              alt={mediaLinkedList[0] && mediaLinkedList[0].image.alt}
              imgConfig={IMG_DATA[0]}
            />
          </Anchor>

          <Anchor navigation={navigation} url={mediaLinkedList[1] && mediaLinkedList[1].link.url}>
            <DamImage
              url={mediaLinkedList[1] && mediaLinkedList[1].image.url}
              height="202px"
              width={`${buttonWidth}px`}
              testID={`${getLocator('moduleT_promobanner_img')}${1}`}
              alt={mediaLinkedList[1] && mediaLinkedList[1].image.alt}
              imgConfig={IMG_DATA[0]}
            />
          </Anchor>
        </ImageContainer>
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
};

export default ModuleT;
export { ModuleT as ModuleTVanilla };
