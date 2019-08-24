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
      backLinkText = 'Return to Pickup',
      nextButtonText = 'NEXT: BILLING',
      disableNext,
      backLinkHandler,
      disableBackLink,
    } = this.props;
    return (
      <div className={className}>
        <Button
          disabled={disableBackLink}
          type="button"
          className="back-link"
          onClick={backLinkHandler}
        >
          <Image src={carrotLeft} className="back-link-image" />
          {backLinkText}
        </Button>
        <Button disabled={disableNext} type="submit" className="footer-button">
          {nextButtonText}
        </Button>
      </div>
    );
  }
}

CheckoutFooter.propTypes = {
  className: PropTypes.string.isRequired,
  backLinkText: PropTypes.string.isRequired,
  nextButtonText: PropTypes.string.isRequired,
  disableNext: PropTypes.bool.isRequired,
  backLinkHandler: PropTypes.func.isRequired,
  disableBackLink: PropTypes.bool.isRequired,
};

export default withStyles(CheckoutFooter, style);
