import React from 'react';
import { reduxForm } from 'redux-form';
import { BodyCopy, Row, Col, Button } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
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
    waysToEarnRow: PropTypes.shape({}),
    onRequestClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleSubmitModalPopup: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
    waysToEarnRow: {},
  };

  handleSubmitData = () => {
    const { handleSubmitModalPopup } = this.props;
    const data = { tcpUnsubscribe: true };
    handleSubmitModalPopup(data);
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
              Unsubscribe from My Place Rewards SMS Alerts
            </BodyCopy>
            <BodyCopy
              component="div"
              fontSize="fs14"
              fontFamily="secondary"
              textAlign="center"
              data-locator="my-preference-modal_info-text"
            >
              Are you sure?
            </BodyCopy>
            <BodyCopy
              component="div"
              fontSize="fs14"
              fontFamily="secondary"
              textAlign="center"
              className="elem-mb-LRG"
              data-locator="my-preference-modal_info-text"
            >
              By clicking submit, you’ll no longer receive text notifications about rewards, points,
              coupons & special offers!
            </BodyCopy>
            <BodyCopy
              component="div"
              fontSize="fs16"
              fontWeight="extrabold"
              fontFamily="secondary"
              textAlign="center"
              data-locator="my-preference-modal_sub-info-text"
            >
              Phone Number
            </BodyCopy>

            <BodyCopy
              component="div"
              fontSize="fs16"
              fontFamily="secondary"
              textAlign="center"
              className="disclaimer-sub-text"
              data-locator="my-preference-modal_sub-info-text"
            >
              123-456-7890
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

export default reduxForm({
  form: myPreferenceConst.MY_PREFERENCE_FORM_MODAL_UNSUBSCRIBE, // a unique identifier for this form
  enableReinitialize: true,
})(withStyles(MyPreferenceUnsubscribeModal, styles));
export { MyPreferenceUnsubscribeModal as MyPreferenceUnsubscribeModalVanilla };
