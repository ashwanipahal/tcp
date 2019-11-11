import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { withRouter } from 'next/router'; // eslint-disable-line
import { connect } from 'react-redux';

export default function({ WrappedComponent, mapStateToProps, mapDispatchToProps }) {
  class IsomorphicRenderer extends Component {
    static async getInitialProps({ store, query, req, isServer }) {
      const props = { ...mapStateToProps(store.getState()), ...mapDispatchToProps(store.dispatch) };
      const intialProps = { props, query, isServer, req };
      const deviceBot = req && req.device && req.device.type === 'bot';
      if (isServer && deviceBot) {
        WrappedComponent.getInitialProps(intialProps);
      }
    }

    componentDidMount() {
      const { deviceType, ...props } = this.props;
      if (deviceType !== 'bot') {
        WrappedComponent.getInitialProps({ props });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  IsomorphicRenderer.propTypes = {
    deviceType: PropTypes.string.isRequired,
  };

  const selfMapStateToProps = state => {
    const childProps = mapStateToProps(state);
    return {
      ...childProps,
      deviceType: state.DeviceInfo && state.DeviceInfo.deviceType,
      routerParam: state.routerParam || state.router,
    };
  };

  return withRouter(
    connect(
      selfMapStateToProps,
      mapDispatchToProps
    )(IsomorphicRenderer)
  );
}
