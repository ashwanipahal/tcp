import React from 'react';
import { PropTypes } from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
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

/**
 * @function create generic error message module.
 * @param {Object} labels - to render generic error message module
 */
const getGenericErrorMessage = labels => (
  <GenericErrorView>
    <BodyCopy
      text={getLabelValue(labels, 'lbl_trackOrder_genericErrorTryAgain', 'trackOrder')}
      mobilefontFamily={['secondary']}
      fontSize="fs14"
    />
    <AnchorView>
      <Anchor
        data-locator="contact_us_form_help"
        underline
        anchorVariation="primary"
        url={getLabelValue(labels, 'lbl_trackOrder_genericErrorLinkHref', 'trackOrder')}
        text={getLabelValue(labels, 'lbl_trackOrder_genericErrorLinkText', 'trackOrder')}
      />
    </AnchorView>

    <BodyCopy
      text={getLabelValue(labels, 'lbl_trackOrder_genericErrorAssistance', 'trackOrder')}
      mobilefontFamily={['secondary']}
      fontSize="fs14"
    />
  </GenericErrorView>
);

export const TrackOrderView = ({
  labels,
  errorMessage,
  onSubmit,
  showNotification,
  onChangeForm,
  handleToggle,
  setModalMountState,
}) => {
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
      <TrackOrderBottomSection
        labels={labels}
        toggleModal={handleToggle}
        setModalMountState={setModalMountState}
      />
    </TrackOrderViewNative>
  );
};

TrackOrderView.propTypes = {
  labels: PropTypes.shape({
    trackOrder: PropTypes.shape({}),
  }).isRequired,
  errorMessage: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  setModalMountState: PropTypes.func.isRequired,
  showNotification: PropTypes.string.isRequired,
  onChangeForm: PropTypes.func.isRequired,
};

export default TrackOrderView;
