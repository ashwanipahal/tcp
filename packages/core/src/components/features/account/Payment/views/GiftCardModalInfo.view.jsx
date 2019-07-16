import React from 'react';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';
import { getIconPath } from '../../../../../utils';
import { Image } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/DeleteCardModal.style';

// @flow
type Props = {
  TotalExp: object,
  getAccNumbr: object,
  data: object,
};

class GiftCardModalInfo extends React.Component<Props> {
  render() {
    const { TotalExp, getAccNumbr, data } = this.props;
    return (
      <div>
        <BodyCopy
          bodySize="seven"
          fontWeight="bold"
          fontFamily="secondaryFontFamily"
          className="deleteCardModal_modalTitle"
        >
          {data.heading}
        </BodyCopy>
        <BodyCopy className="deleteCardModal_desc">
          {' '}
          <Image
            className="deleteCardModal_img"
            src={getIconPath('gift-card')}
            onClick={this.pause}
          />
          <BodyCopy className="deleteCardModal_cardInfo" bodySize="three">
            <BodyCopy
              fontWeight="bold"
              fontFamily="secondaryFontFamily"
              className="deleteCardModal_card"
              tag="span"
            >
              {data.cardText.cardEnd}
              {getAccNumbr}
            </BodyCopy>
            <BodyCopy
              fontWeight="normal"
              fontFamily="secondaryFontFamily"
              className="deleteCardModal_expiry"
              tag="span"
            >
              {data.cardText.expire}
              {TotalExp}
            </BodyCopy>
          </BodyCopy>
        </BodyCopy>
      </div>
    );
  }
}

export default withStyles(GiftCardModalInfo, styles);
export { GiftCardModalInfo as GiftCardModalInfoVanilla };
