import React from 'react';
import Anchor from '../../../../../../common/atoms/Anchor';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Notification from '../../../../../../common/molecules/Notification';
import TrackOrderForm from '../../TrackOrderForm';
import TrackOrderTopSection from '../../TrackOrderTopSection';
import TrackOrderBottomSection from '../../TrackOrderBottomSection';
import {
  TrackOrderViewNative,
  GenericErrorView,
  AnchorView,
} from '../styles/TrackOrderView.native.style';

const getGenericErrorMessage = labels => (
  <GenericErrorView>
    <BodyCopy
      text={labels.trackOrder.lbl_header_trackOrderOverlay_genericError1}
      mobilefontFamily={['secondary']}
      fontSize="fs14"
    />
    <AnchorView>
      <Anchor
        data-locator="contact_us_form_help"
        underline
        anchorVariation="primary"
        url={labels.trackOrder.lbl_header_trackOrderOverlay_genericErrorLinkHref}
        text={labels.trackOrder.lbl_header_trackOrderOverlay_genericErrorLink}
      />
    </AnchorView>

    <BodyCopy
      text={labels.trackOrder.lbl_header_trackOrderOverlay_genericError2}
      mobilefontFamily={['secondary']}
      fontSize="fs14"
    />
  </GenericErrorView>
);

// @flow
type Props = {
  labels: object,
  errorMessage: string,
  onSubmit: Function,
  showNotification: string,
  onChangeForm: Function,
  onRequestClose: Function,
};
export const TrackOrderView = ({
  labels,
  errorMessage,
  onSubmit,
  showNotification,
  onChangeForm,
  onRequestClose,
}: Props) => {
  return (
    <TrackOrderViewNative>
      <TrackOrderTopSection labels={labels} />
      {errorMessage ? (
        <Notification
          status={showNotification}
          colSize={{ large: 12, medium: 8, small: 6 }}
          message={errorMessage !== 'genericError' ? errorMessage : null}
        >
          {errorMessage === 'genericError' ? getGenericErrorMessage(labels) : null}
        </Notification>
      ) : null}
      <TrackOrderForm labels={labels} handleSubmit={onSubmit} onChangeForm={onChangeForm} />
      <TrackOrderBottomSection labels={labels} toggleModal={onRequestClose} />
    </TrackOrderViewNative>
  );
};

export default TrackOrderView;
