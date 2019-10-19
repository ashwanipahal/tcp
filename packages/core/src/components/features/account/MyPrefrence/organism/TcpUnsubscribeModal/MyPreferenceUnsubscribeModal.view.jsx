import React from 'react';
import { reduxForm } from 'redux-form';
import { BodyCopy, Row, Col, Button } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import PropTypes from 'prop-types';
import styles from './styles/MyPreferenceUnsubscribeModal.style';
import myPreferenceConst from '../../MyPrefrence.constants';

/**
 * This Class component use for return the Extra Points Detail Modal
 * can be passed in the component.
 * @param waysToEarnRow - used for pass data to the modal popup
 * * @param onRequestClose - received onRequestClose function as param for closed popup
 * * @param openState - received openState function as param for open popup
 */
class MyPreferenceUnsubscribeModal extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onRequestClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleSubmitModalPopup: PropTypes.func.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    activeModal: PropTypes.string.isRequired,
    labels: PropTypes.shape({}),
  };

  static defaultProps = {
    className: '',
    labels: {},
  };

  handleSubmitData = () => {
    const { handleSubmitModalPopup, activeModal } = this.props;
    const data = { activeBrand: activeModal };
    handleSubmitModalPopup(data);
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { className, handleSubmit, onRequestClose, phoneNumber, labels } = this.props;

    return (
      <div className={className}>
        <BodyCopy component="div" className="myPreferenceModalWrapper">
          <form
            name={myPreferenceConst.MY_PREFERENCE_FORM_MODAL_UNSUBSCRIBE}
            className={className}
            onSubmit={handleSubmit(this.handleSubmitData)}
            noValidate
          >
            <BodyCopy
              fontSize="fs22"
              fontWeight="extrabold"
              fontFamily="secondary"
              textAlign="center"
              className="elem-mb-LRG elem-mt-LRG"
              data-locator="my-preference-modal_title"
            >
              {getLabelValue(labels, 'lbl_prefrence_subscribe_text_alerts')}
            </BodyCopy>
            <BodyCopy
              component="div"
              fontSize="fs14"
              fontFamily="secondary"
              textAlign="center"
              data-locator="my-preference-modal_info-text"
            >
              {getLabelValue(labels, 'lbl_prefrence_modal_are_you_sure')}
            </BodyCopy>
            <BodyCopy
              component="div"
              fontSize="fs14"
              fontFamily="secondary"
              textAlign="center"
              className="elem-mb-LRG"
              data-locator="my-preference-modal_info-text"
            >
              {getLabelValue(labels, 'lbl_prefrence_modal_clicking_submit_text')}
            </BodyCopy>
            <BodyCopy
              component="div"
              fontSize="fs16"
              fontWeight="extrabold"
              fontFamily="secondary"
              textAlign="center"
              data-locator="my-preference-modal_sub-info-text"
            >
              {getLabelValue(labels, 'lbl_prefrence_modal_phone_number')}
            </BodyCopy>
            <BodyCopy
              component="div"
              fontSize="fs16"
              fontFamily="secondary"
              textAlign="center"
              className="disclaimer-sub-text"
              data-locator="my-preference-modal_sub-info-text"
            >
              {phoneNumber}
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
                  {getLabelValue(labels, 'lbl_prefrence_modal_submit')}
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
                  {getLabelValue(labels, 'lbl_prefrence_modal_cancel')}
                </Button>
              </Col>
            </Row>
          </form>
        </BodyCopy>
      </div>
    );
  }
}

export default reduxForm({
  form: myPreferenceConst.MY_PREFERENCE_FORM_MODAL_UNSUBSCRIBE, // a unique identifier for this form
  enableReinitialize: true,
})(withStyles(MyPreferenceUnsubscribeModal, styles));
export { MyPreferenceUnsubscribeModal as MyPreferenceUnsubscribeModalVanilla };
