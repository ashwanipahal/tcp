import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Notification from '../../../../../../common/molecules/Notification';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import TrackOrderForm from '../../TrackOrderForm';
import TrackOrderTopSection from '../../TrackOrderTopSection';
import TrackOrderBottomSection from '../../TrackOrderBottomSection';
import styles from '../styles/TrackOrderView.style';

const getGenericErrorMessage = labels => (
  <BodyCopy
    component="div"
    className="generic__error__message"
    fontSize="fs14"
    fontFamily="secondary"
  >
    <BodyCopy fontFamily="secondary">
      {labels.trackOrder && labels.trackOrder.lbl_trackOrder_genericError1}
    </BodyCopy>
    <Anchor
      data-locator="contact_us_form_help"
      underline
      anchorVariation="primary"
      fontFamily="secondary"
      to={labels.trackOrder && labels.trackOrder.lbl_trackOrder_genericErrorLinkHref}
      className="trackorder__modal__contactus"
      aria-label=""
      target="_blank"
    >
      {labels.trackOrder && labels.trackOrder.lbl_trackOrder_genericErrorLinkText}
    </Anchor>
    <BodyCopy fontFamily="secondary">
      {labels.trackOrder && labels.trackOrder.lbl_trackOrder_genericError2}
    </BodyCopy>
  </BodyCopy>
);

export const TrackOrderView = ({
  labels,
  errorMessage,
  onSubmit,
  openLoginOverlay,
  setModalMountState,
  showNotification,
  onChangeForm,
  className,
}) => {
  return (
    <BodyCopy component="div" className={className}>
      <TrackOrderTopSection labels={labels} className="trackorder__modal__topsection" />
      {errorMessage ? (
        <Notification
          status={showNotification}
          colSize={{ large: 12, medium: 8, small: 6 }}
          message={errorMessage !== 'genericError' ? errorMessage : null}
        >
          {errorMessage === 'genericError' ? getGenericErrorMessage(labels) : null}
        </Notification>
      ) : null}

      <TrackOrderForm
        labels={labels}
        handleSubmit={onSubmit}
        className="trackorder__modal__form"
        onChangeForm={onChangeForm}
      />
      <TrackOrderBottomSection
        labels={labels}
        className="trackorder__modal__bottomsection"
        openLoginOverlay={openLoginOverlay}
        setModalMountState={setModalMountState}
      />
    </BodyCopy>
  );
};

TrackOrderView.propTypes = {
  labels: PropTypes.shape({
    trackOrder: PropTypes.shape({}),
  }).isRequired,
  className: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  openLoginOverlay: PropTypes.func.isRequired,
  setModalMountState: PropTypes.func.isRequired,
  showNotification: PropTypes.string.isRequired,
  onChangeForm: PropTypes.func.isRequired,
};

export default withStyles(TrackOrderView, styles);
export { TrackOrderView as TrackOrderViewVanilla };
