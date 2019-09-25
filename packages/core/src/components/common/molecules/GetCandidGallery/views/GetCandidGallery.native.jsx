/* istanbul ignore file */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { Anchor, BodyCopy, Button } from '../../../atoms';
import { getCandidData, getLabels } from '../../GetCandid/container/GetCandid.selectors';
import {
  Image,
  ItemWrapper,
  Title,
  ProfileImageWrapper,
  CaptionTextWrapper,
  ShopLookWrapper,
  ShopLookScroll,
  ShopLookItem,
  ShopLookItemCaption,
  Touchable,
  Wrapper,
  DescriptionWrapper,
  Divider,
  ButtonContainer,
} from '../styles/GetCandidGallery.style.native';
import { getScreenWidth } from '../../../../../utils/index.native';
import { DEFAULT_PAGE_SIZE } from '../config';

/**
 * @class GetCandidGallery - display images shared by customers on the Get candid gallery page
 * promote popular products and encourage more customers to buy them
 *
 * @param {candidData} candidData the list of data to display images
 * @param {labels} labels label data for get candid module
 * @param {navigation} navigation object containing navigate method
 */
class GetCandidGallery extends React.PureComponent {
  /**
   * state is used to handle active image on click
   * for FlatList component.
   */
  state = {
    activeIndex: 0,
    batchSizeMultiplier: 1,
  };

  /**
   * @function componentDidMount function is used to
   * set the index of the activeImage clicked on the homepage
   * as its index is passed in the navigation's param with
   * @key activeIndex
   */
  componentDidMount() {
    const { navigation } = this.props;
    const {
      state: {
        params: { activeIndex },
      },
    } = navigation;
    this.candidItemClickHandler(activeIndex);
  }

  /**
   * @function componentDidUpdate function is used to
   * check if the prevState multiplier and currentState multiplier
   * values are different inorder to focus the very first image
   * in the next batch.
   */
  componentDidUpdate(prevProps, prevState) {
    const { batchSizeMultiplier: prevMultiplier } = prevState;
    const { batchSizeMultiplier: currentMultiplier } = this.state;
    if (prevMultiplier !== currentMultiplier) {
      this.candidItemClickHandler(prevMultiplier * 20);
    }
  }

  /**
   * @function calculateItemHeight function to calculate
   * height of the main image
   * 0.8 = image width/height ratio as per design
   */
  calculateItemHeight = () => this.getImageSize() / 0.8;

  /**
   * @function getItemLayout function to calculate
   * the offset of the flatList item
   * to display it on top using scrollToIndex function
   */
  getItemLayout = (data, index) => {
    const length = this.calculateItemHeight() + 8;
    return { length, offset: length * index, index };
  };

  /**
   * @function candidItemClickHandler function to update
   * the active clicked image
   * and render its respective section
   * containing description and shopThisLook section
   * @params index is required of the clicked image
   */
  candidItemClickHandler = index => {
    const { activeIndex } = this.state;
    if (activeIndex !== index) {
      this.setState({
        activeIndex: index,
      });
      this.flatListRef.scrollToIndex({ animated: false, index });
    }
  };

  /**
   * @function keyExtractor function to get unique key
   * for FlatList component.
   */
  keyExtractor = (_, index) => index.toString();

  /**
   * @function getImageSize function to calculate size of
   * image dynamically as per screen size.
   */
  getImageSize = () => parseInt(getScreenWidth(), 10);

  /**
   * @function renderShopThisLook function to render main image
   *  description and shopThisLook section.
   */
  renderShopThisLook = data => {
    const tagItems = this.filterItemTags(data);
    const { navigation } = this.props;
    return (
      <ShopLookScroll horizontal showsHorizontalScrollIndicator={false}>
        {tagItems.map(({ Id, ImageUrl, DisplayText, TagId }) => (
          <ShopLookItem key={Id}>
            <Anchor
              onPress={() =>
                navigation.navigate('ProductDetail', {
                  title: DisplayText,
                  pdpUrl: TagId,
                  selectedColorProductId: TagId,
                  reset: true,
                })
              }
            >
              <Image source={{ uri: ImageUrl }} width={142} height={142} />
              <ShopLookItemCaption
                mobileFontFamily="secondary"
                fontSize="fs14"
                fontWeight="regular"
                color="gray.900"
                text={DisplayText}
                ellipsizeMode="tail"
                numberOfLines={2}
                textAlign="center"
              />
            </Anchor>
          </ShopLookItem>
        ))}
      </ShopLookScroll>
    );
  };

