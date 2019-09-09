import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/PickUpContactDisplay.style';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

class PickUpContactDisplay extends React.PureComponent {
  render() {
    const { className, formData } = this.props;
    return (
      <div className={className}>
        <Row className="contactBody" fullBleed>
          <Col colSize={{ small: 6, medium: 8, large: 6 }}>
            <BodyCopy fontSize="fs16" dataLocator="" fontFamily="secondary" fontWeight="regular">
              {`${formData.firstName} ${formData.lastName}`}
            </BodyCopy>
            {formData.phoneNumber && (
              <BodyCopy fontSize="fs16" dataLocator="" fontFamily="secondary" fontWeight="regular">
                {formData.phoneNumber}
              </BodyCopy>
            )}
            {formData.emailAddress && (
              <BodyCopy fontSize="fs16" dataLocator="" fontFamily="secondary" fontWeight="regular">
                {formData.emailAddress}
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
  formData: PropTypes.shape({}).isRequired,
};

export default withStyles(PickUpContactDisplay, styles);
export { PickUpContactDisplay as PickUpContactDisplayVanilla };
