/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import AddedToBagActions from '../../AddedToBagActions';
import AddedToBagViewPoints from '../../AddedToBagViewPoints';
import Modal from '../../../../common/molecules/Modal';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/AddedToBag.style';

const AddedToBag = ({
  openState,
  onRequestClose,
  addedToBagData,
  className,
  getOrderPointsSummary,
}) => {
  return (
    <Modal
      fixedWidth
      isOpen={openState}
      onRequestClose={onRequestClose}
      maxWidth="375px"
      minHeight="1000px"
      heading={'ADDED TO BAG'}
      overlayClassName="TCPModal__Overlay"
      className={`TCPModal__Content, ${className}`}
      closeIconDataLocator="added-to-bg-close"
    >
      <div className="addedToBagWrapper">
        Integrate here your
        {JSON.stringify(addedToBagData)}
        <AddedToBagActions />
        <AddedToBagViewPoints className="added-to-bag-points" />
      </div>
    </Modal>
  );
};
AddedToBag.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(AddedToBag, styles);
export { AddedToBag as AddedToBagVanilla };
