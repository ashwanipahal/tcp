import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { BodyCopy, Row, Col, Button, Image, Anchor } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import externalEndpoints from '@tcp/core/src/components/features/account/common/externalEndpoints';
import styles from './styles/MyPreferenceAppSubscribeModal.style';
import { getIconPath } from '../../../../../../utils';
import myPreferenceConst from '../../MyPreferenceSubscription.constants';

/**
 * This Class component use for return the Extra Points Detail Modal
 * can be passed in the component.
 * @param MyPreferenceSubscribeModal - used for pass data to the modal popup
 * * @param onRequestClose - received onRequestClose function as param for closed popup
 * * @param onSubmit - received onSubmit function to handle form data
 */
class MyPreferenceAppSubscribeModal extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onRequestClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    activeModal: PropTypes.string.isRequired,
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
    const { className, handleSubmit, activeModal, onSubmit, onRequestClose, labels } = this.props;

    return (
      <div className={className}>
        <BodyCopy component="div" className="myPreferenceModalWrapper">
          <form
            name={myPreferenceConst.MY_PREFERENCE_FORM_MODAL}
            className={className}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <BodyCopy
              fontSize="fs22"
              fontWeight="extrabold"
              fontFamily="secondary"
              textAlign="center"
              className="elem-mb-MED elem-mt-LRG"
              data-locator="my-preference-web-push_title"
            >
              {getLabelValue(labels, 'lbl_preference_push_notification_heading')}
            </BodyCopy>
            <BodyCopy
              component="div"
              fontSize="fs14"
              fontFamily="secondary"
              textAlign="center"
              className="elem-mb-LRG"
              data-locator="my-preference-web-push_subtext"
            >
              {getLabelValue(labels, 'lbl_preference_push_notification_subtext')}
            </BodyCopy>
            <BodyCopy
              component="div"
              fontSize="fs14"
              fontFamily="secondary"
              textAlign="center"
              className="elem-mb-MED"
              fontWeight="extrabold"
              data-locator="my-preference--web-push_download"
            >
              {getLabelValue(labels, 'lbl_preference_push_notification_download')}
            </BodyCopy>

            <Row fullBleed className="elem-mb-LRG">
              <Col colSize={{ small: 3, medium: 4, large: 6 }}>
                <Anchor
                  href={`${
                    activeModal === 'tcpAppSubscribe'
                      ? externalEndpoints.appsStoreTcpAppPage
                      : externalEndpoints.termsAndConditionsPage
                  }`}
                  className="elem-ml-SM"
                  data-locator="my-preference-modal_app_store"
                >
                  <Image class="elem-pl-XS" src={getIconPath('app-store')} />
                </Anchor>
              </Col>
              <Col colSize={{ small: 3, medium: 4, large: 6 }}>
                <Anchor
                  href={`${
                    activeModal === 'tcpAppSubscribe'
                      ? externalEndpoints.googlePlayTcpAppPage
                      : externalEndpoints.termsAndConditionsPage
                  }`}
                  className="elem-ml-SM"
                  data-locator="my-preference-modal_google_play"
                >
                  <Image class="elem-pl-XS" src={getIconPath('google-play')} />
                </Anchor>
              </Col>
            </Row>

            <BodyCopy
              component="div"
              fontSize="fs14"
              fontFamily="secondary"
              textAlign="center"
              className="disclaimer-sub-text"
              data-locator="my-preference-web-push_note"
            >
              {getLabelValue(labels, 'lbl_preference_push_notification_note')}
            </BodyCopy>

            <Row fullBleed className="elem-mb-LRG">
              <Col colSize={{ small: 6, medium: 8, large: 12 }}>
                <Button
                  fullWidth
                  buttonVariation="fixed-width"
                  fill="BLUE"
                  type="submit"
                  className="submit-button"
                  dataLocator="subscribe-web-push_submit"
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
                  dataLocator="subscribe-web-push_cancel"
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
  form: myPreferenceConst.MY_PREFERENCE_FORM_MODAL, // a unique identifier for this form
  enableReinitialize: true,
})(withStyles(MyPreferenceAppSubscribeModal, styles));
export { MyPreferenceAppSubscribeModal as MyPreferenceAppSubscribeModalVanilla };
