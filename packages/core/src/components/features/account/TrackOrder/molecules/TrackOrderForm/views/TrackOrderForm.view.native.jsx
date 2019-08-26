import React from 'react';
import { View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import Button from '../../../../../../common/atoms/Button';
import Anchor from '../../../../../../common/atoms/Anchor';
import TextBox from '../../../../../../common/atoms/TextBox';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import { InputField, CtaView, AnchorView } from '../styles/TrackOrderForm.native.style';
import constants from '../../../TrackOrder.constants';

// @flow
type Props = {
  labels: object,
  handleSubmit: Function,
  onChangeForm: Function,
  invalid: Boolean,
};

class TrackOrderForm extends React.PureComponent<Props> {
  render() {
    const { labels, handleSubmit, onChangeForm, invalid } = this.props;
    return (
      <View>
        <InputField>
          <Field
            id="emailAddress"
            type="text"
            label={labels.trackOrder.lbl_header_trackOrderOverlay_emailAddress_placeholder}
            name="emailAddress"
            component={TextBox}
            dataLocator="track_order_email_address"
            errorDataLocator="track_order_email_error_msg"
            onChange={onChangeForm}
            showSuccessCheck={false}
            enableSuccessCheck={false}
          />
        </InputField>
        <InputField>
          <Field
            id="orderNumber"
            type="text"
            label={labels.trackOrder.lbl_header_trackOrderOverlay_orderNo_placeholder}
            name="orderNumber"
            component={TextBox}
            dataLocator="track_order_no"
            errorDataLocator="track_order_no_error_msg"
            onChange={onChangeForm}
            showSuccessCheck={false}
            enableSuccessCheck={false}
          />
        </InputField>
        <AnchorView>
          <Anchor
            anchorVariation="primary"
            underline
            url={labels.trackOrder.lbl_header_trackOrderOverlay_needHelpLink}
            text={labels.trackOrder.lbl_header_trackOrderOverlay_needHelp}
            locator="track_order_need_help"
          />
        </AnchorView>
        <CtaView>
          <Button
            fill="BLUE"
            type="submit"
            onPress={handleSubmit}
            buttonVariation="variable-width"
            disableButton={invalid}
            text={labels.trackOrder.lbl_header_trackOrderOverlay_trackOrderBtn}
            color="white"
          />
        </CtaView>
      </View>
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
})(TrackOrderForm);
