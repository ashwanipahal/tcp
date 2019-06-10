// any molecule will come here
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Row from '@tcp/core/src/components/common/atoms/Row';

const StyledH2 = styled.h2`
  font-family: 'Montserrat';
  font-weight: 900;
  text-transform: uppercase;
  font-size: 48px;
  text-align: center;
`;

const StyledLink = styled.a`
  font-family: Nunito;
  font-size: 15px;
  color: #575757;
  margin-top: 10px;
  display: block;
  text-align: center;
`;

const StyledButton = styled.button`
  font-family: 'Nunito';
  font-weight: 600;
  text-transform: uppercase;
  font-size: 16px;
  border: 1px solid #979797;
  color: #575757;
  padding: 19px 80px;
`;

const colSize = {
  small: 3,
  medium: 2,
  large: 3,
  xlarge: 2,
};

const ignoreGutter = [{}, { small: true }, {}, {}];

const ModuleD = ({ assets }) => (
  <Fragment>
    <Grid>
      <StyledH2 className="respmodule_headerlink">Mini me shop</StyledH2>
      <Row>
        {assets &&
          assets.map((item, index) => (
            <Col colSize={colSize} isNotInlineBlock ignoreGutter={ignoreGutter[index]}>
              <img src={item.url} alt={item.text} className="cssselector_respmodule_image" />
              <StyledLink className="cssselector_respmodule_textlink" href="{item.link}">
                {item.text}
              </StyledLink>
            </Col>
          ))}
      </Row>

      <Row>
        <StyledButton className="cssselector_respmodule_button">Shop all</StyledButton>
      </Row>
    </Grid>
  </Fragment>
);
ModuleD.propTypes = {
  assets: PropTypes.string.isRequired,
};

export default ModuleD;
