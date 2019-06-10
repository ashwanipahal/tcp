// any molecule will come here
import React, { Fragment } from 'react';
// import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Button from '@tcp/core/src/components/common/atoms/Button';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';

// const StyledLink = styled.a`
//   font-family: Nunito;
//   font-size: 15px;
//   color: #575757;
//   margin-top: 10px;
//   display: block;
//   text-align: center;
// `;
//
// const StyledButton = `
//   font-family: 'Nunito';
//   font-weight: 600;
//   text-transform: uppercase;
//   font-size: 16px;
//   border: 1px solid #979797;
//   color: #575757;
//   padding: 19px 80px;
//   text-align: center;
//   margin: 60px auto;
// `;

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

const ModuleD = ({ assets }) => {
  const colSize =
    assets.length === 2
      ? colSize2Elements
      : assets.length === 4
      ? colSize4Elements
      : colSize6Elements;

  return (
    <Fragment>
      <Grid>
        <h2 data-locator="moduleD_headerlink">Mini me shop</h2>
        <Row>
          {assets &&
            assets.map((item, index) => (
              <Col colSize={colSize} isNotInlineBlock ignoreGutter={ignoreGutter[index]}>
                <img src={item.url} alt={item.text} className="moduleD_image" />
                <Anchor className="moduleD_textlink" href="{item.link}">
                  {item.text}
                </Anchor>
              </Col>
            ))}
        </Row>

        <Row centered>
          <Button buttonVariation="variable-width" className="moduleD_button">
            Shop all
          </Button>
        </Row>
      </Grid>
    </Fragment>
  );
};
ModuleD.propTypes = {
  assets: PropTypes.string.isRequired,
};

export default ModuleD;
