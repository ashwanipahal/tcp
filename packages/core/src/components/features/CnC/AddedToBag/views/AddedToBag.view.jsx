/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import AddedToBagActions from '../../AddedToBagActions';
import AddedToBagViewPoints from '../../AddedToBagViewPoints';
import Modal from '../../../../common/molecules/Modal';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/AddedToBag.style';

// @flow
type Props = {
  openState: Function,
  onRequestClose: Function,
  className: string,
  addedToBagData: any,
  getOrderPointsSummary: any,
};

const AddedToBag = ({
  openState,
  onRequestClose,
  addedToBagData,
  className,
  getOrderPointsSummary,
}: Props) => {
  return (
    <Modal
      fixedWidth
      isOpen={openState}
      onRequestClose={onRequestClose}
      heading="ADDED TO BAG"
      overlayClassName="TCPModal__Overlay"
      className={`TCPModal__Content, ${className}`}
      closeIconDataLocator="added-to-bg-close"
      aria={{
        labelledby: 'Added To Bag',
        describedby: 'Added To Bag Modal',
      }}
    >
      <div className="addedToBagWrapper">
        Integrate here your Integrate here your Integrate here yourIntegrate here yourIntegrate here
        yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate
        here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here
        yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate
        here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here
        yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate
        here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here
        yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate
        here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here
        yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate
        here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here
        yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate
        here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here
        yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate
        here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here
        yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate here yourIntegrate
        here yourIntegrate here yourIntegrate here your
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
