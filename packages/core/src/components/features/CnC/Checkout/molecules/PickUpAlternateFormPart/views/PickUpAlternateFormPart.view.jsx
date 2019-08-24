import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import withStyles from '../../../../../../common/hoc/withStyles';
import ContactFormFields from '../../ContactFormFields';
import Row from '../../../../../../common/atoms/Row';
import Col from '../../../../../../common/atoms/Col';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import styles from '../styles/style';

class PickUpAlternateFormPart extends React.Component {
  sumbit = () => {};

  render() {
    const {
      className,
      isCondensed,
      showNoteOnToggle,
      isAlternateUpdateChecked,
      labels,
    } = this.props;
    return (
      <div className={className} dataLocator="alternate-div">
        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <Field
              name="hasAlternatePickup"
              component={InputCheckbox}
              dataLocator="Alternate-checkbox"
              enableSuccessCheck={false}
            >
              <BodyCopy fontSize="fs16" fontFamily="secondary" fontWeight="regular">
                {labels.alternativeHeading}
              </BodyCopy>
            </Field>
            {showNoteOnToggle && (
              <BodyCopy
                fontSize="fs12"
                fontFamily="secondary"
                fontWeight="regular"
                className="alterNativeSubText"
              >
                {labels.alternativeSubHeading}
              </BodyCopy>
            )}
          </Col>
        </Row>
        {isAlternateUpdateChecked && (
          <ContactFormFields
            className="pick-up-alternate-input"
            showEmailAddress
            isCondensed={isCondensed}
            labels={labels}
          />
        )}
      </div>
    );
  }
}

PickUpAlternateFormPart.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string.isRequired,
  isCondensed: PropTypes.bool,
  showNoteOnToggle: PropTypes.bool,
  isAlternateUpdateChecked: PropTypes.bool,
};
PickUpAlternateFormPart.defaultProps = {
  isCondensed: false,
  showNoteOnToggle: false,
  isAlternateUpdateChecked: false,
};

export default withStyles(PickUpAlternateFormPart, styles);
export { PickUpAlternateFormPart as PickUpAlternateFormPartVanilla };
