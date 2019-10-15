import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Image, Anchor } from '../../../../common/atoms';

import { getScreenWidth } from '../../../../../utils/index.native';
import { Container, Separator, AnchorStyle } from '../OutfitListing.style.native';

class OutfitListing extends React.PureComponent {
  /**
   * @function navigateToOutfitDetails
   * navigates to outfit details
   *
   * @memberof OutfitListing
   */
  navigateToOutfitDetails = () => {
    // const { navigation } = this.props;
    // eslint-disable-next-line extra-rules/no-commented-out-code
    // if(navigation) navigation.navigate('OutfitDetails');
  };

  /**
   * @function renderItem
   * renders item of outfit list
   *
   * @memberof OutfitListing
   */
  renderItem = ({ item }) => {
    const { largeImageUrl } = item;
    // add https as prefix if not already present
    const imageURLWithHost =
      !largeImageUrl.startsWith('https:') || !largeImageUrl.startsWith('http:')
        ? `https:${largeImageUrl}`
        : largeImageUrl;
    const { labels } = this.props;
    const shopThisLookLabel = (labels && labels.lbl_shop_this_look) || '';

    return (
      <View>
        <Image url={imageURLWithHost} height="427px" width={getScreenWidth() - 24} />
        <Anchor
          text={shopThisLookLabel}
          onPress={this.navigateToOutfitDetails}
          customStyle={AnchorStyle}
          fontSizeVariation="medium"
          visible
        />
      </View>
    );
  };

  /**
   * @function keyExtractor
   * returns key of outfit
   *
   * @memberof OutfitListing
   */
  keyExtractor = (_, index) => index.toString();

  /**
   * @function itemSeparator
   * returns separator component for flatlist
   *
   * @memberof OutfitListing
   */
  itemSeparator = () => <Separator />;

  render() {
    const { outfitDetails, categoryId } = this.props;
    const outfits = (outfitDetails && outfitDetails[categoryId]) || [];

    const flatlistContentContainerStyle = { paddingBottom: 32 };
    return (
      <Container
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        data={outfits}
        ItemSeparatorComponent={this.itemSeparator}
        contentContainerStyle={flatlistContentContainerStyle}
      />
    );
  }
}

OutfitListing.propTypes = {
  outfitDetails: PropTypes.arrayOf(Object),
  categoryId: PropTypes.string,
  labels: PropTypes.instanceOf(Object),
  //   navigation: PropTypes.instanceOf(Object),
};

OutfitListing.defaultProps = {
  outfitDetails: [],
  categoryId: '',
  labels: {},
  //   navigation: null,
};

export default OutfitListing;
