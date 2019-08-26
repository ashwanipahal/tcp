import React from 'react';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import {
  AnchorTextView,
  LogginView,
  ModalBottomView,
} from '../styles/TrackOrderBottomSection.native.style';

// @flow
type Props = {
  labels: object,
  toggleModal: Function,
};

/**
 * @function TrackOrderBottomSection The TrackOrderBottomSection component shows the Track Order Modal bottom section.
 * This component includes the Track order bottom view with all the required.
 * @param {props} props object with details to render in modal
 */
class TrackOrderBottomSection extends React.Component<Props> {
  handleDefaultLinkClick() {
    const { toggleModal } = this.props;
    const comp = {
      getComponentId: {
        login: true,
        createAccount: false,
        trackOrder: false,
      },
    };
    toggleModal({});
    toggleModal(comp);
  }

  render() {
    const { labels } = this.props;
    return (
      <ModalBottomView>
        <LogginView>
          <BodyCopy text={labels.trackOrder.lbl_header_trackOrderOverlay_haveAccount} />
          <AnchorTextView>
            <Anchor
              data-locator="track_order_login"
              accessibilityLabel={`${labels.trackOrder.lbl_header_trackOrderOverlay_login}
                ${labels.trackOrder.lbl_header_trackOrderOverlay_content1}`}
              text={labels.trackOrder.lbl_header_trackOrderOverlay_login}
              anchorVariation="primary"
              onPress={this.handleDefaultLinkClick}
              underline
            />
            <BodyCopy text={labels.trackOrder.lbl_header_trackOrderOverlay_content1} />
          </AnchorTextView>
        </LogginView>
        <AnchorTextView>
          <Anchor
            locator="track_order_click_here"
            anchorVariation="primary"
            url={labels.trackOrder.lbl_header_trackOrderOverlay_internationTrackOrderLink}
            accessibilityLabel={`${labels.trackOrder.lbl_header_trackOrderOverlay_clickHere}
                ${labels.trackOrder.lbl_header_trackOrderOverlay_content2}`}
            text={labels.trackOrder.lbl_header_trackOrderOverlay_clickHere}
            underline
          />
          <BodyCopy text={labels.trackOrder.lbl_header_trackOrderOverlay_content2} />
        </AnchorTextView>
      </ModalBottomView>
    );
  }
}

export default TrackOrderBottomSection;
