import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/style';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

class PickUpContactDisplay extends React.PureComponent {
  render() {
    const { className, contactDetails } = this.props;
    return (
      <div className={className}>
        <Row className="contactBody" fullBleed>
          <Col colSize={{ small: 6, medium: 8, large: 6 }}>
            <BodyCopy fontSize="fs16" dataLocator="" fontFamily="secondary" fontWeight="regular">
              {`${contactDetails.firstName} ${contactDetails.lastName}`}
            </BodyCopy>
            {contactDetails.phoneNumber && (
              <BodyCopy fontSize="fs16" dataLocator="" fontFamily="secondary" fontWeight="regular">
                {contactDetails.phoneNumber}
              </BodyCopy>
            )}
            {contactDetails.emailAddress && (
              <BodyCopy fontSize="fs16" dataLocator="" fontFamily="secondary" fontWeight="regular">
                {contactDetails.emailAddress}
              </BodyCopy>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

PickUpContactDisplay.propTypes = {
  className: PropTypes.string.isRequired,
  contactDetails: PropTypes.shape({}).isRequired,
  onEditModeChange: PropTypes.func.isRequired,
};

export default withStyles(PickUpContactDisplay, styles);
export { PickUpContactDisplay as PickUpContactDisplayVanilla };
