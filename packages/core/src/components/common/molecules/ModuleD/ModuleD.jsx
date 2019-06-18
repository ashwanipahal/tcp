// any molecule will come here
import React from 'react';
import { PropTypes } from 'prop-types';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import { Anchor, Button, Col, Row, Image } from '@tcp/core/src/components/common/atoms';
import { Heading } from '@tcp/core/styles/themes/TCP/typotheme';
import { getLocator } from '@tcp/web/src/utils';
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
  const mod = data.data.moduleD;
  let assets = [];
  let { target, title, text, url, button } = '';

  if (mod.value) {
    ({ target, title, text, url } = mod.value[0].value.value);

    assets = mod.value[2].value; // TODO: there's a promotional banner in the CMS but not in the designs. ignoring
    button = mod.value[3].value.value;
  }

  let colSize;

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
          className="moduleD_header"
          HeadingLarge="two"
          HeadingcolorSm="primary"
          tag="h2"
          data-locator={getLocator('moduleD_headerlink')}
          title={title}
        >
          {text}
        </Heading>
      </Anchor>
      <Row centered>
        {assets &&
          assets.map((item, index) => (
            <Col key={item.value.name} colSize={colSize} ignoreGutter={ignoreGutter[index]}>
              <div className="moduleD__image-container">
                <Anchor
                  className="moduleD_textlink"
                  to={item.value.url}
                  aria-label={item.value.text}
                  target={item.value.target}
                >
                  <Image
                    src={item.value.image.src}
                    alt={item.value.image.alt}
                    className="moduleD_image"
                    data-locator={getLocator('moduleD_image')}
                  />
                </Anchor>
              </div>
              <Anchor
                withCaret
                centered
                className="moduleD_textlink"
                data-locator={getLocator('moduleD_textlink')}
                to={item.value.url}
                target={item.value.target}
              >
                {item.value.text}
              </Anchor>
            </Col>
          ))}
      </Row>

      <Row centered>
        <Anchor href={button.url} target={button.target}>
          <Button
            buttonVariation="variable-width"
            className="moduleD_button"
            title={button.title}
            data-locator={getLocator('moduleD_button')}
          >
            {button.text}
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
