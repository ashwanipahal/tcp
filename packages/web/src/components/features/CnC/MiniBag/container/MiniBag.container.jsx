import React from 'react';
import { connect } from 'react-redux';
import MiniBagView from '../views/MiniBag.view';
import { getLabelsMiniBag, getTotalItemCount } from './MiniBag.selectors';

// @flow
type Props = {
  isOpen: boolean,
  totalItems: any,
  labels: any,
  toggleMiniBagModal: any,
};
export class MiniBagContainer extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal(e) {
    if (e) e.preventDefault();
    const { toggleMiniBagModal } = this.props;
    toggleMiniBagModal({ e, isOpen: false });
  }

  render() {
    const { labels, totalItems, isOpen } = this.props;
    return (
      <MiniBagView
        openState={isOpen}
        onRequestClose={this.closeModal}
        labels={labels}
        totalItems={totalItems}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    labels: getLabelsMiniBag(state),
    totalItems: getTotalItemCount(state),
  };
};
export default connect(mapStateToProps)(MiniBagContainer);
