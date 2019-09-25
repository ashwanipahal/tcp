import React from 'react';
import { PropTypes } from 'prop-types';
import { FlatList } from 'react-native';

import Anchor from '../../../atoms/Anchor';
import BodyCopy from '../../../atoms/BodyCopy';
import {
  getScreenWidth,
  navigateToNestedRoute,
  LAZYLOAD_HOST_NAME,
} from '../../../../../utils/index.native';

import {
  ImageGridItem,
  ImageWrapper,
  Title,
  Touchable,
  Wrapper,
} from '../styles/GetCandid.style.native';
import { IMAGE_COUNT } from '../config';

/**
 * @class GetCandid - display images shared by customers on Home Page
 * To promote popular products and encourage more customers to buy them
 * This component will be coming on homepage just before footer
 *
 * @param {candidData} candidData the list of data to display images
 * @param {labels} labels label data for get candid module
 * @param {navigation} navigation object containing navigate method
 */
class GetCandid extends React.Component {
  componentDidMount() {
    const { apiConfig, fetchCandidData } = this.props;
    fetchCandidData(apiConfig);
  }

  /**
   * @function keyExtractor function to get unique key
   * for FlatList component.
   */
  keyExtractor = (_, index) => index.toString();

  /**
   * @function getImageSize function to calculate size of
   * image dynamically as per screen size.
   */
  getImageSize = () => parseInt((getScreenWidth() - 66) / 3, 10);

  /**
   * @function renderItem : Render method for Flatlist.
   * @desc This method is rendering GetCandid image items.
   *
   * @param {Object} item : Single object to render inside Flatlist.
   * @return {node} function returns Image element element.
   */
  renderItem = item => {
    const {
      item: {
        Media: {
          Images: { StandardResolution },
        },
      },
      index,
    } = item;
    const image = StandardResolution;
    return (
      <Touchable accessibilityRole="image">
        <Anchor onPress={() => this.navigateToGallery(index)}>
          <ImageGridItem
            host={LAZYLOAD_HOST_NAME.HOME}
            key={index.toString()}
            index={index}
            url={image.Url}
            height={this.getImageSize()}
            width={this.getImageSize()}
          />
        </Anchor>
      </Touchable>
    );
  };

  /**
   * @function navigateToGallery function to navigate to
   * Get Candid Gallery page.
   */
  navigateToGallery = index => {
    const { navigation, labels } = this.props;
    navigateToNestedRoute(navigation, 'HomeStack', 'GetCandidGallery', {
      activeIndex: index,
      title: labels.lbl_getCandid_title.toUpperCase(),
    });
  };

  render() {
    const { candidData, labels } = this.props;
    const data = candidData && candidData.Views;
    return (
      data &&
      data.length > 8 && (
        <Wrapper>
          {labels.lbl_getCandid_title && (
            <>
              <Title
                mobileFontFamily="primary"
                fontSize="fs20"
                fontWeight="semibold"
                color="gray.900"
                marginBottom="12px"
                text={labels.lbl_getCandid_title}
                textAlign="center"
                letterSpacing="ls167"
              />
              <BodyCopy
                mobileFontFamily="primary"
                fontSize="fs14"
                fontWeight="regular"
                color="gray.900"
                text={labels.lbl_getCandid_titleDescription}
                textAlign="center"
              />
              <ImageWrapper>
                <FlatList
                  numColumns={3}
                  data={data.slice(0, IMAGE_COUNT)}
                  keyExtractor={this.keyExtractor}
                  renderItem={this.renderItem}
                  initialNumToRender={6}
                />
              </ImageWrapper>
              <Anchor
                fontFamily="secondary"
                color="gray.900"
                anchorVariation="primary"
                noLink
                dataLocator=""
                text={labels.lbl_getCandid_btnSeeMore}
                visible
                onPress={() => this.navigateToGallery(IMAGE_COUNT - 1)}
              />
            </>
          )}
        </Wrapper>
      )
    );
  }
}

GetCandid.defaultProps = {
  apiConfig: {},
  candidData: {
    Settings: {},
    Views: [],
    Tags: [],
  },
  labels: {},
  fetchCandidData: () => {},
  navigation: {},
};

GetCandid.propTypes = {
  apiConfig: PropTypes.shape({}),
  candidData: PropTypes.shape({}),
  fetchCandidData: PropTypes.func,
  labels: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
};

export default GetCandid;
export { GetCandid as GetCandidVanilla };
