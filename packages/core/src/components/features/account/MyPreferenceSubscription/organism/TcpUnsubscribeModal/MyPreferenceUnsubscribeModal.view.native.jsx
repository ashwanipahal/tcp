import React from 'react';
import { reduxForm } from 'redux-form';
import { BodyCopy, Button } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import PropTypes from 'prop-types';
import {
  ViewWithSpacing,
  BodyCopyWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';
import { formatPhoneNumber } from '../../../../../../utils/formValidation/phoneNumber';
import myPreferenceConst from '../../MyPreferenceSubscription.constants';
import { ButtonWrapper } from './styles/MyPreferenceUnsubscribeModal.style.native';

/**
 * This Class component use for return the Extra Points Detail Modal
 * can be passed in the component.
 * @param MyPreferenceUnsubscribeModal - used for pass data to the modal popup
 * * @param onRequestClose - received onRequestClose function as param for closed popup
 * * @param openState - received openState function as param for open popup
 */
class MyPreferenceUnsubscribeModal extends React.PureComponent {
  static propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    labels: PropTypes.shape({}),
  };

  static defaultProps = {
    labels: {},
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { onRequestClose, phoneNumber, handleSubmit, labels } = this.props;

    return (
      <ViewWithSpacing spacingStyles="margin-bottom-XXXL margin-left-LRG margin-right-LRG">
        <BodyCopyWithSpacing
          fontSize="fs22"
          fontWeight="extrabold"
          fontFamily="secondary"
          textAlign="center"
          spacingStyles="margin-bottom-LRG"
          data-locator="my-preference-modal_title"
          text={getLabelValue(labels, 'lbl_prefrence_modal_unsubscribe_title')}
        />

        <BodyCopy
          component="div"
          fontSize="fs14"
          fontFamily="secondary"
          textAlign="center"
          data-locator="my-preference-modal_info-text"
          text={getLabelValue(labels, 'lbl_prefrence_modal_are_you_sure')}
        />

        <BodyCopyWithSpacing
          component="div"
          fontSize="fs14"
          fontFamily="secondary"
          textAlign="center"
          spacingStyles="margin-bottom-LRG"
          data-locator="my-preference-modal_info-text"
          text={getLabelValue(labels, 'lbl_prefrence_modal_clicking_submit_text')}
        />

        <BodyCopy
          component="div"
          fontSize="fs16"
          fontWeight="extrabold"
          fontFamily="secondary"
          textAlign="center"
          data-locator="my-preference-modal_sub-info-text"
          text={getLabelValue(labels, 'lbl_prefrence_modal_phone_number')}
        />

        <BodyCopyWithSpacing
          component="div"
          fontSize="fs16"
          fontFamily="secondary"
          textAlign="center"
          spacingStyles="margin-bottom-XXXL"
          data-locator="my-preference-modal_sub-info-text"
          text={formatPhoneNumber(phoneNumber)}
        />

        <Button
          fullWidth
          buttonVariation="fixed-width"
          fill="BLUE"
          type="submit"
          className="submit-button"
          dataLocator="subscribe_modal_submit"
          onPress={handleSubmit}
          text={getLabelValue(labels, 'lbl_prefrence_modal_submit')}
        />
        <ButtonWrapper>
          <Button
            fullWidth
            buttonVariation="fixed-width"
            fill="WHITE"
            className="cancel-button"
            dataLocator="subscribe_modal_cancel"
            onPress={onRequestClose}
            text={getLabelValue(labels, 'lbl_prefrence_modal_cancel')}
          />
        </ButtonWrapper>
      </ViewWithSpacing>
    );
  }
}

export default reduxForm({
  form: myPreferenceConst.MY_PREFERENCE_FORM_MODAL_UNSUBSCRIBE, // a unique identifier for this form
  enableReinitialize: true,
})(MyPreferenceUnsubscribeModal);
export { MyPreferenceUnsubscribeModal as MyPreferenceUnsubscribeModalVanilla };
