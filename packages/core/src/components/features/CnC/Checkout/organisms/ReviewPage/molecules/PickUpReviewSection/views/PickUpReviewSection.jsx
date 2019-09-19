import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import Row from '../../../../../../../../common/atoms/Row';
import Col from '../../../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../../../common/atoms/Anchor';
import styles from '../styles/PickUpReviewSection.style';
import PickupStoreDisplay from '../../PickUpStoreDisplay';
import PickUpContactDisplay from '../../PickUpContactDisplay';

export class PickUpReviewSection extends React.PureComponent {
  handleEnterEditModeClick = event => {
    event.preventDefault();
  };

  render() {
    const {
      className,
      pickUpContactPerson,
      pickUpLabels,
      cartStores,
      pickUpAlternatePerson,
      isHasPickUpAlternatePerson,
    } = this.props;
    console.log('pickUpAlternate', pickUpAlternatePerson);
    return (
      <div className={className} dataLocator="alternate-div">
        <Row fullBleed className="row-one">
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            {pickUpContactPerson && (
              <React.Fragment>
                <div className="header">
                  <BodyCopy fontSize="fs26" fontFamily="primary" fontWeight="regular">
                    {pickUpLabels.pickupContactText}
                  </BodyCopy>
                  <div className="EditAnchor">
                    <Anchor
                      underline
                      anchorVariation="secondary"
                      fontSize="fs12"
                      fontFamily="secondary"
                      dataLocator="pickup-pickupContact-edit-anchor"
                      onClick={this.handleEnterEditModeClick}
                      className="anchorStyle"
                    >
                      {pickUpLabels.anchorEdit}
                    </Anchor>
                  </div>
                </div>
                <BodyCopy fontSize="fs16" fontFamily="primary" fontWeight="regular">
                  We will send you an email when your order is ready. A government issued ID is
                  required to pick up the order.
                </BodyCopy>
              </React.Fragment>
            )}
          </Col>
        </Row>
        <Row fullBleed className="row-two">
          {cartStores.map(store => {
            return (
              store && (
                <Col key={store.storeId} colSize={{ small: 6, medium: 4, large: 5 }}>
                  <PickupStoreDisplay orderType={store.orderType} store={store} />
                </Col>
              )
            );
          })}
        </Row>
        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 4, large: 5 }}>
            <BodyCopy fontSize="fs16" fontFamily="secondary" fontWeight="extrabold">
              {pickUpLabels.pickupContactText}
            </BodyCopy>
            <PickUpContactDisplay formData={pickUpContactPerson} />
          </Col>
          {isHasPickUpAlternatePerson && (
            <Col colSize={{ small: 6, medium: 4, large: 5 }}>
              <BodyCopy fontSize="fs16" fontFamily="secondary" fontWeight="extrabold">
                Alternate Pickup Contact
              </BodyCopy>
              <PickUpContactDisplay formData={pickUpContactPerson} />
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

PickUpReviewSection.propTypes = {
  className: PropTypes.string.isRequired,
  pickUpLabels: PropTypes.shape({}),
  pickUpContactPerson: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    emailAddress: PropTypes.string,
    phoneNumber: PropTypes.string.isRequired,
  }),
  pickUpAlternatePerson: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
  }),
  isHasPickUpAlternatePerson: PropTypes.bool.isRequired,
  cartStores: PropTypes.shape({}).isRequired,
};

PickUpReviewSection.defaultProps = {
  pickUpLabels: {},
  pickUpContactPerson: {
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
  },
  pickUpAlternatePerson: {
    firstName: '',
    lastName: '',
    emailAddress: '',
  },
};

export default withStyles(PickUpReviewSection, styles);
