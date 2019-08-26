import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Notification from '../../../../../../common/molecules/Notification';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import TrackOrderForm from '../../TrackOrderForm';
import TrackOrderTopSection from '../../TrackOrderTopSection';
import TrackOrderBottomSection from '../../TrackOrderBottomSection';
import styles from '../styles/TrackOrderView.style';

const getGenericErrorMessage = labels => (
  <BodyCopy component="div" className="generic__error__message">
    <BodyCopy>{labels.trackOrder.lbl_header_trackOrderOverlay_genericError1}</BodyCopy>
    <Anchor
      data-locator="contact_us_form_help"
      underline
      anchorVariation="primary"
      fontSize="fs12"
      href={labels.trackOrder.lbl_header_trackOrderOverlay_genericErrorLinkHref}
      className="trackorder__modal__contactus"
      aria-label=""
    >
      {labels.trackOrder.lbl_header_trackOrderOverlay_genericErrorLink}
    </Anchor>
    <BodyCopy>{labels.trackOrder.lbl_header_trackOrderOverlay_genericError2}</BodyCopy>
  </BodyCopy>
);

// @flow
type Props = {
  labels: object,
  errorMessage: string,
  onSubmit: Function,
  openLoginOverlay: Function,
  setModalMountState: Function,
  showNotification: string,
  onChangeForm: Function,
  className: string,
};
export const TrackOrderView = ({
  labels,
  errorMessage,
  onSubmit,
  openLoginOverlay,
  setModalMountState,
  showNotification,
  onChangeForm,
  className,
}: Props) => {
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

export default withStyles(TrackOrderView, styles);
export { TrackOrderView as TrackOrderViewVanilla };
