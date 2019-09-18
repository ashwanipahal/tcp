import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSocialAccount, saveSocialAccount } from './Social.actions';
import { getsocialDataOnLoadState } from './Social.selectors';
import Socialview from '../Views/Social.view';

class SocialContainer extends React.PureComponent {
  static propTypes = {
    socialLoad: PropTypes.func.isRequired,
    saveSocialAcc: PropTypes.func.isRequired,
    getSocialAcc: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
  };

  componentDidMount() {
    const { socialLoad } = this.props;
    socialLoad();
  }

  render() {
    const { socialLoad, saveSocialAcc, getSocialAcc, labels } = this.props;
    return (
      <Socialview
        getSocialAcc={getSocialAcc}
        saveSocialAcc={saveSocialAcc}
        socialLoad={socialLoad}
        labels={labels}
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
  };
};

const mapStateToProps = state => {
  return {
    getSocialAcc: getsocialDataOnLoadState(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialContainer);
