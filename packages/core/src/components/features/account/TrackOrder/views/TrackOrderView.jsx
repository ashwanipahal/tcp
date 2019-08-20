import React from 'react';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import TrackOrderForm from '../molecules/TrackOrderForm';
import TrackOrderTopSection from '../molecules/TrackOrderTopSection';
import TrackOrderBottomSection from '../molecules/TrackOrderBottomSection';
import styles from '../styles/TrackOrderView.style';

// @flow
type Props = {
  labels: object,
  errorMessage: string,
  onSubmit: Function,
  openLoginOverlay: Function,
  setModalMountState: Function,
};
export const TrackOrderView = ({
  labels,
  errorMessage,
  onSubmit,
  openLoginOverlay,
  setModalMountState,
}: Props) => {
  return (
    <React.Fragment>
      <TrackOrderTopSection labels={labels} className="trackorder__modal__topsection" />
      <TrackOrderForm
        errorMessage={errorMessage}
        labels={labels}
        handleSubmit={onSubmit}
        className="trackorder__modal__form"
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
