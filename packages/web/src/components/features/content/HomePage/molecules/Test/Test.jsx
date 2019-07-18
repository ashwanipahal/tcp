import React from 'react';
import styled from 'styled-components';

import DamImage from '@tcp/core/src/components/common/atoms/DamImage';
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
      <Heading {...props} variant="nav">
        NAV
      </Heading>
      <Heading {...props} variant="listMenu">
        List-menu
      </Heading>
    </>
  );
}

function getBodyColm(props, bodyExampleType = 'P1') {
  return (
    <>
      <BodyCopy {...props} fontSize="fs10">
        {`${bodyExampleType} - 10`}
      </BodyCopy>
      <BodyCopy {...props} fontSize="fs12">
        {`${bodyExampleType} - 12`}
      </BodyCopy>
      <BodyCopy {...props} fontSize="fs14">
        {`${bodyExampleType} - 14`}
      </BodyCopy>
      <BodyCopy {...props} fontSize="fs16">
        {`${bodyExampleType} - 16`}
      </BodyCopy>
      <BodyCopy {...props} fontSize="fs18">
        {`${bodyExampleType} - 18`}
      </BodyCopy>
      <BodyCopy {...props} fontSize="fs22">
        {`${bodyExampleType} - 22`}
      </BodyCopy>
      <BodyCopy {...props} fontSize="fs24">
        {`${bodyExampleType} - 24`}
      </BodyCopy>
      <BodyCopy {...props} fontSize="fs28">
        {`${bodyExampleType} - 28`}
      </BodyCopy>
      <BodyCopy {...props} fontSize="fs32">
        {`${bodyExampleType} - 32`}
      </BodyCopy>
      <BodyCopy {...props} fontSize="fs36">
        {`${bodyExampleType} - 36`}
      </BodyCopy>
      <BodyCopy {...props} fontSize="fs42">
        {`${bodyExampleType} - 42`}
      </BodyCopy>
      <BodyCopy {...props} fontSize="fs48">
        {`${bodyExampleType} - 48`}
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
  const colSizeConfig = { small: 2, medium: 2, large: 2 };
  return (
    <div>
      <div>
        <DamImage
          alt="Dancing Boy"
          imgPath="v1561401513/ecom/assets/content/tcp/us/home/transform/home_modh_sample_qtylh0.png"
        />
      </div>
      <div>
        <Heading variant="h2">Dam Image with image configs</Heading>
        <DamImage
          alt="Dancing Boy"
          imgConfigs={[
            'g_face:center,q_auto:best,w_768',
            'c_fill,g_face:center,q_auto:best,w_1024',
            'c_crop,g_face:auto,q_auto:best,w_1440',
            'c_crop,g_face:auto,q_auto:best,w_1600',
          ]}
          imgPath="v1561401513/ecom/assets/content/tcp/us/home/transform/home_modh_sample_qtylh0.png"
        />
      </div>
      <Row>
        <BodyCopy
          component="p"
          fontFamily={['primary', 'secondary']}
          fontSize={['fs36', 'fs42', 'fs48']}
          lineHeight="normal"
          letterSpacing={['ls167', 'ls257']}
          textAlign={['left', 'center']}
          color={[disabledTextColor, 'text.primary']}
        >
          This is an example of a responsive BodyCopy text;
        </BodyCopy>
      </Row>
      <Row>
        <Col colSize={colSizeConfig}>{getHeadingColm({})}</Col>
        <Col colSize={colSizeConfig}>{getHeadingColm({ textAlign: 'center' })}</Col>

        <Col colSize={colSizeConfig}>{getHeadingColm({ color: secondaryTextColor })}</Col>
        <Col colSize={colSizeConfig}>
          {getHeadingColm({ color: secondaryTextColor, textAlign: 'center' })}
        </Col>

        <Col colSize={colSizeConfig}>{getHeadingColm({ color: hintTextColor })}</Col>
        <Col colSize={colSizeConfig}>
          {getHeadingColm({ color: hintTextColor, textAlign: 'center' })}
        </Col>

        <Col colSize={6}>{getHeadingColm({ color: disabledTextColor })}</Col>
        <Col colSize={6}>{getHeadingColm({ color: disabledTextColor, textAlign: 'center' })}</Col>
      </Row>
      <Row>
        <Col colSize={colSizeConfig}>{getHeadingColm({ color: 'primary.main' })}</Col>
        <Col colSize={colSizeConfig}>
          {getHeadingColm({ color: 'primary.main', textAlign: 'center' })}
        </Col>

        <Col colSize={colSizeConfig}>{getHeadingColm({ color: 'primary.dark' })}</Col>
        <Col colSize={colSizeConfig}>
          {getHeadingColm({ color: 'primary.dark', textAlign: 'center' })}
        </Col>

        <Col colSize={colSizeConfig}>{getHeadingColm({ color: 'secondary.main' })}</Col>
        <Col colSize={colSizeConfig}>
          {getHeadingColm({ color: 'secondary.main', textAlign: 'center' })}
        </Col>

        <Col colSize={colSizeConfig}>{getHeadingColm({ color: 'secondary.light' })}</Col>
        <Col colSize={colSizeConfig}>
          {getHeadingColm({ color: 'secondary.light', textAlign: 'center' })}
        </Col>
      </Row>
      <Row>
        <Col colSize={colSizeConfig}>{getHeadingColm({ color: 'green.300' })}</Col>
        <Col colSize={colSizeConfig}>
          {getHeadingColm({ color: 'green.300', textAlign: 'center' })}
        </Col>

        <BlackCol colSize={colSizeConfig}>{getHeadingColm({ color: 'white' })}</BlackCol>
        <BlackCol colSize={colSizeConfig}>
          {getHeadingColm({ textAlign: 'center', color: 'white' })}
        </BlackCol>
      </Row>
      <Row>
        <h3>Heading with div tag</h3>
      </Row>
      <Row>
        <Col colSize={colSizeConfig}>
          {getHeadingColm({ color: 'green.300', component: 'div' })}
        </Col>
        <Col colSize={colSizeConfig}>
          {getHeadingColm({ textAlign: 'center', color: 'green.300', component: 'div' })}
        </Col>
      </Row>

      <Row>
        <Col colSize={colSizeConfig}>{getBodyColm({})}</Col>
        <Col colSize={colSizeConfig}>{getBodyColm({ textAlign: 'center' })}</Col>
        {/* TODO: Need extra bold font file */}
        <Col colSize={colSizeConfig}>{getBodyColm({ fontWeight: 'semibold' })}</Col>
        <Col colSize={colSizeConfig}>
          {getBodyColm({ fontWeight: 'black', textAlign: 'center' })}
        </Col>
      </Row>

      <Row>
        <Col colSize={colSizeConfig}>{getBodyColm({ color: secondaryTextColor })}</Col>
        <Col colSize={colSizeConfig}>{getBodyColm({ color: hintTextColor })}</Col>
        <Col colSize={colSizeConfig}>{getBodyColm({ color: disabledTextColor })}</Col>
        <BlackCol colSize={colSizeConfig}>
          {getBodyColm({ color: 'white', fontWeight: 'black' })}
        </BlackCol>
      </Row>

      <Row>
        <Col colSize={colSizeConfig}>{getBodyColm({ fontFamily: 'secondary' }, 'P2')}</Col>
        <Col colSize={colSizeConfig}>
          {getBodyColm({ fontFamily: 'secondary', textAlign: 'center' }, 'P2')}
        </Col>

        <Col colSize={colSizeConfig}>
          {getBodyColm({ fontFamily: 'secondary', fontWeight: 'semibold' }, 'P2')}
        </Col>
        <Col colSize={colSizeConfig}>
          {getBodyColm(
            { fontFamily: 'secondary', fontWeight: 'semibold', textAlign: 'center' },
            'P2'
          )}
        </Col>
      </Row>

      <Row>
        <Col colSize={colSizeConfig}>
          {getBodyColm({ fontFamily: 'secondary', color: 'text.secondary' }, 'P2')}
        </Col>
        <Col colSize={colSizeConfig}>
          {getBodyColm({ fontFamily: 'secondary', color: 'text.hint' }, 'P2')}
        </Col>
        <Col colSize={colSizeConfig}>
          {getBodyColm(
            { fontFamily: 'secondary', fontWeight: 'extrabold', color: disabledTextColor },
            'P2'
          )}
        </Col>
        <BlackCol colSize={colSizeConfig}>
          {getBodyColm(
            {
              fontFamily: 'secondary',
              color: 'white',
              fontWeight: 'black',
            },
            'P2'
          )}
        </BlackCol>
      </Row>

      <Row>Body text with another tag (div)</Row>
      <Row>
        <Col colSize={colSizeConfig}>
          {getBodyColm({ component: 'div', fontFamily: 'secondary', textAlign: 'center' }, 'P2')}
        </Col>
      </Row>
    </div>
  );
};
export default Test;
