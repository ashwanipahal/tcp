// any molecule will come here
import React, { Fragment } from 'react';
// import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Image from '@tcp/core/src/components/common/atoms/Image';
import Button from '@tcp/core/src/components/common/atoms/Button';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';

const linkStyle = `
   font-family: Nunito;
   font-size: 15px;
   color: #575757;
   margin-top: 10px;
   display: block;
   text-align: center;
 `;

const buttonStyle = `
   font-family: 'Nunito';
   font-weight: 600;
   text-transform: uppercase;
   font-size: 16px;
   border: 1px solid #979797;
   color: #575757;
   padding: 19px 80px;
   text-align: center;
   margin: 60px auto;
 `;

const containerStyle = `
   border: 1px solid #979797;
`;

const titleStyle = `
  font-family: 'Montserrat';
  font-weight: 900;
  text-transform: uppercase;
  font-size: 48px;
  text-align: center;
`;

const colSize2Elements = {
  small: 3,
  medium: 4,
  large: 6,
  xlarge: 6,
};

const colSize4Elements = {
  small: 3,
  medium: 2,
  large: 3,
  xlarge: 3,
};

const colSize6Elements = {
  small: 3,
  medium: 3,
  large: 2,
  xlarge: 2,
};

const ignoreGutter = [{}, { small: true }, {}, {}];

const ModuleD = ({ data }) => {
  const { title, text, titleUrl } = data.value[0].value.value;
  const assets = data.value[2].value;
  const button = data.value[3].value.value;
  const colSize =
    assets.length === 2
      ? colSize2Elements
      : assets.length === 4
      ? colSize4Elements
      : colSize6Elements;

  return (
    <Fragment>
      <Grid inheritedStyles={containerStyle}>
        <Anchor className="moduleD_textlink" href={titleUrl} inheritedStyles={titleStyle}>
          <h2 data-locator="moduleD_headerlink" title={title}>
            {text}
          </h2>
        </Anchor>
        <Row>
          {assets &&
            assets.map((item, index) => (
              <Col colSize={colSize} isNotInlineBlock ignoreGutter={ignoreGutter[index]}>
                <div>
                  <Anchor className="moduleD_textlink" href="{item.value.url}">
                    <Image
                      src={item.value.image.src}
                      alt={item.value.image.alt}
                      className="moduleD_image"
                    />
                  </Anchor>
                </div>
                <Anchor
                  className="moduleD_textlink"
                  href="{item.value.url}"
                  inheritedStyles={linkStyle}
                >
                  <Row centered>{item.value.text}</Row>
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
