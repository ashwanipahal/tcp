import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function({ WrappedComponent, mapStateToProps, mapDispatchToProps }) {
  class IsomorphicRenderer extends Component {
    componentDidMount() {
      WrappedComponent.initiateApiCall({ props: this.props });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(IsomorphicRenderer);
}
