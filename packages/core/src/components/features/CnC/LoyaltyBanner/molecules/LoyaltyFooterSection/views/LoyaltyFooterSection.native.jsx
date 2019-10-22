import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/LoyaltyFooterSection.style';
import { Anchor } from '../../../../../../common/atoms';
import { FooterLinksSection, LearnMoreWrapper } from '../styles/LoyaltyFooterSection.style.native';

const renderApplyNowLink = labels => {
  return (
    <Anchor
      className="applyNow"
      fontSizeVariation="medium"
      anchorVariation="primary"
      text={labels.applyNow}
      underline
    />
  );
};

const renderLearnMoreLink = labels => {
  return (
    <Anchor
      className="learnMore"
      fontSizeVariation="medium"
      anchorVariation="primary"
      text={labels.learnMore}
      underline
    />
  );
};

const renderCreateAccountLink = labels => {
  return (
    <Anchor
      className="createAccount"
      fontSizeVariation="medium"
      anchorVariation="primary"
      text={labels.createMyPlaceRewardsAccount}
      underline
    />
  );
};

const renderLoginLink = labels => {
  return (
    <Anchor
      className="logIn"
      fontSizeVariation="medium"
      anchorVariation="primary"
      text={labels.logIn}
      underline
    />
  );
};

const applyNowLearnMoreLinks = labels => {
  return (
    <FooterLinksSection>
      {renderApplyNowLink(labels)}
      <LearnMoreWrapper>{renderLearnMoreLink(labels)}</LearnMoreWrapper>
    </FooterLinksSection>
  );
};

const LearnMoreLink = labels => {
  return <FooterLinksSection>{renderLearnMoreLink(labels)}</FooterLinksSection>;
};

const createAccLogInLinks = labels => {
  return (
    <FooterLinksSection>
      {renderCreateAccountLink(labels)}
      <LearnMoreWrapper>{renderLoginLink(labels)}</LearnMoreWrapper>
    </FooterLinksSection>
  );
};

const productDetailViewFooter = (labels, isProductDetailView, isGuest, isPlcc) => {
  return (
    <>
      {isProductDetailView && (
        <>
          {isGuest && createAccLogInLinks(labels)}
          {!isGuest && (
            <>
              {!isPlcc && applyNowLearnMoreLinks(labels)}
              {isPlcc && LearnMoreLink(labels)}
            </>
          )}
        </>
      )}
    </>
  );
};

const addedToBagPageLinks = (labels, isGuest, isPlcc, earnedRewardAvailable) => {
  return (
    <>
      {isGuest && createAccLogInLinks(labels)}
      {!isGuest && (
        <>
          {!isPlcc && (
            <>
              {!earnedRewardAvailable && applyNowLearnMoreLinks(labels)}
              {earnedRewardAvailable && LearnMoreLink(labels)}
            </>
          )}
          {isPlcc && LearnMoreLink(labels)}
        </>
      )}
    </>
  );
};

const renderConfirmationAndBagLinks = (
  labels,
  isConfirmationPage,
  isPlcc,
  isGuest,
  earnedRewardAvailable
) => {
  return (
    <>
      {!isConfirmationPage && (
        <>
          {!isPlcc && applyNowLearnMoreLinks(labels)}
          {isPlcc && LearnMoreLink(labels)}
        </>
      )}
      {isConfirmationPage && isGuest && earnedRewardAvailable && createAccLogInLinks(labels)}
    </>
  );
};

const LoyaltyFooterSection = props => {
  const {
    labels,
    className,
    isProductDetailView,
    isGuest,
    isPlcc,
    isReviewPage,
    isConfirmationPage,
    isAddedToBagPage,
    earnedRewardAvailable,
  } = props;
  return (
    <View className={`${className} footerWrapper`}>
      {isProductDetailView && productDetailViewFooter(labels, isProductDetailView, isGuest, isPlcc)}
      {isAddedToBagPage && addedToBagPageLinks(labels, isGuest, isPlcc, earnedRewardAvailable)}
      {!isProductDetailView && !isAddedToBagPage && (
        <>
          {!isReviewPage &&
            renderConfirmationAndBagLinks(
              labels,
              isConfirmationPage,
              isPlcc,
              isGuest,
              earnedRewardAvailable
            )}
          {isReviewPage && isPlcc && LearnMoreLink(labels)}
        </>
      )}
    </View>
  );
};

LoyaltyFooterSection.propTypes = {
  labels: PropTypes.shape.isRequired,
  className: PropTypes.string,
  isPlcc: PropTypes.bool,
  isGuest: PropTypes.bool,
  isReviewPage: PropTypes.bool,
  isProductDetailView: PropTypes.bool,
  isConfirmationPage: PropTypes.bool,
  earnedRewardAvailable: PropTypes.bool,
  isAddedToBagPage: PropTypes.bool,
};

LoyaltyFooterSection.defaultProps = {
  className: '',
  isPlcc: false,
  isGuest: false,
  isReviewPage: false,
  isProductDetailView: false,
  isConfirmationPage: false,
  earnedRewardAvailable: false,
  isAddedToBagPage: false,
};

export default withStyles(LoyaltyFooterSection, Styles);
export { LoyaltyFooterSection as LoyaltyFooterSectionVanilla };
