import React from 'react';
import { PropTypes } from 'prop-types';
import { FlatList } from 'react-native';

import Anchor from '../../../atoms/Anchor';
import BodyCopy from '../../../atoms/BodyCopy';
import { getScreenWidth } from '../../../../../utils/index.native';
import { navigateToNestedRoute } from '../../../../../utils/utils.app';
import {
  ImageGridItem,
  ImageWrapper,
  Title,
  Touchable,
  Wrapper,
} from '../styles/GetCandid.style.native';

/**
 * @class GetCandid - display images shared by customers on Home Page
 * To promote popular products and encourage more customers to buy them
 * This component will be coming on homepage just before footer
 *
 * @param {candidData} candidData the list of data to display images
 * @param {labels} candidData the list of data to display images, links and images for component
 * @param {navigation} navigation object containing navigate method
 */
class GetCandid extends React.PureComponent {
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
   * @function getSize function to calculate size of
   * image dynamically as per screen size.
   */
  getSize = () => parseInt((getScreenWidth() - 66) / 3, 10);

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
        <Anchor onPress={this.navigateToPage}>
          <ImageGridItem
            key={index.toString()}
            index={index}
            url={image.Url}
            height={this.getSize()}
            width={this.getSize()}
          />
        </Anchor>
      </Touchable>
    );
  };

  /**
   * @function navigateToPage function to navigate to
   * Get Candid Gallery page.
   */
  navigateToPage = () => {
    const { navigation } = this.props;
    navigateToNestedRoute(navigation, 'HomeStack', 'GetCandidGallery');
  };

  render() {
    const { candidData, labels } = this.props;
    const data = candidData && candidData.Views;

    return (
      <Wrapper>
        {labels && (
          <>
            <Title
              mobileFontFamily="primary"
              fontSize="fs20"
              fontWeight="semibold"
              color="gray.900"
              marginBottom="12px"
              text={labels.title}
              textAlign="center"
              letterSpacing="ls167"
            />
            <BodyCopy
              mobileFontFamily="primary"
              fontSize="fs14"
              fontWeight="regular"
              color="gray.900"
              text={labels.titleDescription}
              textAlign="center"
            />
          </>
        )}
        {data && (
          <ImageWrapper>
            <FlatList
              numColumns={3}
              data={data.slice(0, 9)}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />
          </ImageWrapper>
        )}
        {labels && (
          <Anchor
            fontFamily="secondary"
            color="gray.900"
            anchorVariation="primary"
            noLink
            dataLocator=""
            text={labels.btnSeeMore}
            visible
            onPress={this.navigateToPage}
          />
        )}
      </Wrapper>
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
  labels: {
    title: 'title',
    titleDescription: 'titleDescription',
    btnSeeMore: 'btnSeeMore',
  },
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
