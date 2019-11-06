import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue, getIconPath, isTCP } from '@tcp/core/src/utils/utils';
import { BodyCopy, Row, Col, Button, Image, Anchor } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import externalEndpoints from '@tcp/core/src/components/features/account/common/externalEndpoints';
import styles from './styles/MyPreferenceAppSubscribeModal.style';

/**
 * This Class component use for return the My Preference Subscribe Modal
 * can be passed in the component.
 * @param MyPreferenceAppSubscribeModal - is a  functional component we can use it within  any component
 * * @param onRequestClose - received onRequestClose function as param for closed popup
 * * @param onSubmit - received onSubmit function to handle form data
 */
class MyPreferenceAppSubscribeModal extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onRequestClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // activeModal: PropTypes.string.isRequired,
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
    const {
      className,
      // activeModal,
      onSubmit,
      onRequestClose,
      labels,
    } = this.props;

    return (
      <div className={className}>
        <BodyCopy component="div" className="myPreferenceModalWrapper">
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
            {isTCP()
              ? getLabelValue(labels, 'lbl_preference_push_notification_Tcp_download')
              : getLabelValue(labels, 'lbl_preference_push_notification_Gymboree_download')}
          </BodyCopy>

          <Row fullBleed className="elem-mb-LRG">
            <Col colSize={{ small: 3, medium: 4, large: 6 }}>
              <Anchor
                // TODO-Change url when GYM app url ready
                // href={`${ activeModal === 'tcpAppSubscribe'? externalEndpoints.appsStoreTcpAppPage
                //     : externalEndpoints.googlePlayTcpAppPage
                // }`}
                href={externalEndpoints.appsStoreTcpAppPage}
                className="elem-ml-SM"
                data-locator="my-preference-modal_app_store"
                target="_blank"
              >
                <Image class="elem-pl-XS" src={getIconPath('app-store')} />
              </Anchor>
            </Col>
            <Col colSize={{ small: 3, medium: 4, large: 6 }}>
              <Anchor
                // TODO-Change url when GYM app url ready
                // href={`${activeModal === 'tcpAppSubscribe' ? externalEndpoints.googlePlayTcpAppPage
                //     : externalEndpoints.googlePlayTcpAppPage
                // }`}
                href={externalEndpoints.googlePlayTcpAppPage}
                className="elem-ml-SM"
                target="_blank"
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
            className="layout-pb-LRG"
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
                dataLocator="subscribe-web-push_cancel"
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

export default withStyles(MyPreferenceAppSubscribeModal, styles);
export { MyPreferenceAppSubscribeModal as MyPreferenceAppSubscribeModalVanilla };
