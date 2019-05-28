import React, { Fragment } from 'react';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import { NavBar, Test } from '../molecules';

const HomePageView = ({ links }) => (
  <Fragment>
    <NavBar links={links} />
    <Test className="test" />
    <Grid className="abcd">
      <Row className="abcdRow">
        <Col className="abcdCol" xs={6} md={3} lg={12}>
          Hello, world!
        </Col>
      </Row>
    </Grid>
  </Fragment>
);

export default HomePageView;
