import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../common/atoms/BodyCopy';
import { getIconPath } from '../../../../../utils';
import { Image } from '../../../../common/atoms';
import withStyles from '../../../../common/hoc/withStyles';
import styles from '../styles/DeleteCardModal.style';
import Row from '../../../../common/atoms/Row';
import Col from '../../../../common/atoms/Col';

class GiftCardModalInfo extends React.Component {
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
          {data.subHeading}
        </BodyCopy>

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
                className="deleteCardModal__img"
                src={getIconPath('gift-card-small')}
                onClick={this.pause}
                data-locator="deletegcmodalicon"
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
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

GiftCardModalInfo.propTypes = {
  getAccNumbr: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default withStyles(GiftCardModalInfo, styles);
export { GiftCardModalInfo as GiftCardModalInfoVanilla };
