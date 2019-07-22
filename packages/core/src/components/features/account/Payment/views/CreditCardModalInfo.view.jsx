import React from 'react';
import BodyCopy from '../../../../common/atoms/BodyCopy';
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
  creditCardHeading: string,
  className: string,
};

const CreditCardModalInfo = ({
  TotalExp,
  getAccNumbr,
  data,
  address,
  creditCardHeading,
  className,
}: Props) => {
  return (
    <div className={className}>
      <Row fullBleed className="elem-mb-LRG elem-mt-MED">
        <Col
          colSize={{
            small: 6,
            large: 12,
            medium: 10,
          }}
        >
          <BodyCopy fontSize="fs18" fontFamily="secondary" fontWeight="extrabold">
            {creditCardHeading}
          </BodyCopy>
        </Col>
      </Row>

      <Row fullBleed className="elem-mt-XS">
        <Col
          colSize={{
            small: 2,
            large: 3,
            medium: 5,
          }}
          offsetLeft={{
            medium: 3,
          }}
        >
          <BodyCopy>
            <Image src={getIconPath(CardIconMapping[data.description.ccBrand])} />
          </BodyCopy>
        </Col>
        <Col
          colSize={{
            small: 4,
            large: 9,
            medium: 8,
          }}
        >
          <Row fullBleed>
            <Col
              colSize={{
                small: 6,
                large: 6,
                medium: 6,
              }}
              offsetLeft={{
                medium: 2,
              }}
            >
              <BodyCopy fontFamily="secondary" fontSize="fs14" fontWeight="extrabold">
                {data.cardText.cardEnd}
                {getAccNumbr}
              </BodyCopy>
            </Col>
            <Col
              colSize={{
                small: 6,
                large: 6,
                medium: 6,
              }}
              offsetLeft={{
                medium: 2,
              }}
            >
              <BodyCopy fontFamily="secondary" fontSize="fs14" fontWeight="regular">
                {data.cardText.expire}
                {TotalExp}
              </BodyCopy>
            </Col>
          </Row>

          <Row fullBleed className="elem-mb-MED elem-mt-MED">
            <Col
              colSize={{
                small: 6,
                large: 12,
                medium: 6,
              }}
              offsetLeft={{
                medium: 2,
              }}
            >
              <BodyCopy fontSize="fs14">
                <Address
                  address={address}
                  fontWeight="regular"
                  showCountry={false}
                  showPhone={false}
                />
              </BodyCopy>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CreditCardModalInfo;
