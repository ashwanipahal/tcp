import React, { Component } from 'react';
import { connect } from 'react-redux';
import hoistNonReactStatic from 'hoist-non-react-statics';

export default function({ WrappedComponent, mapStateToProps, mapDispatchToProps }) {
  class IsomorphicRenderer extends Component {
    componentDidMount() {
      WrappedComponent.getInitialProps({ props: this.props });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  hoistNonReactStatic(IsomorphicRenderer, WrappedComponent, {
    getInitialProps: true,
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(IsomorphicRenderer);
}
