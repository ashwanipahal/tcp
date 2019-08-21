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

class PickUpAlternateFormPart extends React.PureComponent {
  render() {
    const { className, isCondensed, showNoteOnToggle, isAlternateUpdateChecked } = this.props;
    return (
      <div className={className}>
        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <Field
              name="hasAlternatePickup"
              component={InputCheckbox}
              dataLocator="hide-show-checkbox"
              enableSuccessCheck={false}
            >
              <BodyCopy fontSize="fs16" fontFamily="secondary" fontWeight="regular">
                Add an alternate pickup person (optional)
              </BodyCopy>
            </Field>
            {showNoteOnToggle && (
              <BodyCopy
                fontSize="fs12"
                fontFamily="secondary"
                fontWeight="regular"
                className="alterNativeSubText"
              >
                Alternate pickup contact will also receive a copy of all Order Pickup emails.
              </BodyCopy>
            )}
          </Col>
        </Row>
        {isAlternateUpdateChecked && (
          <ContactFormFields
            className="pick-up-alternate-input"
            showEmailAddress
            isCondensed={isCondensed}
          />
        )}
      </div>
    );
  }
}

PickUpAlternateFormPart.propTypes = {
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
