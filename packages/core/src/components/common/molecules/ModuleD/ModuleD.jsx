// any molecule will come here
import React from 'react';
import { PropTypes } from 'prop-types';
import { Anchor, Button, Col, Row, Image } from '../../atoms';
import { Heading } from '../../../../../styles/themes/TCP/typotheme';
import Grid from '../Grid';
import style from './ModuleD.style';
import withStyles from '../../hoc/withStyles';

const colSize2Elements = {
  small: 3,
  medium: 4,
  large: 6,
  xlarge: 6,
};

const colSize4Elements = {
  small: 3,
  medium: 3,
  large: 3,
  xlarge: 3,
};

const colSize6Elements = {
  small: 3,
  medium: 3,
  large: 2,
  xlarge: 2,
};

const ignoreGutter = [
  {},
  { small: true, medium: true },
  {},
  { small: true, medium: true },
  {},
  { small: true, medium: true },
];

const ModuleD = ({ className, data }) => {
  const {
    composites: { headerText, smallCompImage, singleCTAButton },
  } = data.data.moduleD;
  let colSize;
  let assets = [];
  let { headingText, target, url } = '';

  if (headerText) {
    headingText = headerText.textLines.text;
    ({ target, url } = headerText.link);
  }

  assets = smallCompImage ? smallCompImage.items : '';

  if (assets.length === 2) {
    colSize = colSize2Elements;
  } else if (assets.length === 4) {
    colSize = colSize4Elements;
  } else {
    colSize = colSize6Elements;
  }

  return (
    <Grid className={className}>
      <Anchor className="moduleD_textlink" to={url} target={target}>
        <Heading
          HeadingLarge="two"
          HeadingcolorSm="primary"
          tag="h2"
          data-locator="moduleD_headerlink"
        >
          {headingText}
        </Heading>
      </Anchor>
      <Row centered>
        {assets &&
          assets.map((item, index) => (
            <Col key={item.title} colSize={colSize} ignoreGutter={ignoreGutter[index]}>
              <div className="moduleD__image-container">
                <Anchor
                  className="moduleD_textlink"
                  to={item.link.url}
                  aria-label={item.link.title}
                  target={item.link.target}
                >
                  <Image src={item.image.url} alt={item.image.alt} className="moduleD_image" />
                </Anchor>
              </div>
              <Anchor
                withCaret
                centered
                className="moduleD_textlink"
                to={item.link.url}
                target={item.link.target}
              >
                {item.link.title}
              </Anchor>
            </Col>
          ))}
      </Row>

      <Row centered>
        <Anchor href={singleCTAButton.url}>
          <Button
            buttonVariation="variable-width"
            className="moduleD_button"
            title={singleCTAButton.title}
          >
            {singleCTAButton.title}
          </Button>
        </Anchor>
      </Row>
    </Grid>
  );
};

ModuleD.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};

export default withStyles(ModuleD, style);
export { ModuleD as ModuleDVanilla };
