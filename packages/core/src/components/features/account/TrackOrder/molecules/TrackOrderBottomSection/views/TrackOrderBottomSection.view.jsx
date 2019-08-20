import React from 'react';
import withStyles from '../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import styles from '../styles/TrackOrderBottomSection.style';

// @flow
type Props = {
  labels: object,
  className: string,
  setModalMountState: Function,
  openLoginOverlay: Function,
};

class TrackOrderBottomSection extends React.Component<Props> {
  handleDefaultLinkClick(e) {
    const { openLoginOverlay, setModalMountState } = this.props;
    e.preventDefault();
    setModalMountState({ state: false });
    openLoginOverlay({
      component: e.target.id,
      variation: 'primary',
    });
  }

  render() {
    const { labels, className } = this.props;
    return (
      <BodyCopy className={`${className} center-align`} component="div">
        <BodyCopy className="trackorder__modal__section center-align" component="div">
          <BodyCopy
            fontSize="fs12"
            fontWeight="regular"
            fontFamily="secondary"
            data-locator="trackordermodal-overlaycontent1"
            className="trackorder__modal__overlaycontent"
            component="p"
          >
            {labels.trackOrder.lbl_header_trackOrderOverlay_haveAccount}
          </BodyCopy>
          <BodyCopy
            fontSize="fs12"
            fontWeight="regular"
            fontFamily="secondary"
            data-locator="trackordermodal-overlaycontent1"
            className="trackorder__modal__overlaycontent"
            component="p"
          >
            <Anchor
              data-locator="track_order_login"
              id="login"
              underline
              anchorVariation="primary"
              fontSize="fs12"
              href="#"
              onClick={e => this.handleDefaultLinkClick(e)}
              className="trackorder__modal__loginlink"
            >
              {labels.trackOrder.lbl_header_trackOrderOverlay_login}
            </Anchor>
            {labels.trackOrder.lbl_header_trackOrderOverlay_content1}
          </BodyCopy>
        </BodyCopy>
        <BodyCopy
          fontSize="fs12"
          fontWeight="regular"
          fontFamily="secondary"
          data-locator="trackordermodal-overlaycontent2"
          className="trackorder__modal__overlaycontent center-align center-align-row"
          component="p"
        >
          <Anchor
            data-locator="track_order_click_here"
            underline
            anchorVariation="primary"
            fontSize="fs12"
            to={labels.trackOrder.lbl_header_trackOrderOverlay_internationTrackOrderLink}
            target="_blank"
            className="trackorder__modal__clickhere_link"
          >
            {labels.trackOrder.lbl_header_trackOrderOverlay_clickHere}
          </Anchor>
          {labels.trackOrder.lbl_header_trackOrderOverlay_content2}
        </BodyCopy>
      </BodyCopy>
    );
  }
}

export default withStyles(TrackOrderBottomSection, styles);
export { TrackOrderBottomSection as TrackOrderBottomSectionVanilla };
