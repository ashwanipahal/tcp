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
    pointModalClose: payload => {
      dispatch(showPointModalDetails(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    getSocialAcc: getsocialDataOnLoadState(state),
    setPointsModal: getPointsModal(state),
    isPlcc: isPlccUser(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialContainer);
