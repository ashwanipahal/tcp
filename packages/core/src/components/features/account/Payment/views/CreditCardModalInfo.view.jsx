import React from 'react';
import { BodyCopy } from '../../../../../../styles/themes/TCP/typotheme';
import { getIconPath } from '../../../../../utils';
import { Image } from '../../../../common/atoms';
import Address from '../../../../common/molecules/Address';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import CardIconMapping from '../CardIconMapping';

// @flow
type Props = {
  TotalExp: object,
  getAccNumbr: object,
  data: object,
  address: object,
  className: string,
};

const CreditCardModalInfo = ({ TotalExp, getAccNumbr, data, address, className }: Props) => {
  return (
    <div className={className}>
      <Row fullBleed className="elem-mb-MED">
        <Col
          colSize={{
            small: 12,
            large: 12,
            medium: 12,
          }}
        >
          <BodyCopy bodySize="five" fontWeight="bold" fontFamily="secondaryFontFamily">
            {data.heading}
          </BodyCopy>
        </Col>
      </Row>

      <Row fullBleed className="elem-mb-MED">
        <Col
          colSize={{
            small: 2,
            large: 2,
            medium: 8,
          }}
          offsetLeft={{
            medium: 2,
          }}
        >
          <BodyCopy>
            <Image src={getIconPath(CardIconMapping[data.description.ccBrand])} />
          </BodyCopy>
        </Col>
        <Col
          colSize={{
            small: 4,
            large: 10,
            medium: 8,
          }}
        >
          <Row fullBleed>
            <Col
              colSize={{
                small: 6,
                large: 6,
                medium: 8,
              }}
              offsetLeft={{
                medium: 2,
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
                large: 6,
                medium: 8,
              }}
              offsetLeft={{
                medium: 2,
              }}
            >
              <BodyCopy fontWeight="normal" fontFamily="secondaryFontFamily" tag="span">
                {data.cardText.expire}
                {TotalExp}
              </BodyCopy>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row fullBleed className="elem-mb-MED">
        <Col
          colSize={{
            small: 4,
            large: 10,
            medium: 8,
          }}
          offsetLeft={{
            small: 2,
            medium: 2,
            large: 2,
          }}
        >
          <BodyCopy bodySize="three">
            <Address address={address} fontWeight="normal" showCountry={false} showPhone={false} />
          </BodyCopy>
        </Col>
      </Row>
    </div>
  );
};

export default CreditCardModalInfo;
