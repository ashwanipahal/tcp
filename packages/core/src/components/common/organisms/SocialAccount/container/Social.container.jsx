import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSocialAccount, saveSocialAccount, showPointModalDetails } from './Social.actions';
import { getsocialDataOnLoadState, getPointsModal } from './Social.selectors';
import Socialview from '../Views/Social.view';
import { isPlccUser } from '../../../../features/account/User/container/User.selectors';

class SocialContainer extends React.PureComponent {
  static propTypes = {
    socialLoad: PropTypes.func.isRequired,
    saveSocialAcc: PropTypes.func.isRequired,
    getSocialAcc: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
    pointModalClose: PropTypes.func.isRequired,
    setPointsModal: PropTypes.func.isRequired,
    isPlcc: PropTypes.string.isRequired,
    handleComponentChange: PropTypes.func,
    urlParams: PropTypes.shape({}),
    componentProps: PropTypes.shape({}),
  };

  static defaultProps = {
    handleComponentChange: () => {},
    urlParams: {},
    componentProps: {},
  };

  componentDidMount() {
    const { socialLoad } = this.props;
    socialLoad();
  }

  render() {
    const {
      socialLoad,
      saveSocialAcc,
      getSocialAcc,
      labels,
      setPointsModal,
      pointModalClose,
      isPlcc,
      handleComponentChange,
      urlParams,
      componentProps,
    } = this.props;
    return (
      <Socialview
        getSocialAcc={getSocialAcc}
        saveSocialAcc={saveSocialAcc}
        socialLoad={socialLoad}
        labels={labels}
        setPointsModal={setPointsModal}
        pointModalClose={pointModalClose}
        isPlcc={isPlcc}
        handleComponentChange={handleComponentChange}
        urlParams={urlParams}
        componentProps={componentProps}
      />
    );
  }
}

SocialContainer.propTypes = {};

export const mapDispatchToProps = dispatch => {
  return {
    socialLoad: () => {
      dispatch(getSocialAccount());
    },
    saveSocialAcc: payload => {
      dispatch(saveSocialAccount(payload));
    },
    // point modal function will help to open /close the modal which is available after social account login
    pointModalClose: payload => {
      dispatch(showPointModalDetails(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    getSocialAcc: getsocialDataOnLoadState(state),
    // initial state of the social point modal
    setPointsModal: getPointsModal(state),
    isPlcc: isPlccUser(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialContainer);
