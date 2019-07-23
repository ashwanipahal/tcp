// @flow
import React from 'react';
import { Anchor, BodyCopy, Col, DamImage, Row } from '../../../atoms';
import { getLocator } from '../../../../../utils';
import config from '../config';

type Props = {
  tileData: Object,
  index: number,
};

// const getUrlWithCrop = url => {
//   return url.replace('upload/', `upload/c_fill,g_center,h_260,w_210/`);
// };

const ModuleLTile = ({ tileData: { image, link, styled }, index }: Props) => {
  return (
    <BodyCopy component="div" data-locator={`${getLocator('module_L_content_tiles')}_${index + 1}`}>
      <Row>
        <Col colSize={{ small: 6, medium: 8, large: 12 }} className="moduleL__tile">
          <DamImage
            imgData={{
              alt: image.alt,
              url: image.url,
            }}
            imgConfigs={config.IMG_DATA.crops}
            className="moduleL__tile-image"
            data-locator={`${getLocator('module_L_composite_image')}_${index + 1}`}
          />
          <div className="moduleL__tile-text">
            <BodyCopy
              component="div"
              className="moduleL__tile-title"
              fontFamily={['primary']}
              fontSize={['fs32']}
              fontWeight={['regular']}
              letterSpacing={['ls222']}
              textAlign="left"
              color="text.primary"
              data-locator={`${getLocator('module_L_header_text')}_${index + 1}`}
            >
              {styled.text}
            </BodyCopy>
            <Anchor
              withCaret
              className="moduleL__tile-link"
              data-locator={`${getLocator('module_L_text_link')}_${index + 1}`}
            >
              {link.text}
            </Anchor>
          </div>
        </Col>
      </Row>
    </BodyCopy>
  );
};

export default ModuleLTile;
