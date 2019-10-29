import React from 'react';
import { reduxForm } from 'redux-form';
import { BodyCopy, Row, Col, Button } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import PropTypes from 'prop-types';
import styles from './styles/MyPreferenceAppUnsubscribeModal.style';
import myPreferenceConst from '../../MyPreferenceSubscription.constants';

/**
 * This Class component use for return the Extra Points Detail Modal
 * can be passed in the component.
 * @param MyPreferenceAppUnsubscribeModal - used for pass data to the modal popup
 * * @param onRequestClose - received onRequestClose function as param for closed popup
 * * @param onSubmit - received onSubmit function to handle form data
 */
class MyPreferenceAppUnsubscribeModal extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onRequestClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    labels: PropTypes.shape({}),
  };

  static defaultProps = {
    className: '',
    labels: {},
  };

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { className, onRequestClose, onSubmit, labels } = this.props;

    return (
      <div className={className}>
        <BodyCopy component="div" className="myPreferenceModalWrapper">
          <form
            name={myPreferenceConst.MY_PREFERENCE_FORM_MODAL_UNSUBSCRIBE}
            className={className}
            onSubmit={onSubmit}
            noValidate
          >
            <BodyCopy
              fontSize="fs22"
              fontWeight="extrabold"
              fontFamily="secondary"
              textAlign="center"
              className="elem-mb-LRG elem-mt-LRG"
              data-locator="my-preference-push_unsubscribe_title"
            >
              {getLabelValue(labels, 'lbl_preference_push_unsubscribe_heading')}
            </BodyCopy>
            <BodyCopy
              component="div"
              fontSize="fs14"
              fontFamily="secondary"
              textAlign="center"
              data-locator="my-preference-push_unsubscribe_info-text"
            >
              {getLabelValue(labels, 'lbl_prefrence_modal_are_you_sure')}
            </BodyCopy>
            <BodyCopy
              component="div"
              fontSize="fs14"
              fontFamily="secondary"
              textAlign="center"
              className="elem-mb-LRG"
              data-locator="my-preference-push_unsubscribe_push-submit"
            >
              {getLabelValue(labels, 'lbl_prefrence_modal_clicking_submit_push_text')}
            </BodyCopy>
            <Row fullBleed className="elem-mb-LRG">
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <Button
                  fullWidth
                  buttonVariation="fixed-width"
                  fill="BLUE"
                  type="submit"
                  className="submit-button"
                  dataLocator="subscribe_push_modal_submit"
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
                  dataLocator="subscribe_push_modal_cancel"
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
})(withStyles(MyPreferenceAppUnsubscribeModal, styles));
export { MyPreferenceAppUnsubscribeModal as MyPreferenceAppUnsubscribeModalVanilla };
