// any molecule will come here
import React from 'react';
import { PropTypes } from 'prop-types';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import { Anchor, Button, Col, Row, Image } from '@tcp/core/src/components/common/atoms';
import { Heading } from '@tcp/core/styles/themes/TCP/typotheme';
import { getLocator } from '@tcp/web/src/utils';
import style from './ModuleD.style';
import withStyles from '../../hoc/withStyles';
import errorBoundary from '../../hoc/errorBoundary';

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

const ModuleD = props => {
  const {
    className,
    composites: { headerText, smallCompImage, singleCTAButton },
  } = props;
  const {
    textLines: [{ text: headingText }],
    link: { target, title, url },
  } = headerText;
  let colSize;

  if (smallCompImage && smallCompImage.length === 2) {
    colSize = colSize2Elements;
  } else if (smallCompImage && smallCompImage.length === 4) {
    colSize = colSize4Elements;
  } else {
    colSize = colSize6Elements;
  }

  return (
    <Grid className={className}>
      <Anchor className="moduleD_textlink" to={url} target={target}>
        <Heading
          className="moduleD_header"
          HeadingLarge="two"
          HeadingcolorSm="primary"
          tag="h2"
          data-locator={getLocator('moduleD_headerlink')}
          title={title}
        >
          {headingText}
        </Heading>
      </Anchor>
      <Row centered>
        {smallCompImage &&
          smallCompImage.map((item, index) => {
            return (
              item.link && (
                <Col key={item.title} colSize={colSize} ignoreGutter={ignoreGutter[index]}>
                  <div className="moduleD__image-container">
                    <Anchor
                      className="moduleD_textlink"
                      to={item.link.url}
                      aria-label={item.link.title}
                      target={item.link.target}
                    >
                      <Image
                        data-locator={getLocator('moduleD_image')}
                        src={item.image.url}
                        alt={item.image.alt}
                        className="moduleD_image"
                      />
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
              )
            );
          })}
      </Row>
      {singleCTAButton && (
        <Row centered>
          <Anchor href={singleCTAButton.url}>
            <Button
              buttonVariation="variable-width"
              className="moduleD_button"
              title={singleCTAButton.title}
              data-locator={getLocator('moduleD_button')}
            >
              {singleCTAButton.title}
            </Button>
          </Anchor>
        </Row>
      )}
    </Grid>
  );
};

ModuleD.propTypes = {
  className: PropTypes.string.isRequired,
  composites: PropTypes.shape({
    headerText: PropTypes.shape({}),
    smallCompImage: PropTypes.shape({}),
    singleCTAButton: PropTypes.shape({}),
  }).isRequired,
};

export default errorBoundary(withStyles(ModuleD, style));
export { ModuleD as ModuleDVanilla };
