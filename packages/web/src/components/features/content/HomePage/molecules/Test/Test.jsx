import React from 'react';
import styled from 'styled-components';

import Heading from '@tcp/core/src/components/common/atoms/Heading';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';

function getHeadingColm(props) {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map(i => (
        <Heading {...props} key={i} variant={`h${i}`}>{`H${i}`}</Heading>
      ))}
    </>
  );
}

function getBodyColm(props, bodyExampleType = 'P1') {
  return (
    <>
      <BodyCopy {...props} fontSize={2}>
        {`${bodyExampleType} - 48`}
      </BodyCopy>
      <BodyCopy {...props} fontSize={3}>
        {`${bodyExampleType} - 42`}
      </BodyCopy>
      <BodyCopy {...props} fontSize={5}>
        {`${bodyExampleType} - 36`}
      </BodyCopy>
      <BodyCopy {...props} fontSize={6}>
        {`${bodyExampleType} - 32`}
      </BodyCopy>
      <BodyCopy {...props} fontSize={7}>
        {`${bodyExampleType} - 28`}
      </BodyCopy>
      <BodyCopy {...props} fontSize={8}>
        {`${bodyExampleType} - 24`}
      </BodyCopy>
      <BodyCopy {...props} fontSize={9}>
        {`${bodyExampleType} - 22`}
      </BodyCopy>
      <BodyCopy {...props} fontSize={11}>
        {`${bodyExampleType} - 18`}
      </BodyCopy>
      <BodyCopy {...props} fontSize={12}>
        {`${bodyExampleType} - 16`}
      </BodyCopy>
      <BodyCopy {...props} fontSize={13}>
        {`${bodyExampleType} - 14`}
      </BodyCopy>
      <BodyCopy {...props} fontSize={15}>
        {`${bodyExampleType} - 12`}
      </BodyCopy>
      <BodyCopy {...props} fontSize={16}>
        {`${bodyExampleType} - 10`}
      </BodyCopy>
    </>
  );
}

const BlackCol = styled(Col)`
  background-color: black;
`;

const Test = () => {
  const secondaryTextColor = 'text.secondary';
  const disabledTextColor = 'text.disabled';
  const hintTextColor = 'text.hint';
  return (
    <div>
      <Row>
        <Col colSize={2}>{getHeadingColm({})}</Col>
        <Col colSize={2}>{getHeadingColm({ textAlign: 'center' })}</Col>

        <Col colSize={2}>{getHeadingColm({ color: secondaryTextColor })}</Col>
        <Col colSize={2}>{getHeadingColm({ color: secondaryTextColor, textAlign: 'center' })}</Col>

        <Col colSize={2}>{getHeadingColm({ color: hintTextColor })}</Col>
        <Col colSize={2}>{getHeadingColm({ color: hintTextColor, textAlign: 'center' })}</Col>

        <Col colSize={6}>{getHeadingColm({ color: disabledTextColor })}</Col>
        <Col colSize={6}>{getHeadingColm({ color: disabledTextColor, textAlign: 'center' })}</Col>
      </Row>
      <Row>
        <Col colSize={2}>{getHeadingColm({ color: 'primary.main' })}</Col>
        <Col colSize={2}>{getHeadingColm({ color: 'primary.main', textAlign: 'center' })}</Col>

        <Col colSize={2}>{getHeadingColm({ color: 'primary.dark' })}</Col>
        <Col colSize={2}>{getHeadingColm({ color: 'primary.dark', textAlign: 'center' })}</Col>

        <Col colSize={2}>{getHeadingColm({ color: 'secondary.main' })}</Col>
        <Col colSize={2}>{getHeadingColm({ color: 'secondary.main', textAlign: 'center' })}</Col>

        <Col colSize={2}>{getHeadingColm({ color: 'secondary.light' })}</Col>
        <Col colSize={2}>{getHeadingColm({ color: 'secondary.light', textAlign: 'center' })}</Col>
      </Row>
      <Row>
        <Col colSize={2}>{getHeadingColm({ color: 'green.300' })}</Col>
        <Col colSize={2}>{getHeadingColm({ color: 'green.300', textAlign: 'center' })}</Col>

        <BlackCol colSize={2}>{getHeadingColm({ color: 'white' })}</BlackCol>
        <BlackCol colSize={2}>{getHeadingColm({ textAlign: 'center', color: 'white' })}</BlackCol>
      </Row>
      <Row>
        <h3>Heading with div tag</h3>
      </Row>
      <Row>
        <Col colSize={2}>{getHeadingColm({ color: 'green.300', component: 'div' })}</Col>
        <Col colSize={2}>
          {getHeadingColm({ textAlign: 'center', color: 'green.300', component: 'div' })}
        </Col>
      </Row>

      <Row>
        <Col colSize={2}>{getBodyColm({})}</Col>
        <Col colSize={2}>{getBodyColm({ textAlign: 'center' })}</Col>
        {/* TODO: Need extra bold font file */}
        <Col colSize={2}>{getBodyColm({ fontWeight: 'semibold' })}</Col>
        <Col colSize={2}>{getBodyColm({ fontWeight: 'semibold', textAlign: 'center' })}</Col>
      </Row>

      <Row>
        <Col colSize={2}>{getBodyColm({ color: secondaryTextColor })}</Col>
        <Col colSize={2}>{getBodyColm({ color: hintTextColor })}</Col>
        <Col colSize={2}>{getBodyColm({ color: disabledTextColor })}</Col>
        <BlackCol colSize={2}>{getBodyColm({ color: 'white', fontWeight: 'bold' })}</BlackCol>
      </Row>

      <Row>
        <Col colSize={2}>{getBodyColm({ fontFamily: 'secondary' }, 'P2')}</Col>
        <Col colSize={2}>{getBodyColm({ fontFamily: 'secondary', textAlign: 'center' }, 'P2')}</Col>

        <Col colSize={2}>
          {getBodyColm({ fontFamily: 'secondary', fontWeight: 'semibold' }, 'P2')}
        </Col>
        <Col colSize={2}>
          {getBodyColm(
            { fontFamily: 'secondary', fontWeight: 'semibold', textAlign: 'center' },
            'P2'
          )}
        </Col>
      </Row>

      <Row>
        <Col colSize={2}>
          {getBodyColm({ fontFamily: 'secondary', color: 'text.secondary' }, 'P2')}
        </Col>
        <Col colSize={2}>{getBodyColm({ fontFamily: 'secondary', color: 'text.hint' }, 'P2')}</Col>
        <Col colSize={2}>
          {getBodyColm({ fontFamily: 'secondary', color: 'text.disabled' }, 'P2')}
        </Col>
        <BlackCol colSize={2}>
          {getBodyColm(
            {
              fontFamily: 'secondary',
              color: 'white',
              fontWeight: 'bold',
            },
            'P2'
          )}
        </BlackCol>
      </Row>

      <Row>Body text with another tag (div)</Row>
      <Row>
        <Col colSize={2}>
          {getBodyColm({ component: 'div', fontFamily: 'secondary', textAlign: 'center' }, 'P2')}
        </Col>
      </Row>
    </div>
  );
};
export default Test;
