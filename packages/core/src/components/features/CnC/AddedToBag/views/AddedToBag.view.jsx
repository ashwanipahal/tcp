import React from 'react';
import Modal from '../../../../common/molecules/Modal';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/AddedToBag.style';
import ProductInformationView from '../../ProductInformation/views/ProductInformation.views';
import BossBannerView from '../../BossBanner/views/BossBanner.views';

// @flow
type Props = {
  openState: Function,
  onRequestClose: Function,
  className: string,
  addedToBagData: any,
};

const AddedToBag = ({ openState, onRequestClose, addedToBagData, className }: Props) => {
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
        <ProductInformationView data={addedToBagData} />
        <BossBannerView />

        {JSON.stringify(addedToBagData)}
      </div>
    </Modal>
  );
};

export default withStyles(AddedToBag, styles);
export { AddedToBag as AddedToBagVanilla };
