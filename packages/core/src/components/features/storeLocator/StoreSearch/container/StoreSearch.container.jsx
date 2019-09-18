import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { test } from './StoreSearch.actions';
import StoreSearch from './views/StoreSearch';

export class StoreSearchContainer extends PureComponent {
  componentDidMount() {
    const { testAction } = this.props;
    testAction('Test');
  }

  render() {
    const { children, ...otherProps } = this.props;
    return (
      <Fragment>
        <StoreSearch {...otherProps} />
        {children}
      </Fragment>
    );
  }
}

StoreSearchContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  testAction: PropTypes.func.isRequired,
};

StoreSearchContainer.defaultProps = {
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
)(StoreSearchContainer);
