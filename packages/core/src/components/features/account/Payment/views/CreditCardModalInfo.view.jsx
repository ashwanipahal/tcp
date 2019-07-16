import React from 'react';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';
import { getIconPath } from '../../../../../utils';
import { Image } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import CreditCardStyles from '../styles/CreditCardModalInfo.style';
import Address from '../../../../common/molecules/Address';

// @flow
type Props = {
  TotalExp: object,
  getAccNumbr: object,
  data: object,
  address: object,
  className: string,
};

class CreditCardModalInfo extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.cardIconMapping = {
      DISC: 'disc-small',
      MC: 'mc-small',
      Amex: 'amex-small',
      Visa: 'visa-small',
      GC: 'gift-card-small',
      'PLACE CARD': 'place-card-small',
      VENMO: 'venmo-blue-acceptance-mark',
    };
  }

  render() {
    const { TotalExp, getAccNumbr, data, address, className } = this.props;
    return (
      <div className={className}>
        <BodyCopy
          bodySize="five"
          fontWeight="bold"
          fontFamily="secondaryFontFamily"
          className="deleteCreditCardModal__modalTitle"
        >
          {data.heading}
        </BodyCopy>
        <BodyCopy className="deleteCreditCardModal__desc">
          <Image
            className="deleteCreditCardModal__img"
            src={getIconPath(this.cardIconMapping[data.description.ccBrand])}
            onClick={this.pause}
          />
          <BodyCopy className="deleteCreditCardModal__cardInfo" bodySize="three">
            <BodyCopy
              fontWeight="bold"
              fontFamily="secondaryFontFamily"
              className="is-visible"
              tag="span"
            >
              {data.cardText.cardEnd}
              {getAccNumbr}
            </BodyCopy>
            <BodyCopy
              fontWeight="normal"
              fontFamily="secondaryFontFamily"
              className="deleteCreditCardModal__expiry"
              tag="span"
            >
              {data.cardText.expire}
              {TotalExp}
            </BodyCopy>
          </BodyCopy>
          <Address
            address={address}
            fontWeight="normal"
            showCountry={false}
            showPhone={false}
            className="DeleteCreditCardAddress is-visible"
          />
        </BodyCopy>
      </div>
    );
  }
}

export default withStyles(CreditCardModalInfo, CreditCardStyles);
export { CreditCardModalInfo as GiftCardModalInfoVanilla };
