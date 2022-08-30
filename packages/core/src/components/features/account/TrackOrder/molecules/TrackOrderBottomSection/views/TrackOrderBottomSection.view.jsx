import React from 'react';
import { PropTypes } from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import withStyles from '../../../../../../common/hoc/withStyles';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import styles from '../styles/TrackOrderBottomSection.style';

/**
 * @function TrackOrderBottomSection The TrackOrderBottomSection component shows the Track Order Modal bottom section.
 * This component includes the Track order bottom view with all the required.
 * @param {props} props object with details to render in modal
 */
class TrackOrderBottomSection extends React.Component {
  handleDefaultLinkClick(e) {
    const { openLoginOverlay, setModalMountState } = this.props;
    e.preventDefault();
    setModalMountState({ state: false });
    openLoginOverlay({
      component: 'login',
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
            {getLabelValue(labels, 'lbl_trackOrder_haveAccount', 'trackOrder')}
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
              dataLocator="track_order_login"
              underline
              anchorVariation="primary"
              fontSize="fs12"
              href="#"
              onClick={e => this.handleDefaultLinkClick(e)}
              className="trackorder__modal__loginlink"
              aria-label={`${getLabelValue(labels, 'lbl_trackOrder_login', 'trackOrder')}
                ${getLabelValue(labels, 'lbl_trackOrder_content', 'trackOrder')}`}
            >
              {getLabelValue(labels, 'lbl_trackOrder_login', 'trackOrder')}
            </Anchor>
            {getLabelValue(labels, 'lbl_trackOrder_content', 'trackOrder')}
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
            dataLocator="track_order_click_here"
            underline
            anchorVariation="primary"
            fontSize="fs12"
            to={getLabelValue(labels, 'lbl_trackOrder_internationTrackOrderLink', 'trackOrder')}
            target="_blank"
            className="trackorder__modal__clickhere_link"
            aria-label={`${getLabelValue(labels, 'lbl_trackOrder_clickHere', 'trackOrder')}
                ${getLabelValue(labels, 'lbl_trackOrder_subContent', 'trackOrder')}`}
          >
            {getLabelValue(labels, 'lbl_trackOrder_clickHere', 'trackOrder')}
          </Anchor>
          {getLabelValue(labels, 'lbl_trackOrder_subContent', 'trackOrder')}
        </BodyCopy>
      </BodyCopy>
    );
  }
}

TrackOrderBottomSection.propTypes = {
  labels: PropTypes.shape({
    trackOrder: PropTypes.shape({}),
  }).isRequired,
  openLoginOverlay: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  setModalMountState: PropTypes.func.isRequired,
};

export default withStyles(TrackOrderBottomSection, styles);
export { TrackOrderBottomSection as TrackOrderBottomSectionVanilla };
