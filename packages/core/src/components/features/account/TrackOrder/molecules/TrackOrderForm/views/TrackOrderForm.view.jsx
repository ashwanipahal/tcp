import React from 'react';
import { reduxForm, Field } from 'redux-form';
import withStyles from '../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Button from '../../../../../../common/atoms/Button';
import Anchor from '../../../../../../common/atoms/Anchor';
import TextBox from '../../../../../../common/atoms/TextBox';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import styles from '../styles/TrackOrderForm.style';
import constants from '../../../TrackOrder.constants';

// @flow
type Props = {
  className: String,
  labels: object,
  handleSubmit: Function,
  onChangeForm: Function,
  invalid: Boolean,
};

class TrackOrderForm extends React.PureComponent<Props> {
  render() {
    const { className, labels, handleSubmit, onChangeForm, invalid } = this.props;
    return (
      <form
        name={constants.TRACK_ORDER_FORM_NAME}
        onSubmit={handleSubmit}
        onChange={onChangeForm}
        className={className}
      >
        <BodyCopy component="div" className="elem-mb-LRG">
          <Field
            id="emailAddress"
            placeholder={labels.trackOrder.lbl_header_trackOrderOverlay_emailAddress_placeholder}
            name="emailAddress"
            component={TextBox}
            dataLocator="track_order_email_address"
            errorDataLocator="track_order_email_error_msg"
            showSuccessCheck={false}
            enableSuccessCheck={false}
            className="elem-mb-L"
          />
          <Field
            id="orderNumber"
            placeholder={labels.trackOrder.lbl_header_trackOrderOverlay_orderNo_placeholder}
            name="orderNumber"
            component={TextBox}
            dataLocator="track_order_no"
            errorDataLocator="track_order_no_error_msg"
            showSuccessCheck={false}
            enableSuccessCheck={false}
            className="elem-mb-L"
          />
          <BodyCopy component="div">
            <Anchor
              fontSizeVariation="medium"
              anchorVariation="primary"
              underline
              dataLocator="track_order_need_help"
              to={labels.trackOrder.lbl_header_trackOrderOverlay_needHelpLink}
              target="_blank"
            >
              {labels.trackOrder.lbl_header_trackOrderOverlay_needHelp}
            </Anchor>
          </BodyCopy>
        </BodyCopy>
        <BodyCopy component="div" textAlign="center" className="elem-mb-LRG">
          <Button
            fill="BLUE"
            type="submit"
            buttonVariation="fixed-width"
            dataLocator="track_order_btn"
            fullWidth
            disabled={invalid}
            className="elem-mb-L trackOrder-trackOrdercta"
          >
            {labels.trackOrder.lbl_header_trackOrderOverlay_trackOrderBtn}
          </Button>
        </BodyCopy>
      </form>
    );
  }
}

const validateMethod = createValidateMethod(
  getStandardConfig([{ emailAddress: 'emailAddressNoAsync' }, 'orderNumber'])
);
export default reduxForm({
  form: constants.TRACK_ORDER_FORM_NAME, // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(TrackOrderForm, styles));
export { TrackOrderForm as TrackOrderFormVanilla };
