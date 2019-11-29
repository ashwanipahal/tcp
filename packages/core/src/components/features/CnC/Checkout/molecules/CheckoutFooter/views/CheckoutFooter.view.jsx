import React from 'react';
import PropTypes from 'prop-types';
import LoaderSkelton from '@tcp/core/src/components/common/molecules/LoaderSkelton';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../styles/CheckoutFooter.style';
import PayPalButton from '../../../../common/organism/PayPalButton';
import { Button } from '../../../../../../common/atoms';
import VenmoPaymentButton from '../../../../../../common/atoms/VenmoPaymentButton';
import ErrorMessage from '../../../../common/molecules/ErrorMessage';

class CheckoutFooter extends React.PureComponent {
  renderSkeleton = (showVenmoSubmit, showPayPalButton) => {
    return (
      <>
        {!showVenmoSubmit && !showPayPalButton && (
          <div className="footer-button footer-button-mob">
            <LoaderSkelton />
          </div>
        )}
      </>
    );
  };

  renderNextButton = () => {
    const {
      showVenmoSubmit,
      showPayPalButton,
      disableNext,
      ariaLabelNextButton,
      nextHandler,
      nextButtonText,
      bagLoading,
    } = this.props;
    return !showVenmoSubmit && !showPayPalButton && !bagLoading ? (
      <Button
        disabled={disableNext}
        aria-label={ariaLabelNextButton}
        type="submit"
        className="footer-button footer-button-mob"
        fontSize="fs14"
        fontWeight="extrabold"
        buttonVariation="variable-width"
        fill="BLUE"
        onClick={nextHandler}
        dataLocator="reviewBtn"
      >
        {nextButtonText}
      </Button>
    ) :
      (
        <>
          {!showVenmoSubmit && !showPayPalButton && (
            <div className="footer-button footer-button-mob">
              <LoaderSkelton />
            </div>
          )}
        </>
      );
  };

  render() {
    const {
      className,
      backLinkText,
      nextButtonText,
      disableNext,
      backLinkHandler,
      disableBackLink,
      disableDesktopOnlyNext,
      hideBackLink,
      nextHandler,
      footerBody,
      ariaLabelBackLink,
      ariaLabelNextButton,
      showVenmoSubmit, // Show Venmo Submit on billing page on selecting venmo payment method
      showPayPalButton,
      continueWithText,
      onVenmoSubmit,
      venmoError,
      bagLoading,
    } = this.props;
    return (
      <div className={className}>
        {footerBody && <div className="footer-body-container">{footerBody}</div>}
        <div className="footer-buttons">
          {showVenmoSubmit ? (
            <>
              <VenmoPaymentButton
                className="footer-venmo-button"
                continueWithText={continueWithText}
                onSuccess={onVenmoSubmit}
                isVenmoBlueButton
              />
              {venmoError && <ErrorMessage error={venmoError} className="checkout-page-error" />}
            </>
          ) : (
              this.renderNextButton()
            )}
          <div className="back-space">
            {hideBackLink && (
              <Button
                aria-label={ariaLabelBackLink}
                disabled={disableBackLink}
                type="button"
                className="back-link"
                onClick={backLinkHandler}
                dataLocator="returnToLink"
              >
                <span className="left-arrow"> </span>
                {backLinkText}
              </Button>
            )}
          </div>
          {showPayPalButton && (
            <div className="footer-paypal-button">
              <PayPalButton
                className="payPal-button"
                containerId="billing-footer-page"
                isBillingPage
              />
            </div>
          )}
          {!showVenmoSubmit && !showPayPalButton && !bagLoading ? (
            <Button
              disabled={disableDesktopOnlyNext || disableNext}
              aria-label={ariaLabelNextButton}
              type="submit"
              className="footer-button footer-button-web"
              fontSize="fs14"
              fontWeight="extrabold"
              buttonVariation="variable-width"
              fill="BLUE"
              onClick={nextHandler}
              dataLocator="reviewBtn"
            >
              {nextButtonText}
            </Button>
          ) : (
              this.renderSkeleton()
            )}
        </div>
      </div>
    );
  }
}

CheckoutFooter.propTypes = {
  className: PropTypes.string.isRequired,
  backLinkText: PropTypes.string.isRequired,
  nextButtonText: PropTypes.string.isRequired,
  ariaLabelBackLink: PropTypes.string.isRequired,
  ariaLabelNextButton: PropTypes.string.isRequired,
  disableNext: PropTypes.bool.isRequired,
  backLinkHandler: PropTypes.func.isRequired,
  nextHandler: PropTypes.oneOf([PropTypes.func, undefined]).isRequired,
  disableBackLink: PropTypes.bool.isRequired,
  hideBackLink: PropTypes.bool,
  footerBody: PropTypes.shape({}).isRequired,
  showVenmoSubmit: PropTypes.bool,
  showPayPalButton: PropTypes.bool,
  disableDesktopOnlyNext: PropTypes.bool,
  continueWithText: PropTypes.string,
  onVenmoSubmit: PropTypes.func, // Venmo Submit for billing page, redirect to review page once already authorized or new authorization with the venmo app.
  venmoError: PropTypes.string,
  bagLoading: PropTypes.bool,
};

CheckoutFooter.defaultProps = {
  hideBackLink: false,
  showVenmoSubmit: false,
  showPayPalButton: false,
  disableDesktopOnlyNext: false,
  continueWithText: '',
  onVenmoSubmit: () => { },
  venmoError: '',
  bagLoading: false
};

export default withStyles(CheckoutFooter, style);
export { CheckoutFooter as CheckoutFooterVanilla };
