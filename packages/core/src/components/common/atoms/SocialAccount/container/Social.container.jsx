import React from 'react';
import { connect } from 'react-redux';
import { socialAccountLoad, savesocialAccount } from './Social.actions';
import { FacebookLoginComponent } from '../Views/facebookLoginComponent';

class SocialContainer extends React.PureComponent {
  componentDidMount() {
    const { socialLoad } = this.props;
    socialLoad();
  }

  render() {
    const { socialLoad, saveSocialAcc } = this.props;
    return <FacebookLoginComponent saveSocialAcc={saveSocialAcc} socialLoad={socialLoad} />;
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

const mapStateToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialContainer);
