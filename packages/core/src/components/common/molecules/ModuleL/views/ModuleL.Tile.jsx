import React from 'react';
import PropTypes from 'prop-types';

import { Anchor, BodyCopy, Col, DamImage, Row } from '../../../atoms';
import { getLocator, configureInternalNavigationFromCMSUrl } from '../../../../../utils';
import config from '../config';

/**
 * @colSize : Column size for tile element
 */
const colSize = { ...config.COL_SIZE_TILE };

/**
 * @function ModuleLTile This function renders tiles for carousel
 * @param {tileData} tileData Accepts image, link and styled object and index
 */
const ModuleLTile = ({ tileData: { image, link, styled }, index, tileColor = {} }) => {
  const { url: ctaUrl, target, title, actualUrl } = link;

  let to = actualUrl;
  if (!actualUrl) {
    to = configureInternalNavigationFromCMSUrl(ctaUrl);
  }

  return (
    <Anchor to={to} asPath={ctaUrl} target={target} title={title}>
      <Row fullBleed>
        <Col
          colSize={colSize}
          className="moduleL__tile"
          style={{
            backgroundColor: tileColor.color,
          }}
          data-locator={`${getLocator('moduleL_tiles')}${index + 1}`}
        >
          <div className="tile-image-wrapper">
            <DamImage
              imgData={image}
              imgConfigs={config.IMG_DATA.crops}
              className="moduleL__tile-image"
              data-locator={`${getLocator('moduleL_image')}${index + 1}`}
            />
          </div>
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
              data-locator={`${getLocator('moduleL_title')}${index + 1}`}
            >
              {styled.text}
            </BodyCopy>
            <Anchor
              withCaret
              className="moduleL__tile-link"
              dataLocator={`${getLocator('moduleL_link')}${index + 1}`}
              to={to}
              asPath={ctaUrl}
              target={target}
              title={title}
            >
              {link.text}
            </Anchor>
          </div>
        </Col>
      </Row>
    </Anchor>
  );
};

ModuleLTile.propTypes = {
  tileData: PropTypes.objectOf(PropTypes.shape({})).isRequired,
  index: PropTypes.number.isRequired,
  tileColor: PropTypes.shape({}).isRequired,
};

export default ModuleLTile;
