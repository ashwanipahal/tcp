import React, { Fragment } from 'react';
import { ModuleD } from '@tcp/web/src/components/common/molecules/moduleD/ModuleD';
// import Row from '@tcp/core/src/components/common/atoms/Row';
// import Col from '@tcp/core/src/components/common/atoms/Col';
// import Grid from '@tcp/core/src/components/common/molecules/Grid';
import { PropTypes } from 'prop-types';
import { NavBar } from '../molecules';

// colCount is the number of columns the component needs to cover in each of the viewport

const moduleDAssets = [
  {
    url: 'https://via.placeholder.com/330',
    text: 'mom & me tees 1',
    link: 'http://www.google.com',
  },
  {
    url: 'https://via.placeholder.com/330',
    text: 'mom & me tees 2',
    link: 'http://www.google.com',
  },
  {
    url: 'https://via.placeholder.com/330',
    text: 'mom & me tees 3',
    link: 'http://www.google.com',
  },
  {
    url: 'https://via.placeholder.com/330',
    text: 'mom & me tees 4',
    link: 'http://www.google.com',
  },
];

const HomePageView = ({ links }) => (
  <Fragment>
    <NavBar links={links} />
    <ModuleD assets={moduleDAssets} />
  </Fragment>
);

HomePageView.propTypes = {
  links: PropTypes.string.isRequired,
};
export default HomePageView;
