import React from 'react';
import { View } from 'react-native';
import { PropTypes } from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import Styles from '../styles/LoyaltyFooterSection.style';
import { BodyCopy, Anchor } from '../../../../../../common/atoms';

const renderApplyNowLink = labels => {
  return (
    <View className="applyNowLink">
      <Anchor
        className="learnMore"
        fontSizeVariation="medium"
        anchorVariation="primary"
        View={labels.applyNow}
        underline
      />
    </View>
  );
};

const renderLearnMoreLink = labels => {
  return (
    <Anchor
      className="learnMore"
      fontSizeVariation="medium"
      anchorVariation="primary"
      View={labels.learnMore}
      underline
    />
  );
};

const renderCreateAccountLink = labels => {
  return (
    <Anchor
      className="learnMore"
      fontSizeVariation="medium"
      anchorVariation="primary"
      View={labels.createMyPlaceRewardsAccount}
      underline
    />
  );
};

const renderLoginLink = labels => {
  return (
    <Anchor
      className="learnMore"
      fontSizeVariation="medium"
      anchorVariation="primary"
      View={labels.logIn}
      underline
    />
  );
};

const createLoginLinks = labels => {
  return (
    <View className="links-wrapper">
      <View className="links-container">
        <View>{renderCreateAccountLink(labels)}</View>
        <View className="elem-pl-XL">{renderLoginLink(labels)}</View>
      </View>
    </View>
  );
};

const applyLearnLinks = labels => {
  return (
    <View className="links-wrapper">
      <View className="links-container">
        {renderApplyNowLink()}
        <View className="learnSymbolWrapper elem-pl-XL">
          <BodyCopy
            className="symbolWrapper"
            color="View.primary"
            component="View"
            fontFamily="secondary"
            fontWeight="regular"
            fontSize="fs9"
            View={`${labels.sectionSymbol}${labels.asteriskSymbol}`}
          />
          {renderLearnMoreLink(labels)}
        </View>
      </View>
    </View>
  );
};

const addedToBagPageLinks = (labels, isGuest, isPlcc, earnedReward) => {
  return (
    <>
      {isGuest && createLoginLinks(labels)}
      {!isGuest && !isPlcc && (
        <>
          {!earnedReward && applyLearnLinks(labels)}
          {earnedReward && <View className="links-wrapper">{renderLearnMoreLink(labels)}</View>}
        </>
      )}
      {!isGuest && isPlcc && <View className="links-wrapper">{renderLearnMoreLink(labels)}</View>}
    </>
  );
};

const renderConfirmationAndBagLinks = (
  labels,
  isConfirmationPage,
  isPlcc,
  isGuest,
  earnedReward
) => {
  return (
    <>
      {!isConfirmationPage && (
        <>
          {!isPlcc && applyLearnLinks(labels)}
          {isPlcc && <View className="links-wrapper">{renderLearnMoreLink(labels)}</View>}
        </>
      )}
      {isConfirmationPage && isGuest && earnedReward && createLoginLinks(labels)}
    </>
  );
};

const detailViewFooter = (labels, isProductDetailView, isGuest, isPlcc) => {
  return (
    <>
      {isProductDetailView && (
        <View>
          {isGuest && (
            <View>
              {renderCreateAccountLink(labels)}
              {renderLoginLink(labels)}
            </View>
          )}
          {!isGuest && (
            <>
              {!isPlcc && (
                <View>
                  {renderApplyNowLink()}
                  {renderLearnMoreLink(labels)}
                </View>
              )}
              {isPlcc && <View>{renderLearnMoreLink(labels)}</View>}
            </>
          )}
        </View>
      )}
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
    earnedReward,
  } = props;
  return (
    <View className={`${className} footerWrapper`}>
      {isProductDetailView && detailViewFooter()}
      {isAddedToBagPage && addedToBagPageLinks(labels, isGuest, isPlcc, earnedReward)}
      {!isProductDetailView && !isAddedToBagPage && (
        <>
          {!isReviewPage &&
            renderConfirmationAndBagLinks(
              labels,
              isConfirmationPage,
              isPlcc,
              isGuest,
              earnedReward
            )}
          {isReviewPage && isPlcc && (
            <View className="links-wrapper">{renderLearnMoreLink(labels)}</View>
          )}
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
  earnedReward: PropTypes.bool,
  isAddedToBagPage: PropTypes.bool,
};

LoyaltyFooterSection.defaultProps = {
  className: '',
  isPlcc: false,
  isGuest: false,
  isReviewPage: false,
  isProductDetailView: false,
  isConfirmationPage: false,
  earnedReward: false,
  isAddedToBagPage: false,
};

export default withStyles(LoyaltyFooterSection, Styles);
export { LoyaltyFooterSection as LoyaltyFooterSectionVanilla };
