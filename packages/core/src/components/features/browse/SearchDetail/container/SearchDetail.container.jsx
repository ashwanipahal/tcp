import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'; //eslint-disable-line
import SearchDetail from '../views/SearchDetail.view';

class SearchDetailContainer extends React.PureComponent {
  render() {
    return <SearchDetail />;
  }
}

function mapStateToProps() {}

function mapDispatchToProps() {}

SearchDetailContainer.propTypes = {};

SearchDetailContainer.defaultProps = {};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchDetailContainer)
);
