import React from 'react';
import { PropTypes } from 'prop-types';
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

class TrackOrderForm extends React.PureComponent {
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
            placeholder={labels.trackOrder.lbl_trackOrder_emailPlaceholder}
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
            placeholder={labels.trackOrder.lbl_trackOrder_orderNoPlaceholder}
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
              fontWeight="semiBold"
              underline
              dataLocator="track_order_need_help"
              to={labels.trackOrder.lbl_trackOrder_needHelpLink}
              target="_blank"
            >
              {labels.trackOrder.lbl_trackOrder_needHelp}
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
            {labels.trackOrder.lbl_trackOrder_trackOrderBtn}
          </Button>
        </BodyCopy>
      </form>
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
  className: PropTypes.string.isRequired,
};

const validateMethod = createValidateMethod(
  getStandardConfig([{ emailAddress: 'emailAddressNoAsync' }, 'orderNumber'])
);
export default reduxForm({
  form: constants.TRACK_ORDER_FORM_NAME, // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(withStyles(TrackOrderForm, styles));
export { TrackOrderForm as TrackOrderFormVanilla };
