import React from 'react';
import styled from 'styled-components';

// import { Heading, BodyCopy } from '@tcp/core/styles/themes/TCP/typotheme';
import Heading from '@tcp/core/src/components/common/atoms/Heading';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';

function getHeadingColm(props) {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map(i => (
        <Heading {...props} kind={`h${i}`}>{`H${i}`}</Heading>
      ))}
    </>
  );
}

const BlackCol = styled(Col)`
  background-color: black;
`;

const Test = () => {
  return (
    <div>
      <Row>
        <Col colSize={2}>{getHeadingColm({})}</Col>
        <Col colSize={2}>{getHeadingColm({ align: 'center' })}</Col>

        <Col colSize={2}>{getHeadingColm({ color: 'darkgray' })}</Col>
        <Col colSize={2}>{getHeadingColm({ color: 'darkgray', align: 'center' })}</Col>

        <Col colSize={2}>{getHeadingColm({ color: 'gray' })}</Col>
        <Col colSize={2}>{getHeadingColm({ color: 'gray', align: 'center' })}</Col>

        <Col colSize={6}>{getHeadingColm({ color: 'lightgray' })}</Col>
        <Col colSize={6}>{getHeadingColm({ color: 'lightgray', align: 'center' })}</Col>
      </Row>
      {/* 'primary', 'secondary', 'tertiary', 'red', 'darkgray', 'gray', 'lightgray', */}
      <Row>
        <Col colSize={2}>{getHeadingColm({ color: 'secondary' })}</Col>
        <Col colSize={2}>{getHeadingColm({ color: 'secondary', align: 'center' })}</Col>

        <Col colSize={2}>{getHeadingColm({ color: 'secondary', mode: 'dark' })}</Col>
        <Col colSize={2}>
          {getHeadingColm({ color: 'secondary', align: 'center', mode: 'dark' })}
        </Col>

        <Col colSize={2}>{getHeadingColm({ color: 'red' })}</Col>
        <Col colSize={2}>{getHeadingColm({ color: 'red', align: 'center' })}</Col>

        <Col colSize={2}>{getHeadingColm({ color: 'red', mode: 'dark' })}</Col>
        <Col colSize={2}>{getHeadingColm({ color: 'red', align: 'center', mode: 'dark' })}</Col>
      </Row>
      <Row>
        <Col colSize={2}>{getHeadingColm({ color: 'tertiary' })}</Col>
        <Col colSize={2}>{getHeadingColm({ color: 'tertiary', align: 'center' })}</Col>

        <BlackCol colSize={2}>{getHeadingColm({ mode: 'dark', inverted: true })}</BlackCol>
        <BlackCol colSize={2}>
          {getHeadingColm({ align: 'center', mode: 'dark', inverted: true })}
        </BlackCol>
      </Row>
      {/* <BodyCopy bodySize="five" tag="p">
        bodylarge3
      </BodyCopy> */}
    </div>
  );
};
export default Test;
