import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../styles/CheckoutFooter.style';
import { Button, Image } from '../../../../../../common/atoms';
import { getIconPath } from '../../../../../../../utils';

const carrotLeft = getIconPath('carrot-left');

class CheckoutFooter extends React.PureComponent {
  render() {
    const {
      className,
      backLinkText,
      nextButtonText,
      disableNext,
      backLinkHandler,
      disableBackLink,
      hideBackLink,
      nextHandler,
      footerBody,
      ariaLabelBackLink,
      ariaLabelNextButton,
    } = this.props;
    return (
      <div className={className}>
        {footerBody && <div className="footer-body-container">{footerBody}</div>}
        <div className="footer-buttons">
          <div className="back-space">
            {hideBackLink && (
              <Button
                aria-label={ariaLabelBackLink}
                disabled={disableBackLink}
                type="button"
                className="back-link"
                onClick={backLinkHandler}
              >
                <Image src={carrotLeft} className="back-link-image" />
                {backLinkText}
              </Button>
            )}
          </div>
          <Button
            disabled={disableNext}
            aria-label={ariaLabelNextButton}
            type="submit"
            className="footer-button"
            fontSize="fs14"
            fontWeight="extrabold"
            buttonVariation="variable-width"
            fill="BLUE"
            onClick={nextHandler}
          >
            {nextButtonText}
          </Button>
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
};

CheckoutFooter.defaultProps = {
  hideBackLink: false,
};

export default withStyles(CheckoutFooter, style);
export { CheckoutFooter as CheckoutFooterVanilla };
