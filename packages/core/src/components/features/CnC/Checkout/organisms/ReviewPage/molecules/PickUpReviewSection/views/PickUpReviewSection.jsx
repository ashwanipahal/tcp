import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import Row from '../../../../../../../../common/atoms/Row';
import Col from '../../../../../../../../common/atoms/Col';

export class PickUpReviewSection extends React.PureComponent {
  render() {
    const { className, enablePickUpAlternateForm, pickUpContactPerson } = this.props;

    return (
      <div className={className} dataLocator="alternate-div">
        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            {pickUpContactPerson && (
              <React.Fragment>
                <div>
                  <BodyCopy fontSize="fs26" fontFamily="primary" fontWeight="regular">
                    Pickup Contact
                  </BodyCopy>
                  Edit
                  {enablePickUpAlternateForm}
                </div>
                <BodyCopy fontSize="fs16" fontFamily="primary" fontWeight="regular">
                  We will send you an email when your order is ready. A government issued ID is
                  required to pick up the order.
                </BodyCopy>
              </React.Fragment>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

PickUpReviewSection.propTypes = {
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape({}),
  pickUpContactPerson: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    emailAddress: PropTypes.string,
    phoneNumber: PropTypes.string.isRequired,
  }),
  enablePickUpAlternateForm: PropTypes.bool,
};

PickUpReviewSection.defaultProps = {
  labels: {},
  pickUpContactPerson: {
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
  },
  enablePickUpAlternateForm: false,
};

export default withStyles(PickUpReviewSection);
