import React from 'react';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';
import { getIconPath } from '../../../../../utils';
import { Image } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/DeleteCardModal.style';

// @flow
type Props = {
  getAccNumbr: object,
  data: object,
};

class GiftCardModalInfo extends React.Component<Props> {
  render() {
    const { getAccNumbr, data } = this.props;
    return (
      <div>
        <BodyCopy
          bodySize="seven"
          fontWeight="bold"
          fontFamily="secondaryFontFamily"
          className="deleteCardModal__modalTitle"
          data-locator="deletegcmodalheadinng"
        >
          {data.heading}
        </BodyCopy>
        <BodyCopy className="deleteCardModal__desc">
          {' '}
          <Image
            className="deleteCardModal__img"
            src={getIconPath('gift-card-small')}
            onClick={this.pause}
            data-locator="deletegcmodalicon"
          />
          <BodyCopy className="deleteCardModal__cardInfo layout-pb-LRG" bodySize="three">
            <BodyCopy
              fontWeight="bold"
              fontFamily="secondaryFontFamily"
              className="deleteCardModal__card"
              tag="span"
              data-locator="deletegcmodalcardendingtext"
            >
              {data.cardText.cardEnd}
              {getAccNumbr}
            </BodyCopy>
          </BodyCopy>
        </BodyCopy>
      </div>
    );
  }
}

export default withStyles(GiftCardModalInfo, styles);
export { GiftCardModalInfo as GiftCardModalInfoVanilla };
