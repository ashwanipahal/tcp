import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../../../common/atoms/Button';
import withStyles from '../../../../common/hoc/withStyles';
import OpenLoginModal from '../../../account/LoginPage/views/LoginModal';
import style from '../styles/AddedToBagActions.style';
import PayPalButton from '../../../../common/atoms/PaypalButton';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import { getLocator } from '../../../../../utils';

class AddedToBagActions extends React.Component<Props> {
  loginModalOpenClick = e => {
    const { setCheckoutModalMountState } = this.props;
    e.preventDefault();
    setCheckoutModalMountState({ state: true });
  };

  render() {
    const {
      className,
      labels,
      onClickViewBag,
      showAddTobag,
      setCheckoutModalMountState,
      checkoutModalMountedState,
    } = this.props;
    return (
      <div className={className}>
        {showAddTobag && (
          <Row>
            <Col colSize={{ medium: 8, large: 12, small: 6 }}>
              <Button
                onClick={onClickViewBag}
                data-locator={getLocator('addedtobag_btnviewbag')}
                className="view-bag"
              >
                <BodyCopy
                  component="span"
                  color="white"
                  fontWeight="extrabold"
                  fontFamily="secondary"
                  fontSize="fs14"
                >
                  {labels.viewBag}
                </BodyCopy>
              </Button>
            </Col>
          </Row>
        )}
        <Row className="checkout-button">
          <PayPalButton className="payPal-button" />
          <Button
            data-locator={getLocator('addedtobag_btncheckout')}
            className="checkout"
            onClick={e => this.loginModalOpenClick(e)}
          >
            <BodyCopy
              component="span"
              color="white"
              fontWeight="extrabold"
              fontFamily="secondary"
              fontSize="fs14"
            >
              {labels.checkout}
            </BodyCopy>
          </Button>
        </Row>
        <OpenLoginModal
          variation="checkout"
          setLoginModalMountState={setCheckoutModalMountState}
          openState={checkoutModalMountedState}
        />
      </div>
    );
  }
}

AddedToBagActions.propTypes = {
  className: PropTypes.string.isRequired,
  onClickViewBag: PropTypes.func.isRequired,
  labels: PropTypes.shape.isRequired,
  showAddTobag: PropTypes.bool,
};
AddedToBagActions.defaultProps = {
  showAddTobag: true,
};

export default withStyles(AddedToBagActions, style);
export { AddedToBagActions as AddedToBagActionsVanilla };
