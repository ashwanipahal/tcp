import React from 'react';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';
import { getIconPath } from '../../../../../utils';
import { Image } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import CreditCardStyles from '../styles/CreditCardModalInfo.style';
import Address from '../../../../common/molecules/Address';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';

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
        <Row fullBleed className="CreditCardHeading">
          <Col
            colSize={{
              small: 12,
              large: 12,
              medium: 12,
            }}
          >
            <BodyCopy
              bodySize="five"
              fontWeight="bold"
              fontFamily="secondaryFontFamily"
            >
              {data.heading}
            </BodyCopy>
          </Col>
        </Row>

        <Row fullBleed className="CreditCardInfo">
          <Col
            colSize={{
              small: 2,
              large: 6,
              medium: 8,
            }}
          >
            <BodyCopy>
              <Image
                src={getIconPath(this.cardIconMapping[data.description.ccBrand])}
                onClick={this.pause}
              />
            </BodyCopy>
          </Col>
          <Col
            colSize={{
              small: 6,
              large: 5,
              medium: 8,
            }}
          >
            <BodyCopy fontWeight="bold" fontFamily="secondaryFontFamily" tag="span">
              {data.cardText.cardEnd}
              {getAccNumbr}
            </BodyCopy>
          </Col>
          <Col
            colSize={{
              small: 6,
              large: 5,
              medium: 8,
            }}
          >
            <BodyCopy
              fontWeight="normal"
              fontFamily="secondaryFontFamily"
              tag="span"
            >
              {data.cardText.expire}
              {TotalExp}
            </BodyCopy>
          </Col>
        </Row>
        <Row fullBleed className="CreditCardAddress">
          <Col
            colSize={{
              small: 6,
              large: 10,
              medium: 8,
            }}
          >
            <BodyCopy bodySize="three">
              <Address
                address={address}
                fontWeight="normal"
                showCountry={false}
                showPhone={false}
              />
            </BodyCopy>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(CreditCardModalInfo, CreditCardStyles);
export { CreditCardModalInfo as CreditCardModalInfoVanilla };
