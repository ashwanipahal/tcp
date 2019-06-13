// any molecule will come here
import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Image from '@tcp/core/src/components/common/atoms/Image';
import Button from '@tcp/core/src/components/common/atoms/Button';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';

const linkStyle = `
   font-family: ${props => props.theme.fonts.secondaryFontFamily};
   font-size: ${props => props.theme.fonts.fontSize.promo1.small};
   color: ${props => props.theme.colors.TEXT.DARKGRAY};
   margin-top: 10px;
   display: block;
   text-align: center;
 `;

const buttonStyle = `
   font-family: ${props => props.theme.fonts.secondaryFontFamily};
   font-weight: ${props => props.theme.fonts.fontWeight.black};
   text-transform: uppercase;
   font-size: ${props => props.theme.fonts.fontSize.heading.small.h6};
   border: 1px solid ${props => props.theme.colors.BUTTON.BORDER};
   color: ${props => props.theme.colors.TEXT.DARKGRAY};
   padding: 19px 80px;
   text-align: center;
   margin: 60px auto;
 `;

const containerStyle = `
   border: 1px solid ${props => props.theme.colors.BUTTON.BORDER};
`;

const titleStyle = `
  font-family: ${props => props.theme.fonts.primaryFontFamily};
  font-weight: ${props => props.theme.fonts.fontWeight.black};
  text-transform: uppercase;
  font-size: ${props => props.theme.fonts.fontSize.heading.small.h1};
  text-align: center;
`;

const imageStyle = `
  width: 100%;
`;

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

const ignoreGutter = [{}, { small: true }, {}, { small: true }, {}, { small: true }];

const ModuleD = ({ data }) => {
  const mod = data.data.moduleD;
  let assets = [];
  let { title, text, titleUrl, button } = '';

  if (mod.value) {
    ({ title, text, titleUrl } = mod.value[0].value.value);

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
    <Fragment>
      <Grid inheritedStyles={containerStyle}>
        <Anchor className="moduleD_textlink" to={titleUrl} inheritedStyles={titleStyle}>
          <h2 data-locator="moduleD_headerlink" title={title}>
            {text}
          </h2>
        </Anchor>
        <Row centered>
          {assets &&
            assets.map((item, index) => (
              <Col colSize={colSize} ignoreGutter={ignoreGutter[index]}>
                <div>
                  <Anchor className="moduleD_textlink" href="{item.value.url}">
                    <Image
                      src={item.value.image.src}
                      alt={item.value.image.alt}
                      className="moduleD_image"
                      inheritedStyles={imageStyle}
                    />
                  </Anchor>
                </div>
                <Anchor
                  withCaret
                  centered
                  className="moduleD_textlink"
                  href="{item.value.url}"
                  inheritedStyles={linkStyle}
                >
                  {item.value.text}
                </Anchor>
              </Col>
            ))}
        </Row>

        <Row centered>
          <Anchor href={button.url}>
            <Button
              buttonVariation="variable-width"
              className="moduleD_button"
              title={button.title}
              inheritedStyles={buttonStyle}
            >
              {button.text}
            </Button>
          </Anchor>
        </Row>
      </Grid>
    </Fragment>
  );
};

ModuleD.propTypes = {
  data: PropTypes.string,
};

ModuleD.defaultProps = {
  data: {},
};

export default ModuleD;
