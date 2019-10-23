import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import createValidateMethod from '@tcp/core/src/utils/formValidation/createValidateMethod';
import getStandardConfig from '@tcp/core/src/utils/formValidation/validatorStandardConfig';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import { Button, RichText } from '@tcp/core/src/components/common/atoms';
import {
  ViewWithSpacing,
  BodyCopyWithSpacing,
} from '@tcp/core/src/components/common/atoms/styledWrapper';
import { formatPhoneNumber } from '../../../../../../utils/formValidation/phoneNumber';
import myPreferenceConst from '../../MyPreferenceSubscription.constants';
import { RichTextWrapper, ButtonWrapper } from './styles/MyPreferenceSubscribeModal.style.native';

/**
 * This Class component use for return the Extra Points Detail Modal
 * can be passed in the component.
 * @param waysToEarnRow - used for pass data to the modal popup
 * * @param onRequestClose - received onRequestClose function as param for closed popup
 * * @param openState - received openState function as param for open popup
 */
class MyPreferenceSubscribeModal extends React.PureComponent {
  static propTypes = {
    onRequestClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    labels: PropTypes.shape({}),
  };

  static defaultProps = {
    labels: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      disclaimerText: '',
    };
  }

  componentDidMount() {
    let disclaimerLabels = '';
    const { labels } = this.props;
    const disclaimerLabelsArray = Object.keys(labels).filter(disclaimerLabelsValue =>
      /lbl_prefrence_modal_disclaimer_line-/.test(disclaimerLabelsValue)
    );
    disclaimerLabelsArray.forEach(elem => {
      disclaimerLabels += getLabelValue(labels, elem);
    });

    const richTextStyle = `<meta name="viewport" content="width=device-width, initial-scale=1.0"><div style="font-size:14px; text-align:center; font-family: Nunito; font-weight: normal;">${disclaimerLabels} </div>`;

    this.setState({
      disclaimerText: richTextStyle,
    });
  }

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { onRequestClose, handleSubmit, labels } = this.props;
    const { disclaimerText } = this.state;

    return (
      <ViewWithSpacing spacingStyles="margin-bottom-XXXL margin-left-MED margin-right-MED">
        <BodyCopyWithSpacing
          fontSize="fs22"
          fontWeight="extrabold"
          fontFamily="secondary"
          textAlign="center"
          spacingStyles="margin-bottom-MED"
          data-locator="my-preference-modal_title"
          text={getLabelValue(labels, 'lbl_prefrence_subscribe_text_alerts')}
        />

        <BodyCopyWithSpacing
          component="div"
          fontSize="fs14"
          fontWeight="regular"
          fontFamily="secondary"
          textAlign="center"
          spacingStyles="margin-bottom-LRG"
          data-locator="my-preference-modal_info_text"
          text={getLabelValue(labels, 'lbl_prefrence_modal_info_text')}
        />

        <BodyCopyWithSpacing
          component="div"
          fontSize="fs14"
          fontWeight="regular"
          fontFamily="secondary"
          textAlign="center"
          spacingStyles="margin-bottom-MED"
          data-locator="my-preference-modal_sub_info_text"
          text={getLabelValue(labels, 'lbl_prefrence_modal_sub_info_text')}
        />

        <BodyCopyWithSpacing
          component="div"
          fontSize="fs14"
          fontFamily="secondary"
          textAlign="center"
          spacingStyles="margin-bottom-MED"
          data-locator="my-preference-modal_phnumber"
        />
        <Field
          label={getLabelValue(labels, 'lbl_preference_mobileNumber')}
          name="phoneNumber"
          id="phoneNumber"
          component={TextBox}
          dataLocator="my-preference-modal-phoneNumber"
          type="tel"
          normalize={formatPhoneNumber}
        />

        <RichTextWrapper>
          <RichText
            source={{ html: disclaimerText }}
            dataLocator="my-preference-modal_disclaimer_sub_text"
          />
        </RichTextWrapper>
        <Button
          fullWidth
          buttonVariation="fixed-width"
          fill="BLUE"
          type="submit"
          className="submit-button"
          onPress={handleSubmit}
          dataLocator="subscribe_modal_submit"
          text={getLabelValue(labels, 'lbl_prefrence_modal_submit')}
        />
        <ButtonWrapper>
          <Button
            fullWidth
            buttonVariation="fixed-width"
            fill="WHITE"
            className="cancel-button"
            dataLocator="subscribe_modal_cancel"
            onClick={onRequestClose}
            text={getLabelValue(labels, 'lbl_prefrence_modal_cancel')}
          />
        </ButtonWrapper>
      </ViewWithSpacing>
    );
  }
}

const validateMethod = createValidateMethod(getStandardConfig(['phoneNumber']));

export default reduxForm({
  form: myPreferenceConst.MY_PREFERENCE_FORM_MODAL, // a unique identifier for this form
  enableReinitialize: true,
  ...validateMethod,
})(MyPreferenceSubscribeModal);
export { MyPreferenceSubscribeModal as MyPreferenceSubscribeModalVanilla };
