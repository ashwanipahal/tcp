import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import CheckoutFooter from '../../../molecules/CheckoutFooter';
import styles from '../styles/ReviewPage.style';
import { CHECKOUT_ROUTES } from '../../../Checkout.constants';
import utility from '../../../util/utility';
import { Anchor } from '../../../../../../common/atoms';
import PickUpReviewSectionContainer from '../organisms/PickUpReviewSection';
import ShippingReviewSection from '../organisms/ShippingReviewSection';
import BillingSection from '../organisms/BillingSection';

class ReviewPage extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    labels: PropTypes.shape({}).isRequired,
    submitReview: PropTypes.func.isRequired,
    orderHasShipping: PropTypes.bool.isRequired,
    orderHasPickUp: PropTypes.bool.isRequired,
  };

  handleDefaultLinkClick = e => {
    e.preventDefault();
  };

  render() {
    const { className, labels, orderHasPickUp, orderHasShipping, submitReview } = this.props;
    const {
      header,
      backLinkBilling,
      nextSubmitText,
      applyConditionPreText,
      applyConditionTermsText,
      applyConditionAndText,
      applyConditionPolicyText,
      ariaLabelBackLink,
      ariaLabelSubmitOrderButton,
    } = labels;

    return (
      <div className={className}>
        <CheckoutSectionTitleDisplay title={header} dataLocator="review-title" />
        {!!orderHasPickUp && (
          <div className="review-pickup">
            <PickUpReviewSectionContainer
              onEdit={() => {
                utility.routeToPage(CHECKOUT_ROUTES.pickupPage);
              }}
            />
          </div>
        )}
        {!!orderHasShipping && (
          <div className="review-shipping">
            <ShippingReviewSection
              onEdit={() => {
                utility.routeToPage(CHECKOUT_ROUTES.shippingPage);
              }}
            />
          </div>
        )}
        <BillingSection />
        <CheckoutFooter
          hideBackLink
          ariaLabelBackLink={ariaLabelBackLink}
          ariaLabelNextButton={ariaLabelSubmitOrderButton}
          backLinkHandler={() => utility.routeToPage(CHECKOUT_ROUTES.billingPage)}
          nextButtonText={nextSubmitText}
          backLinkText={backLinkBilling}
          nextHandler={submitReview}
          footerBody={[
            applyConditionPreText,
            <Anchor
              underline
              to="/#"
              dataLocator="termAndConditionText"
              onClick={this.handleDefaultLinkClick}
            >
              {applyConditionTermsText}
            </Anchor>,
            applyConditionAndText,
            <Anchor
              underline
              to="/#"
              dataLocator="PrivacyText"
              onClick={this.handleDefaultLinkClick}
            >
              {applyConditionPolicyText}
            </Anchor>,
          ]}
        />
      </div>
    );
  }
}

export default withStyles(ReviewPage, styles);
export { ReviewPage as ReviewPageVanilla };
