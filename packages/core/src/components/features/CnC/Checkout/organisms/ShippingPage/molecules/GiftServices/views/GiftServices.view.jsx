import React from 'react';
import PropTypes from 'prop-types';

import { Field, change } from 'redux-form';
import getStandardConfig from '../../../../../../../../../utils/formValidation/validatorStandardConfig';
import withStyles from '../../../../../../../../common/hoc/withStyles';
import styles from '../styles/GiftServices.style';
import InputCheckbox from '../../../../../../../../common/atoms/InputCheckbox';
import LabeledRadioButton from '../../../../../../../../common/atoms/LabeledRadioButton';
import Row from '../../../../../../../../common/atoms/Row';
import Col from '../../../../../../../../common/atoms/Col';
import Anchor from '../../../../../../../../common/atoms/Anchor';
import BodyCopy from '../../../../../../../../common/atoms/BodyCopy';
import Image from '../../../../../../../../common/atoms/Image';
import { isGymboree, getIconPath, getLocator } from '../../../../../../../../../utils';

class GiftServices extends React.PureComponent {
  static smsFormFieldsConfig = getStandardConfig(['phoneNumber']);

  handleChange = () => {
    const { dispatch, formName, formSection } = this.props;
    if (dispatch) {
      dispatch(change(formName, `${formSection}.phoneNumber`));
    }
  };

  render() {
    const { className, isGiftServicesChecked } = this.props;
    return (
      <div className={className}>
        <Row fullBleed>
          <Col colSize={{ small: 6, medium: 8, large: 12 }}>
            <Field
              name="addGiftServices"
              component={InputCheckbox}
              dataLocator="hide-show-checkbox"
              enableSuccessCheck={false}
              onChange={this.handleChange}
              className="giftServicesField"
            >
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs16"
                fontWeight="extrabold"
                className="elem-mb-XXS"
              >
                Gift Services
              </BodyCopy>
            </Field>

            <BodyCopy
              fontSize="fs12"
              fontFamily="secondary"
              className="giftServicesDetailsLink"
              component="span"
              fontWeight="semibold"
            >
              Details
            </BodyCopy>
          </Col>
        </Row>
        {!isGiftServicesChecked && (
          <Row fullBleed>
            <Col colSize={{ small: 3, medium: 4, large: 6 }} className="phone-field-wrapper">
              <LabeledRadioButton
                className="normal-select-box"
                name="gym"
                checked={!isGymboree()}
                disabled={false}
              >
                <BodyCopy color="gray.900" fontSize="fs14" fontFamily="secondary">
                  <Image
                    alt="Brand"
                    className="brand-image"
                    src={getIconPath('header__brand-tab--tcp')}
                    data-locator={getLocator('header__brand-tab--tcp')}
                  />
                </BodyCopy>
              </LabeledRadioButton>
            </Col>
            <Col colSize={{ small: 3, medium: 4, large: 6 }} className="phone-field-wrapper">
              <LabeledRadioButton
                className="normal-select-box"
                name="gym"
                checked={isGymboree()}
                disabled={false}
              >
                <BodyCopy color="gray.900" fontSize="fs14" fontFamily="secondary">
                  <Image
                    alt="Brand"
                    className="brand-image"
                    src={getIconPath('header__brand-tab-gymboree')}
                    data-locator={getLocator('header__brand-tab--gymboree')}
                  />
                </BodyCopy>
              </LabeledRadioButton>
            </Col>
            <Row>
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <BodyCopy fontSize="fs10" fontFamily="primary" fontWeight="regular">
                  random text
                </BodyCopy>
                <Anchor
                  noUnderline
                  anchorVariation="primary"
                  fontSizeVariation="small"
                  noLink
                  href="#"
                  target="_blank"
                >
                  privacyPolicy
                </Anchor>
              </Col>
            </Row>
          </Row>
        )}
      </div>
    );
  }
}

GiftServices.propTypes = {
  className: PropTypes.string,
  isGiftServicesChecked: PropTypes.bool,
  labels: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func,
  formName: PropTypes.string,
  formSection: PropTypes.string,
};

GiftServices.defaultProps = {
  className: '',
  isGiftServicesChecked: false,
  dispatch: () => {},
  formName: '',
  formSection: '',
};

export default withStyles(GiftServices, styles);

export { GiftServices as GiftServicesVanilla };
