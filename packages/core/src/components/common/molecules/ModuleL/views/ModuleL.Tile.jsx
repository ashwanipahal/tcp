// @flow
import React from 'react';
import { Anchor, BodyCopy, Col, DamImage, Row } from '../../../atoms';
import { getLocator } from '../../../../../utils';
import config from '../config';

type Props = {
  tileData: Object,
  index: number,
};

/**
 * @colSize : Column size for tile element
 */
const colSize = { ...config.COL_SIZE_TILE };

/**
 * @function ModuleLTile This function renders tiles for carousel
 * @param {tileData} tileData Accepts image, link and styled object and index
 */
const ModuleLTile = ({ tileData: { image, link, styled }, index }: Props) => {
  return (
    <Anchor data-locator={`${getLocator('moduleL_tiles')}_${index + 1}`} {...link}>
      <Row>
        <Col colSize={colSize} className="moduleL__tile">
          <DamImage
            imgData={image}
            imgConfigs={config.IMG_DATA.crops}
            className="moduleL__tile-image"
            data-locator={`${getLocator('moduleL_image')}_${index + 1}`}
          />
          <div className="moduleL__tile-text">
            <BodyCopy
              component="div"
              className="moduleL__tile-title"
              fontFamily="primary"
              fontSize={['fs20', 'fs20', 'fs32']}
              fontWeight={['regular', 'semibold']}
              letterSpacing="ls222"
              lineHeight="lh107"
              textAlign="left"
              color="text.primary"
              data-locator={`${getLocator('moduleL_title')}_${index + 1}`}
            >
              {styled.text}
            </BodyCopy>
            <Anchor
              withCaret
              className="moduleL__tile-link"
              data-locator={`${getLocator('moduleL_link')}_${index + 1}`}
              {...link}
            >
              {link.text}
            </Anchor>
          </div>
        </Col>
      </Row>
    </Anchor>
  );
};

export default ModuleLTile;
