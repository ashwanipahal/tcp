import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getStoreList } from './StoreList.actions';
import StoreListView from './views/StoreList';
import { getLabels, getStoreFormattedList } from './StoreList.selectors';
import mockLabels from './__mocks__/labels.mock';

export class StoreListContainer extends PureComponent {
  componentDidMount() {
    const { getStoresList } = this.props;
    getStoresList();
  }

  render() {
    const { labels, storeListUS, storeListCA } = this.props;
    return (
      <StoreListView labels={labels || mockLabels} storesList={{ storeListUS, storeListCA }} />
    );
  }
}

StoreListContainer.propTypes = {
  getStoresList: PropTypes.func.isRequired,
  labels: PropTypes.shape({}),
  storeListUS: PropTypes.shape([]),
  storeListCA: PropTypes.shape([]),
};

StoreListContainer.defaultProps = {
  labels: {},
  storeListUS: [],
  storeListCA: [],
};

const mapStateToProps = state => {
  return {
    labels: getLabels(state),
    storeListUS: getStoreFormattedList(state, 'US'),
    storeListCA: getStoreFormattedList(state, 'CA'),
  };
};

export const mapDispatchToProps = dispatch => ({
  getStoresList: () => {
    dispatch(getStoreList());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreListContainer);
