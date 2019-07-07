import React from 'react';
import Anchor from '../../../../common/atoms/Anchor';

// @flow

type Props = {
  className: string,
  setDeleteModalMountState: Function,
  setSelectedGiftCard: Function,
  giftcard: Object,
};

class CardTile extends React.Component<Props> {
  onDeletegiftardClick = e => {
    const { giftcard, setDeleteModalMountState, setSelectedGiftCard } = this.props;
    e.preventDefault();
    setSelectedGiftCard(giftcard);
    setDeleteModalMountState({ state: true });
  };

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <div className="giftardTile__row">
          <Anchor
            fontSizeVariation="large"
            underline
            to="/#"
            anchorVariation="primary"
            onClick={e => this.onDeletegiftardClick(e)}
          >
            delete
          </Anchor>
        </div>
      </div>
    );
  }
}

export default CardTile;
