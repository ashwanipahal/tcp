import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import { getIconPath } from '../../../../../utils';
import { Image } from '../../../../common/atoms';
import Address from '../../../../common/molecules/Address';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';
import CardIconMapping from '../CardIconMapping';
import styles from '../styles/DeleteCardModal.style';
import withStyles from '../../../../common/hoc/withStyles';

const CreditCardModalInfo = ({
  TotalExp,
  getAccNumbr,
  data,
  address,
  creditCardHeading,
  className,
}) => {
  const cardType = data && data.description.ccType;
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
          <BodyCopy
            fontSize="fs18"
            fontFamily="secondary"
            fontWeight="extrabold"
            data-locator="deletecreditmodalhdrmsg"
            textAlign="center"
            className="deleteCreditCard"
          >
            {creditCardHeading}
          </BodyCopy>
        </Col>
      </Row>

      <Row fullBleed className="elem-mt-XS card-details-mobile">
        <Col
          colSize={{
            small: 2,
            large: 3,
            medium: 8,
          }}
          offsetLeft={{ large: 1 }}
        >
          <BodyCopy textAlign="center" data-locator="deletecreditmodalcardicon">
            <Image
              src={getIconPath(CardIconMapping[data.description.ccBrand])}
              className="deleteCreditModal__card__icon"
            />
          </BodyCopy>
        </Col>
        <Col
          colSize={{
            small: 4,
            large: 8,
            medium: 5,
          }}
          offsetLeft={{ medium: 3 }}
        >
          <Row fullBleed>
            <Col
              colSize={{
                small: 6,
                large: 6,
                medium: 8,
              }}
            >
              <BodyCopy
                fontFamily="secondary"
                fontSize="fs14"
                fontWeight="extrabold"
                data-locator="deletecreditmodacardendingtxt"
                textAlign="left"
                className="cardName-spacing-tablet"
              >
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
            >
              {cardType !== 'PLACE CARD' && (
                <BodyCopy
                  fontFamily="secondary"
                  fontSize="fs14"
                  fontWeight="regular"
                  data-locator="deletecreditmodalexpiresontxt"
                  textAlign="left"
                >
                  {data.cardText.expire}
                  {TotalExp}
                </BodyCopy>
              )}
            </Col>
          </Row>

          <Row fullBleed className="elem-mb-MED elem-mt-MED">
            <Col
              colSize={{
                small: 6,
                large: 12,
                medium: 6,
              }}
            >
              <BodyCopy fontSize="fs14" textAlign="left">
                <Address
                  dataLocatorPrefix="deletecreditmodal"
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

CreditCardModalInfo.propTypes = {
  TotalExp: PropTypes.shape({}).isRequired,
  getAccNumbr: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({}).isRequired,
  address: PropTypes.shape({}).isRequired,
  creditCardHeading: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
export default withStyles(CreditCardModalInfo, styles);
