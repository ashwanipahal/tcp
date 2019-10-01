import React from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import Button from '../../../../../../common/atoms/Button';
import Anchor from '../../../../../../common/atoms/Anchor';
import TextBox from '../../../../../../common/atoms/TextBox';
import createValidateMethod from '../../../../../../../utils/formValidation/createValidateMethod';
import getStandardConfig from '../../../../../../../utils/formValidation/validatorStandardConfig';
import { InputField, CtaView, AnchorView } from '../styles/TrackOrderForm.native.style';
import constants from '../../../TrackOrder.constants';

class TrackOrderForm extends React.PureComponent {
  render() {
    const { labels, handleSubmit, onChangeForm, invalid } = this.props;
    return (
      <View>
        <InputField>
          <Field
            id="emailAddress"
            type="text"
            label={labels.trackOrder.lbl_trackOrder_emailPlaceholder}
            name="emailAddress"
            component={TextBox}
            dataLocator="track_order_email_address"
            errorDataLocator="track_order_email_error_msg"
            onChange={onChangeForm}
            showSuccessCheck={false}
            enableSuccessCheck={false}
            marginBottom={false}
          />
        </InputField>
        <InputField>
          <Field
            id="orderNumber"
            type="text"
            label={labels.trackOrder.lbl_trackOrder_orderNoPlaceholder}
            name="orderNumber"
            component={TextBox}
            dataLocator="track_order_no"
            errorDataLocator="track_order_no_error_msg"
            onChange={onChangeForm}
            showSuccessCheck={false}
            enableSuccessCheck={false}
            marginBottom={false}
          />
        </InputField>
        <AnchorView>
          <Anchor
            anchorVariation="primary"
            underline
            url={labels.trackOrder.lbl_trackOrder_needHelpLink}
            text={labels.trackOrder.lbl_trackOrder_needHelp}
            locator="track_order_need_help"
          />
        </AnchorView>
        <CtaView>
          <Button
            fill="BLUE"
            type="submit"
            onPress={!invalid ? handleSubmit : null}
            buttonVariation="variable-width"
            disableButton={invalid}
            text={labels.trackOrder.lbl_trackOrder_trackOrderBtn}
            color="white"
          />
        </CtaView>
      </View>
    );
  }
}

TrackOrderForm.propTypes = {
  labels: PropTypes.shape({
    trackOrder: PropTypes.shape({}),
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onChangeForm: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
};

const validateMethod = createValidateMethod(
  getStandardConfig([{ emailAddress: 'emailAddressNoAsync' }, 'orderNumber'])
);
export default reduxForm({
  form: constants.TRACK_ORDER_FORM_NAME, // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(TrackOrderForm);
