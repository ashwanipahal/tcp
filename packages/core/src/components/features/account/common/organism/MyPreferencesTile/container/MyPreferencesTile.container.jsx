import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyPreferencesTileComponent from '../views';
import { getSiteId } from '../../../../../../../utils';
import { getLabels } from '../../../../Account/container/Account.selectors';

class MyPreferencesTile extends PureComponent {
  componentDidMount() {
  }

  render() {
    const { labels, navigation } = this.props;
    return (
      <MyPreferencesTileComponent labels={labels} navigation={navigation} />
    );
  }
}

MyPreferencesTile.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
};


export const mapStateToProps = state => ({
  labels: getLabels(state),
});

// export const mapDispatchToProps = dispatch => ({
//   fetchOrders: payload => {
//     dispatch(getOrdersList(payload));
//   },
// });

export { MyPreferencesTile as MyPreferencesTileVanilla };

export default connect(
  mapStateToProps,
  null
)(MyPreferencesTile);
