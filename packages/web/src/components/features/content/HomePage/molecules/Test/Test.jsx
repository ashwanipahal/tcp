import React from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

// import { Heading, BodyCopy } from '@tcp/core/styles/themes/TCP/typotheme';
import Heading from '@tcp/core/src/components/common/atoms/Heading';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';

/* TODO: this file is getting cleaned-up when committing and,
eslint failed because of prop-type validation */

function getHeadingColm(props) {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map(i => (
        <Heading {...props} kind={`h${i}`}>{`H${i}`}</Heading>
      ))}
    </>
  );
}

function getBodyColm({ kind, ...others }) {
  return (
    <>
      <BodyCopy {...others} size={1} kind={kind}>
        {`${kind.toUpperCase()} - 10`}
      </BodyCopy>
      <BodyCopy {...others} size={2} kind={kind}>
        {`${kind.toUpperCase()} - 12`}
      </BodyCopy>
      <BodyCopy {...others} size={3} kind={kind}>
        {`${kind.toUpperCase()} - 14`}
      </BodyCopy>
      <BodyCopy {...others} size={4} kind={kind}>
        {`${kind.toUpperCase()} - 16`}
      </BodyCopy>
      <BodyCopy {...others} size={5} kind={kind}>
        {`${kind.toUpperCase()} - 18`}
      </BodyCopy>
      <BodyCopy {...others} size={6} kind={kind}>
        {`${kind.toUpperCase()} - 22`}
      </BodyCopy>
      <BodyCopy {...others} size={7} kind={kind}>
        {`${kind.toUpperCase()} - 24`}
      </BodyCopy>
      <BodyCopy {...others} size={8} kind={kind}>
        {`${kind.toUpperCase()} - 28`}
      </BodyCopy>
      <BodyCopy {...others} size={9} kind={kind}>
        {`${kind.toUpperCase()} - 32`}
      </BodyCopy>
      <BodyCopy {...others} size={10} kind={kind}>
        {`${kind.toUpperCase()} - 36`}
      </BodyCopy>
      <BodyCopy {...others} size={11} kind={kind}>
        {`${kind.toUpperCase()} - 42`}
      </BodyCopy>
      <BodyCopy {...others} size={12} kind={kind}>
        {`${kind.toUpperCase()} - 48`}
      </BodyCopy>
    </>
  );
}

getBodyColm.propTypes = {
  kind: PropTypes.string.isRequired,
};

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

      <Row>
        <Col colSize={2}>{getBodyColm({ kind: 'p1' })}</Col>
        <Col colSize={2}>{getBodyColm({ kind: 'p1', align: 'center' })}</Col>

        <Col colSize={2}>{getBodyColm({ kind: 'p1', weight: 'semibold' })}</Col>
        <Col colSize={2}>{getBodyColm({ kind: 'p1', weight: 'semibold', align: 'center' })}</Col>
      </Row>

      <Row>
        <Col colSize={2}>{getBodyColm({ kind: 'p1', color: 'darkgray' })}</Col>
        <Col colSize={2}>{getBodyColm({ kind: 'p1', color: 'gray' })}</Col>
        <Col colSize={2}>{getBodyColm({ kind: 'p1', color: 'lightgray' })}</Col>
        <BlackCol colSize={2}>
          {getBodyColm({ kind: 'p1', inverted: true, weight: 'bold' })}
        </BlackCol>
      </Row>

      <Row>
        <Col colSize={2}>{getBodyColm({ kind: 'p2' })}</Col>
        <Col colSize={2}>{getBodyColm({ kind: 'p2', align: 'center' })}</Col>

        <Col colSize={2}>{getBodyColm({ kind: 'p2', weight: 'semibold' })}</Col>
        <Col colSize={2}>{getBodyColm({ kind: 'p2', weight: 'semibold', align: 'center' })}</Col>
      </Row>

      <Row>
        <Col colSize={2}>{getBodyColm({ kind: 'p2', color: 'darkgray' })}</Col>
        <Col colSize={2}>{getBodyColm({ kind: 'p2', color: 'gray' })}</Col>
        <Col colSize={2}>{getBodyColm({ kind: 'p2', color: 'lightgray' })}</Col>
        <BlackCol colSize={2}>
          {getBodyColm({ kind: 'p2', inverted: true, weight: 'bold' })}
        </BlackCol>
      </Row>
    </div>
  );
};
export default Test;
