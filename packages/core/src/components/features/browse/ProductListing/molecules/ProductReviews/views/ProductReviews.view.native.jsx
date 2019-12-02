import React from 'react';
import { PropTypes } from 'prop-types';
import { Platform, Image, SafeAreaView } from 'react-native';
import { getBrand, getAPIConfig } from '@tcp/core/src/utils';
import { WebView } from 'react-native-webview';

import { BodyCopy, Anchor } from '../../../../../../common/atoms';
import {
  RichTextContainer,
  AccordionHeader,
  ImageStyleWrapper,
  ProductRatingsContainer,
} from '../styles/ProductReviews.style.native';
import ModalNative from '../../../../../../common/molecules/Modal/index';
import LoginPageContainer from '../../../../../account/LoginPage/index';

const downIcon = require('../../../../../../../assets/carrot-small-down.png');
const upIcon = require('../../../../../../../assets/carrot-small-up.png');

class ProductReviews extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAccordionOpen: props.expanded,
      showModal: false,
    };
    this.handleWebViewEvents = this.handleWebViewEvents.bind(this);
    this.apiConfig = getAPIConfig();
  }

  handleAccordionToggle = () => {
    const { isAccordionOpen } = this.state;
    this.setState({ isAccordionOpen: !isAccordionOpen });
  };

  getFormattedUrl = (isGuest, userId, mprId, ratingsProductId) => {
    const { getSecurityToken } = this.props;
    const brand = getBrand();
    const bvBrand = brand && brand.toUpperCase();
    const securityToken = !isGuest ? getSecurityToken(userId, mprId) : '';

    return `${
      this.apiConfig.BV_WEB_VIEW_URL
    }?securityToken=${securityToken}&brand=${bvBrand}&productId=${ratingsProductId}`;
  };

  handleWebViewEvents = event => {
    switch (event.nativeEvent.data) {
      case 'openLogin':
        this.toggleModal();
        break;
      case 'closeRating':
        this.handleAccordionToggle();
        break;
      default:
        this.handleAccordionToggle();
    }
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  renderComponent = isGuest => {
    let componentContainer = null;
    if (isGuest) {
      componentContainer = (
        <LoginPageContainer
          onRequestClose={this.toggleModal}
          isUserLoggedIn={!isGuest}
          showLogin={this.showloginModal}
          handleAfterLogin={this.toggleModal}
        />
      );
    }
    return <React.Fragment>{componentContainer}</React.Fragment>;
  };

  render() {
    const {
      ratingsAndReviewsLabel,
      ratingsProductId,
      isGuest,
      userId,
      mprId,
      reviewsCount,
    } = this.props;
    const { isAccordionOpen, margins, showModal } = this.state;

    const bvFormHTML =
      isAccordionOpen && this.getFormattedUrl(isGuest, userId, mprId, ratingsProductId);

    return (
      <ProductRatingsContainer margins={margins}>
        <AccordionHeader onPress={this.handleAccordionToggle}>
          <BodyCopy
            fontFamily="secondary"
            fontWeight="black"
            fontSize="fs14"
            isAccordionOpen={isAccordionOpen}
            text={`${ratingsAndReviewsLabel.lbl_ratings_and_reviews} (${reviewsCount})`}
            textAlign="center"
          />

          <ImageStyleWrapper>
            <Anchor onPress={this.handleAccordionToggle}>
              <Image source={isAccordionOpen ? upIcon : downIcon} />
            </Anchor>
          </ImageStyleWrapper>
        </AccordionHeader>

        {isAccordionOpen ? (
          <RichTextContainer>
            <WebView
              originWhitelist={['*']}
              source={{
                uri: bvFormHTML,
              }}
              mixedContentMode="always"
              useWebKit={Platform.OS === 'ios'}
              scrollEnabled
              domStorageEnabled
              thirdPartyCookiesEnabled
              startInLoadingState
              allowUniversalAccessFromFileURLs
              javaScriptEnabled
              onMessage={this.handleWebViewEvents}
              automaticallyAdjustContentInsets={false}
            />
          </RichTextContainer>
        ) : null}

        {showModal && (
          <ModalNative
            isOpen={showModal}
            onRequestClose={this.toggleModal}
            heading="LOG IN"
            headingFontFamily="secondary"
            fontSize="fs16"
          >
            <SafeAreaView>{this.renderComponent(isGuest)}</SafeAreaView>
          </ModalNative>
        )}
      </ProductRatingsContainer>
    );
  }
}

ProductReviews.propTypes = {
  ratingsProductId: PropTypes.string.isRequired,
  isGuest: PropTypes.bool.isRequired,
  expanded: PropTypes.bool,
  userId: PropTypes.string,
  mprId: PropTypes.string,
  reviewsCount: PropTypes.number,
  ratingsAndReviewsLabel: PropTypes.string,
  getSecurityToken: PropTypes.func.isRequired,
};

ProductReviews.defaultProps = {
  userId: '',
  mprId: '',
  reviewsCount: 0,
  ratingsAndReviewsLabel: '',
  expanded: false,
};

export default ProductReviews;
export { ProductReviews as ProductReviewsVanilla };
