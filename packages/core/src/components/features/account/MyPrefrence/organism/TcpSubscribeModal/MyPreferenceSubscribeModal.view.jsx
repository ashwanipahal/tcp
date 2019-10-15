import React from 'react';
import { reduxForm, Field } from 'redux-form';
import createValidateMethod from '@tcp/core/src/utils/formValidation/createValidateMethod';
import getStandardConfig from '@tcp/core/src/utils/formValidation/validatorStandardConfig';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import { BodyCopy, Row, Col, Button } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import PropTypes from 'prop-types';
import styles from './styles/MyPreferenceSubscribeModal.style';
import myPreferenceConst from '../../MyPrefrence.constants';
import { formatPhoneNumber } from '../../../../../../utils/formValidation/phoneNumber';

/**
 * This Class component use for return the Extra Points Detail Modal
 * can be passed in the component.
 * @param waysToEarnRow - used for pass data to the modal popup
 * * @param onRequestClose - received onRequestClose function as param for closed popup
 * * @param openState - received openState function as param for open popup
 */
class MyPreferenceSubscribeModal extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    waysToEarnRow: PropTypes.shape({}),
    onRequestClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleSubmitModalPopup: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
    waysToEarnRow: {},
  };

  handleSubmitData = data => {
    const { handleSubmitModalPopup } = this.props;
    const formData = { subscribe: true, ...data };
    handleSubmitModalPopup(formData);
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { className, handleSubmit, onRequestClose } = this.props;

    return (
      <div className={className}>
        <BodyCopy component="div" className="myPreferenceModalWrapper">
          <form
            name={myPreferenceConst.MY_PREFRENCE_FORM_MODAL}
            className={className}
            onSubmit={handleSubmit(this.handleSubmitData)}
            noValidate
          >
            <BodyCopy
              fontSize="fs22"
              fontWeight="extrabold"
              fontFamily="secondary"
              textAlign="center"
              className="elem-mb-MED elem-mt-LRG"
              data-locator="my-preference-modal_title"
            >
              Subscribe to Text Alerts
            </BodyCopy>
            <BodyCopy
              component="div"
              fontSize="fs14"
              fontFamily="secondary"
              textAlign="center"
              className="elem-mb-LRG"
              data-locator="my-preference-modal_info-text"
            >
              Click submit to start the process of receiving My Place Rewards SMS Alerts about
              rewards, points, coupons & special offers via text nofications.
            </BodyCopy>
            <BodyCopy
              component="div"
              fontSize="fs14"
              fontFamily="secondary"
              textAlign="center"
              className="elem-mb-MED"
              data-locator="my-preference-modal_sub-info-text"
            >
              If you are not already subscribed for other text alerts, you'll receive a text message
              to the number provided; reply with Y to be subscribed!
            </BodyCopy>

            <BodyCopy
              component="div"
              fontSize="fs14"
              fontFamily="secondary"
              textAlign="center"
              className="elem-mb-MED"
              data-locator="my-preference-modal_sub-info-text"
            >
              <Field
                placeholder="Mobile Phone Number"
                name="phoneNumber"
                id="phoneNumber"
                component={TextBox}
                dataLocator="editPersonalInfo-phnumber"
                type="tel"
                normalize={formatPhoneNumber}
              />
            </BodyCopy>
            <BodyCopy
              component="div"
              fontSize="fs14"
              fontFamily="secondary"
              textAlign="center"
              className="disclaimer-sub-text"
              data-locator="my-preference-modal_disclaimer-sub-text"
            >
              Frequency varies. Carrier messages & data rates may apply. Recurring automated
              marketing and loyalty messages will be sent to the number provided at opt-in. Text
              STOP to 89700 to opt-out. See Mobile T&Cs & Privacy Policy. No purchase necessary. US
              customers only.
            </BodyCopy>
            <Row fullBleed className="elem-mb-LRG">
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <Button
                  fullWidth
                  buttonVariation="fixed-width"
                  fill="BLUE"
                  type="submit"
                  className="submit-button"
                  dataLocator="subscribe_modal_submit"
                >
                  Submit
                </Button>
              </Col>
            </Row>
            <Row fullBleed className="elem-mb-LRG">
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <Button
                  fullWidth
                  buttonVariation="fixed-width"
                  fill="WHITE"
                  className="cancel-button"
                  dataLocator="subscribe_modal_cancel"
                  onClick={onRequestClose}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </form>
        </BodyCopy>
      </div>
    );
  }
}

const validateMethod = createValidateMethod(getStandardConfig(['phoneNumber']));

export default reduxForm({
  form: myPreferenceConst.MY_PREFRENCE_FORM_MODAL, // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(MyPreferenceSubscribeModal, styles));
export { MyPreferenceSubscribeModal as MyPreferenceSubscribeModalVanilla };
