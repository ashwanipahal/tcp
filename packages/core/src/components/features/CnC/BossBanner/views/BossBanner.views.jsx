import React from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import BOSSBannerStyle from '../styles/BossBanner.style';
// @flow

type Props = {
  labels: any,
};
const getModifiedString = labels => {
  const subHeading = `<span>${labels.simplyChooseText.replace(
    '#type',
    `<b>${labels.noRushText}</b>`
  )}</span>`;
  return (
    // eslint-disable-next-line react/no-danger
    <span dangerouslySetInnerHTML={{ __html: subHeading }} />
  );
};

const BOSSBanner = ({ labels }: Props) => {
  return (
    <React.Fragment>
      <BOSSBannerStyle>
        <Row className="banner">
          <Col
            key="productDetails"
            className="pickUp"
            colSize={{ small: 6, medium: 8, large: 12 }}
            textAlign="center"
          >
            <BodyCopy
              dataLocator="addedtobag-bossbanner"
              tag="span"
              fontSize="fs12"
              fontWeight={['semibold']}
              textAlign="center"
            >
              {labels.pickUpText}
            </BodyCopy>
          </Col>
        </Row>
        <Row className="bossText">
          <Col className="pickUp" key="productDetails" colSize={{ small: 6, medium: 8, large: 12 }}>
            <BodyCopy
              tag="span"
              fontSize="fs10"
              textAlign="center"
              dataLocator="addedtobag-bossbannerdescription"
            >
              {getModifiedString(labels)}
            </BodyCopy>
          </Col>
        </Row>
      </BOSSBannerStyle>
    </React.Fragment>
  );
};

export default BOSSBanner;
