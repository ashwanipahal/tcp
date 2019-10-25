import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyPlaceRewardsCreditCard from '../views';
import gelLabels from './MyPlaceRewardsCreditCard.selectors';

export class MyPlaceRewardsCreditCardContainer extends PureComponent {

  render() {
    const { labels } = this.props;
    return (
      <MyPlaceRewardsCreditCard
        labels={labels}
      />
    );
  }
}

MyPlaceRewardsCreditCardContainer.propTypes = {
  labels: PropTypes.shape({}),
}

MyPlaceRewardsCreditCardContainer.defaultProps = {
  labels: {}
}

const mapStateToProps = (state) => {
  return {
    labels: gelLabels(state)
  }
}

export default connect(mapStateToProps)(MyPlaceRewardsCreditCardContainer);
