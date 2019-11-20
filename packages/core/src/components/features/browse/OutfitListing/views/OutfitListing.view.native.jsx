import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Image, Anchor, Skeleton } from '../../../../common/atoms';
import { getScreenWidth } from '../../../../../utils/index.native';
import { Container, Separator, AnchorStyle } from '../OutfitListing.style.native';
import PromoModules from '../../../../common/organisms/PromoModules';

class OutfitListing extends React.PureComponent {
  /**
   * @function navigateToOutfitDetails
   * navigates to outfit details
   *
   * @memberof OutfitListing
   */
  navigateToOutfitDetails = item => {
    const { navigation } = this.props;
    const { id, subItemsId } = item;
    if (navigation)
      navigation.navigate('OutfitDetail', {
        title: 'COMPLETE THE LOOK',
        outfitId: id,
        vendorColorProductIdsList: subItemsId,
      });
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
          onPress={() => this.navigateToOutfitDetails(item)}
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
    const {
      outfitDetails,
      outfitDetails: { isFetchingDataForOutfit },
      asPath,
      plpTopPromos,
      navigation,
    } = this.props;
    const outfits = (outfitDetails && outfitDetails[asPath]) || [];

    const flatlistContentContainerStyle = { paddingBottom: 32 };
    if (isFetchingDataForOutfit)
      return (
        <ScrollView>
          <Skeleton row={6} col={1} outFitSkeleton height={350} width={getScreenWidth() - 24} />
        </ScrollView>
      );
    return (
      <>
        <PromoModules plpTopPromos={plpTopPromos} navigation={navigation} />
        <Container
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          data={outfits}
          ItemSeparatorComponent={this.itemSeparator}
          contentContainerStyle={flatlistContentContainerStyle}
        />
      </>
    );
  }
}

OutfitListing.propTypes = {
  outfitDetails: PropTypes.arrayOf(Object),
  asPath: PropTypes.string,
  labels: PropTypes.instanceOf(Object),
  navigation: PropTypes.instanceOf(Object),
  plpTopPromos: PropTypes.instanceOf(Object),
};

OutfitListing.defaultProps = {
  outfitDetails: [],
  asPath: '',
  labels: {},
  navigation: null,
  plpTopPromos: null,
};

export default OutfitListing;
