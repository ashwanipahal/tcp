import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import getStandardConfig from '../../../../../utils/formValidation/validatorStandardConfig';
import withStyles from '../../../hoc/withStyles';
import styles from '../styles/style';
import TextBox from '../../../atoms/TextBox';
import InputCheckbox from '../../../atoms/InputCheckbox';
import Row from '../../../atoms/Row';
import Col from '../../../atoms/Col';
import Anchor from '../../../atoms/Anchor';
import BodyCopy from '../../../atoms/BodyCopy';

class SMSFormFields extends React.PureComponent {
  static smsFormFieldsConfig = getStandardConfig(['phoneNumber']);

  render() {
    const { className, isOrderUpdateChecked, labels } = this.props;
    return (
      <div className={className}>
        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 8, large: 5 }}>
            <Field
              name="sendOrderUpdate"
              component={InputCheckbox}
              dataLocator="hide-show-checkbox"
              enableSuccessCheck={false}
            >
              <BodyCopy fontSize="fs16" fontFamily="secondary" fontWeight="regular">
                {labels.orderUpdates}
              </BodyCopy>
            </Field>
          </Col>
        </Row>
        {isOrderUpdateChecked && (
          <Row>
            <Col colSize={{ small: 5, medium: 8, large: 5 }} className="phone-field-wrapper">
              <span className="phone-prefix"> +1 </span>
              <Field
                name="phoneNumber"
                id="phoneNumber"
                type="tel"
                component={TextBox}
                maxLength={50}
                dataLocator="phone-number-field"
                enableSuccessCheck={false}
                className="phone-field"
              />
            </Col>
            <Row>
              <Col colSize={{ small: 6, medium: 8, large: 5 }}>
                <BodyCopy fontSize="fs10" fontFamily="primary" fontWeight="regular">
                  {labels.smsSignupText}
                </BodyCopy>
                <Anchor
                  noUnderline
                  anchorVariation="primary"
                  fontSizeVariation="small"
                  noLink
                  href="https://www.childrensplace.com/us/help-center/#privacyPolicySectionli"
                  target="_blank"
                >
                  {labels.privacyPolicy}
                </Anchor>
              </Col>
            </Row>
          </Row>
        )}
      </div>
    );
  }
}

SMSFormFields.propTypes = {
  className: PropTypes.string,
  isOrderUpdateChecked: PropTypes.bool,
  labels: PropTypes.shape({}).isRequired,
};

SMSFormFields.defaultProps = {
  className: '',
  isOrderUpdateChecked: false,
};

export default withStyles(SMSFormFields, styles);

export { SMSFormFields as SMSFormFieldsVanilla };
