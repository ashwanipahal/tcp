import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import Notification from '../../../../../../common/molecules/Notification';
import TrackOrderForm from '../../TrackOrderForm';
import TrackOrderTopSection from '../../TrackOrderTopSection';
import TrackOrderBottomSection from '../../TrackOrderBottomSection';
import styles from '../styles/TrackOrderView.style';

// @flow
type Props = {
  labels: object,
  errorMessage: string,
  onSubmit: Function,
  openLoginOverlay: Function,
  setModalMountState: Function,
  showNotification: string,
  onChangeForm: Function,
};
export const TrackOrderView = ({
  labels,
  errorMessage,
  onSubmit,
  openLoginOverlay,
  setModalMountState,
  showNotification,
  onChangeForm,
}: Props) => {
  return (
    <React.Fragment>
      <TrackOrderTopSection labels={labels} className="trackorder__modal__topsection" />
      {errorMessage ? (
        <Notification
          status={showNotification}
          colSize={{ large: 12, medium: 8, small: 6 }}
          message={errorMessage}
        />
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
    </React.Fragment>
  );
};

export default withStyles(TrackOrderView, styles);
export { TrackOrderView as TrackOrderViewVanilla };
