import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import Carousel from '@tcp/core/src/components/common/molecules/Carousel';

const Row = styled.div`
  background-color: ${props => props.theme.colors.PRIMARY.BLUE};
  text-align: center;
`;
const Item = styled.h3`
  font-size: 30px;
  line-height: 100px;
  padding: 20px;
  margin: 10px;
`;

const SampleCarousel = ({ props }) => (
  <Fragment>
    <Carousel options={props}>
      <Row>
        <Item>Slide item 1</Item>
      </Row>
      <Row>
        <Item>Slide item 2</Item>
      </Row>
      <Row>
        <Item>Slide item 3</Item>
      </Row>
      <Row>
        <Item>Slide item 4</Item>
      </Row>
    </Carousel>
  </Fragment>
);

SampleCarousel.propTypes = {
  props: PropTypes.shape({
    autoplaySpeed: PropTypes.number,
    speed: PropTypes.number,
  }),
};

SampleCarousel.defaultProps = {
  props: PropTypes.shape({
    autoplaySpeed: PropTypes.number,
    speed: PropTypes.number,
  }),
};

export default SampleCarousel;
