import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { socialAccountLoad, savesocialAccount } from './Social.actions';
import { getsocialDataOnLoadState } from './Social.selectors';
import Socialview from '../Views/Social.view';

class SocialContainer extends React.PureComponent {
  static propTypes = {
    socialLoad: PropTypes.shape({}).isRequired,
    saveSocialAcc: PropTypes.shape({}).isRequired,
    getSocialLoad: PropTypes.shape({}).isRequired,
  };

  componentDidMount() {
    const { socialLoad } = this.props;
    socialLoad();
  }

  render() {
    const { socialLoad, saveSocialAcc, getSocialLoad } = this.props;
    return (
      <Socialview
        getSocialLoad={getSocialLoad}
        saveSocialAcc={saveSocialAcc}
        socialLoad={socialLoad}
      />
    );
  }
}

SocialContainer.propTypes = {};

const mapDispatchToProps = dispatch => {
  return {
    socialLoad: () => {
      dispatch(socialAccountLoad());
    },
    saveSocialAcc: OBJ => {
      dispatch(savesocialAccount(OBJ));
    },
  };
};

const mapStateToProps = state => {
  return {
    getSocialLoad: getsocialDataOnLoadState(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialContainer);