  /**
   * @function filterItemTags function to map tagIds
   * with Tags property in redux store
   */
  filterItemTags = itemTag => {
    const {
      candidData: { Tags },
    } = this.props;
    const tagsList = {};
    Tags.forEach(i => {
      tagsList[i.TagId] = i;
    });
    return itemTag.filter(item => item.TagType === 'Product').map(item => tagsList[item.TagId]);
  };

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
          User: { ProfilePicture },
          Caption,
        },
        StreamEntry: { Tags },
      },
      index,
    } = item;

    const image = StandardResolution;
    const { activeIndex } = this.state;
    const { labels } = this.props;
    return (
      <ItemWrapper key={index.toString()}>
        <Touchable accessibilityRole="image" onPress={() => this.candidItemClickHandler(index)}>
          <Image
            source={{ uri: image.Url }}
            width={this.getImageSize()}
            height={this.calculateItemHeight()}
          />
        </Touchable>
        {index === activeIndex && (
          <View>
            <DescriptionWrapper>
              <ProfileImageWrapper>
                <Image source={{ uri: ProfilePicture }} width={66} height={66} />
              </ProfileImageWrapper>
              <CaptionTextWrapper>
                <BodyCopy
                  mobileFontFamily="secondary"
                  fontSize="fs14"
                  fontWeight="regular"
                  color="gray.900"
                  text={Caption}
                />
              </CaptionTextWrapper>
            </DescriptionWrapper>
            <ShopLookWrapper>
              <Divider />
              <Title
                mobileFontFamily="primary"
                fontSize="fs20"
                fontWeight="regular"
                color="gray.900"
                text={labels.lbl_getCandid_titleShopThisLook.toUpperCase()}
                textAlign="center"
                letterSpacing="ls222"
              />
              {this.renderShopThisLook(Tags.Items)}
              <Divider marginBottom={16} />
            </ShopLookWrapper>
          </View>
        )}
      </ItemWrapper>
    );
  };

  /**
   * @function renderFlatListFooter default function of flatList
   * to render LoadMore button at the end of the list
   */
  renderFlatListFooter = () => {
    const { labels, candidData } = this.props;
    const candidDataLength = candidData.Views.length;
    const { batchSizeMultiplier } = this.state;
    const showLoadMore = candidDataLength > batchSizeMultiplier * DEFAULT_PAGE_SIZE;
    if (showLoadMore) {
      return (
        <ButtonContainer>
          <Button
            buttonVariation="variable-width"
            width="100%"
            text={labels.lbl_getCandid_btnLoadMore}
            fill="BLUE"
            color="white"
            onPress={this.loadMoreHandler}
          />
        </ButtonContainer>
      );
    }

    return null;
  };

  /**
   * @function loadMoreHandler function is used
   * to load data in batch of 20 by updating
   * batchSizeMultiplier in state
   */
  loadMoreHandler = () => {
    const { batchSizeMultiplier } = this.state;
    const newMultiplier = batchSizeMultiplier + 1;
    this.setState({
      batchSizeMultiplier: newMultiplier,
    });
  };

  render() {
    const { navigation, candidData } = this.props;
    const { batchSizeMultiplier } = this.state;
    const imagesCount = DEFAULT_PAGE_SIZE * batchSizeMultiplier;
    const data = candidData && candidData.Views.slice(0, imagesCount);
    const {
      state: {
        params: { activeIndex },
      },
    } = navigation;
    return (
      <Wrapper>
        {data && (
          <FlatList
            ref={ref => {
              this.flatListRef = ref;
            }}
            getItemLayout={this.getItemLayout}
            data={data}
            extraData={this.state}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            initialScrollIndex={activeIndex}
            ListFooterComponent={this.renderFlatListFooter}
          />
        )}
      </Wrapper>
    );
  }
}

GetCandidGallery.propTypes = {
  navigation: PropTypes.shape({}),
  candidData: PropTypes.shape({}),
  labels: PropTypes.shape({}),
};

GetCandidGallery.defaultProps = {
  candidData: {
    Settings: {},
    Views: [],
    Tags: [],
  },
  labels: {},
  navigation: {},
};

const mapStateToProps = state => {
  return {
    candidData: getCandidData(state),
    labels: getLabels(state),
  };
};

export default connect(
  mapStateToProps,
  {}
)(GetCandidGallery);
