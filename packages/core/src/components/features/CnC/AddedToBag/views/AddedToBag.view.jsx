import React from 'react';
import PropTypes from 'prop-types';
import AddedToBagActions from '../../AddedToBagActions';
import AddedToBagViewPoints from '../../AddedToBagViewPoints';
import Modal from '../../../../common/molecules/Modal';
import withStyles from '../../../../common/hoc/withStyles';
import styles, { modalStyles } from '../styles/AddedToBag.style';
import ProductInformationView from '../molecules/ProductInformation/views/ProductInformation.views';
import BossBannerView from '../molecules/BossBanner/views/BossBanner.views';
import Anchor from '../../../../common/atoms/Anchor';

// @flow
type Props = {
  openState: Function,
  onRequestClose: Function,
  className: string,
  addedToBagData: any,
  labels: any,
  quantity: number,
  handleContinueShopping: Function,
};

const AddedToBag = ({
  openState,
  onRequestClose,
  addedToBagData,
  className,
  labels,
  quantity,
  handleContinueShopping,
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
      data-locator="addedToBag-modal"
      inheritedStyles={modalStyles}
    >
      <div className="addedToBagWrapper">
        <ProductInformationView data={addedToBagData} labels={labels} quantity={quantity} />
        <AddedToBagViewPoints labels={labels} className="added-to-bag-points" />
        <AddedToBagActions labels={labels} />
        <BossBannerView labels={labels} />
        <div className="continue-shopping">
          <Anchor
            fontSizeVariation="medium"
            underline
            anchorVariation="primary"
            handleLinkClick={handleContinueShopping}
            noLink
            to=""
            data-locator="addedToBag-continueShopping"
          >
            {labels.continueShopping}
          </Anchor>
        </div>
      </div>
    </Modal>
  );
};
AddedToBag.propTypes = {
  className: PropTypes.string.isRequired,
};

export default withStyles(AddedToBag, styles);
export { AddedToBag as AddedToBagVanilla };
