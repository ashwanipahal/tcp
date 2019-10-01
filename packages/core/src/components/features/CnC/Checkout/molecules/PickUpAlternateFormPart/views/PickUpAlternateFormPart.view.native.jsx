import React from 'react';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import withStyles from '../../../../../../common/hoc/withStyles';
import ContactFormFields from '../../ContactFormFields';
import InputCheckbox from '../../../../../../common/atoms/InputCheckbox';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import {
  Style,
  AlternateWrapper,
  FieldWrapper,
  ShortNote,
  TextWrapper,
  TextColOne,
  TextColTwo,
  AlternateFieldWrapper,
} from '../styles/PickUpAlternateFormPart.style.native';

class PickUpAlternateFormPart extends React.PureComponent {
  render() {
    const { isCondensed, showNoteOnToggle, isAlternateUpdateChecked, labels } = this.props;
    return (
      <AlternateWrapper dataLocator="alternate-View">
        <FieldWrapper>
          <Field
            name="hasAlternatePickup"
            component={InputCheckbox}
            dataLocator="Alternate-checkbox"
            enableSuccessCheck={false}
          />
          <BodyCopy
            fontFamily="secondary"
            fontSize="fs14"
            fontWeight="regular"
            text={labels.alternativeHeading}
          />
        </FieldWrapper>
        <TextWrapper>
          <TextColOne />
          <TextColTwo>
            {showNoteOnToggle && (
              <ShortNote Platform={Platform}>
                <BodyCopy
                  fontSize="fs10"
                  fontFamily="primary"
                  fontWeight="regular"
                  text={labels.alternativeSubHeading}
                />
              </ShortNote>
            )}
          </TextColTwo>
        </TextWrapper>
        <AlternateFieldWrapper>
          {isAlternateUpdateChecked && (
            <ContactFormFields
              className="pick-up-alternate-input"
              showEmailAddress
              isCondensed={isCondensed}
              labels={labels}
            />
          )}
        </AlternateFieldWrapper>
      </AlternateWrapper>
    );
  }
}

PickUpAlternateFormPart.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isCondensed: PropTypes.bool,
  showNoteOnToggle: PropTypes.bool,
  isAlternateUpdateChecked: PropTypes.bool,
};
PickUpAlternateFormPart.defaultProps = {
  isCondensed: false,
  showNoteOnToggle: false,
  isAlternateUpdateChecked: false,
};

export default withStyles(PickUpAlternateFormPart, Style);
export { PickUpAlternateFormPart as PickUpAlternateFormPartVanilla };
