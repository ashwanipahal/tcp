import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { test } from './MyComponent.actions';
import MyComponent from './views/MyComponent';

export class MyComponentContainer extends PureComponent {
  componentDidMount() {
    const { testAction } = this.props;
    testAction('Test');
  }

  render() {
    const { children, ...otherProps } = this.props;
    return (
      <Fragment>
        <MyComponent {...otherProps} />
        {children}
      </Fragment>
    );
  }
}

MyComponentContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  testAction: PropTypes.func.isRequired,
};

MyComponentContainer.defaultProps = {
  children: null,
};

const mapStateToProps = () => {
  return {};
};

export const mapDispatchToProps = dispatch => ({
  testAction: payload => {
    dispatch(test(payload));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyComponentContainer);
