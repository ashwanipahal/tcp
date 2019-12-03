import React from 'react';
import { PropTypes } from 'prop-types';
import { Platform, Image, SafeAreaView } from 'react-native';
import { getBrand, getAPIConfig, getScreenHeight } from '@tcp/core/src/utils';
import { WebView } from 'react-native-webview';

import { BodyCopy, Anchor } from '../../../../../../common/atoms';
import {
  RichTextContainer,
  AccordionHeader,
  ImageStyleWrapper,
  ProductRatingsContainer,
  SubmissionFormWrapper,
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
      showLoginModal: false,
      openSubmissionForm: false,
    };
    this.handleWebViewEvents = this.handleWebViewEvents.bind(this);
    this.apiConfig = getAPIConfig();
    this.brand = getBrand();
  }

  handleAccordionToggle = () => {
    const { isAccordionOpen } = this.state;
    this.setState({ isAccordionOpen: !isAccordionOpen });
  };

  getWriteReviewFormattedUrl = ratingsProductId => {
    // const { getSecurityToken } = this.props;
    // const bvBrand = this.brand  && this.brand.toUpperCase();
    // const securityToken = !isGuest ? getSecurityToken(userId, mprId) : '';

    return `${this.apiConfig.BV_WEB_VIEW_URL}?productId=${ratingsProductId}&env=${
      this.apiConfig.BV_ENVIRONMENT
    }&instance=${this.apiConfig.BV_INSTANCE}`;
  };

  getSubmissionFormUrl = (userId, mprId, productId) => {
    const { getSecurityToken } = this.props;
    const securityToken = getSecurityToken(userId, mprId);

    const bvFormUrl = this.apiConfig.BV_SUBMISSION_URL.replace(
      '#INSTANCE#',
      this.apiConfig.BV_INSTANCE
    );
    return bvFormUrl.replace('#PRODUCTID#', productId).replace('#TOKEN#', securityToken);
  };

  handleWebViewEvents = event => {
    switch (event.nativeEvent.data) {
      case 'writeReview':
        this.handleWriteReviewClick();
        break;
      case 'closeRating':
        this.handleAccordionToggle();
        break;
      default:
        this.handleWriteReviewClick();
    }
  };

  handleWriteReviewClick = () => {
    const { isGuest } = this.props;
    if (isGuest) {
      this.toggleLoginModal();
    } else {
      this.toggleSubmissionForm();
    }
  };

  toggleLoginModal = () => {
    this.setState(state => ({
      showLoginModal: !state.showLoginModal,
    }));
  };

  toggleSubmissionForm = () => {
    this.setState(state => ({
      openSubmissionForm: !state.openSubmissionForm,
      isAccordionOpen: false,
    }));
  };

  renderComponent = isGuest => {
    let componentContainer = null;
    if (isGuest) {
      componentContainer = (
        <LoginPageContainer
          onRequestClose={this.toggleLoginModal}
          isUserLoggedIn={!isGuest}
          showLogin={this.showloginModal}
          handleAfterLogin={this.toggleLoginModal}
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
    const { isAccordionOpen, margins, showLoginModal, openSubmissionForm } = this.state;

    const bvReviewHtmlUrl = isAccordionOpen && this.getWriteReviewFormattedUrl(ratingsProductId);

    const bvSubmissionFormHtmlUrl =
      openSubmissionForm && this.getSubmissionFormUrl(userId, mprId, ratingsProductId);

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
                uri: bvReviewHtmlUrl,
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

        {showLoginModal && (
          <ModalNative
            isOpen={showLoginModal}
            onRequestClose={this.toggleLoginModal}
            heading={ratingsAndReviewsLabel.lbl_login_modal_title}
            headingFontFamily="secondary"
            fontSize="fs16"
          >
            <SafeAreaView>{this.renderComponent(isGuest)}</SafeAreaView>
          </ModalNative>
        )}

        {openSubmissionForm ? (
          <ModalNative
            isOpen={openSubmissionForm}
            onRequestClose={this.toggleSubmissionForm}
            heading={ratingsAndReviewsLabel.lab_rating_form_title}
            headingFontFamily="secondary"
            fontSize="fs16"
          >
            <SafeAreaView>
              <SubmissionFormWrapper height={getScreenHeight()}>
                <WebView
                  originWhitelist={['*']}
                  source={{
                    uri: bvSubmissionFormHtmlUrl,
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
              </SubmissionFormWrapper>
            </SafeAreaView>
          </ModalNative>
        ) : null}
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
  ratingsAndReviewsLabel: PropTypes.shape({}).isRequired,
  getSecurityToken: PropTypes.func.isRequired,
};

ProductReviews.defaultProps = {
  userId: '',
  mprId: '',
  reviewsCount: 0,
  expanded: false,
};

export default ProductReviews;
export { ProductReviews as ProductReviewsVanilla };
