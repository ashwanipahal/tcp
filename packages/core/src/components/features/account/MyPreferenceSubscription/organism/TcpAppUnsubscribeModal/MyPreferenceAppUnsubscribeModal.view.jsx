import React from 'react';
import { BodyCopy, Row, Col, Button } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import PropTypes from 'prop-types';
import styles from '../TcpAppSubscribeModal/styles/MyPreferenceAppSubscribeModal.style';

/**
 * This Class component use for return the My Preference App Unsubscribe Modal
 * can be passed in the component.
 * @param MyPreferenceAppUnsubscribeModal - is a  functional component we can use it within  any component
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
                onClick={onSubmit}
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
        </BodyCopy>
      </div>
    );
  }
}

export default withStyles(MyPreferenceAppUnsubscribeModal, styles);
export { MyPreferenceAppUnsubscribeModal as MyPreferenceAppUnsubscribeModalVanilla };
