import React from 'react';
import { PropTypes } from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import {
  AnchorTextView,
  LogginView,
  ModalBottomView,
} from '../styles/TrackOrderBottomSection.native.style';

/**
 * @function TrackOrderBottomSection The TrackOrderBottomSection component shows the Track Order Modal bottom section.
 * This component includes the Track order bottom view with all the required.
 * @param {props} props object with details to render in modal
 */
class TrackOrderBottomSection extends React.Component {
  handleDefaultLinkClick(e) {
    e.preventDefault();
    const { toggleModal, setModalMountState } = this.props;
    const comp = {
      getComponentId: {
        login: true,
        createAccount: false,
        trackOrder: false,
      },
    };
    setModalMountState({ state: false });
    toggleModal(comp);
  }

  render() {
    const { labels } = this.props;
    return (
      <ModalBottomView>
        <LogginView>
          <BodyCopy text={labels.trackOrder.lbl_trackOrder_haveAccount} />
          <AnchorTextView>
            <Anchor
              data-locator="track_order_login"
              accessibilityLabel={`${labels.trackOrder.lbl_trackOrder_login}
                ${labels.trackOrder.lbl_trackOrder_content1}`}
              text={labels.trackOrder.lbl_trackOrder_login}
              anchorVariation="primary"
              onPress={e => this.handleDefaultLinkClick(e)}
              underline
            />
            <BodyCopy text={labels.trackOrder.lbl_trackOrder_content1} />
          </AnchorTextView>
        </LogginView>
        <AnchorTextView>
          <Anchor
            locator="track_order_click_here"
            anchorVariation="primary"
            url={labels.trackOrder.lbl_trackOrder_internationTrackOrderLink}
            accessibilityLabel={`${labels.trackOrder.lbl_trackOrder_clickHere}
                ${labels.trackOrder.lbl_trackOrder_content2}`}
            text={labels.trackOrder.lbl_trackOrder_clickHere}
            underline
          />
          <BodyCopy text={labels.trackOrder.lbl_trackOrder_content2} />
        </AnchorTextView>
      </ModalBottomView>
    );
  }
}

TrackOrderBottomSection.propTypes = {
  labels: PropTypes.shape({
    trackOrder: PropTypes.shape({}),
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
  setModalMountState: PropTypes.func.isRequired,
};

export default TrackOrderBottomSection;
