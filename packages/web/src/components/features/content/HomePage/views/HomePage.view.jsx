import React, { Fragment } from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import ModuleD from '@tcp/core/src/components/common/molecules/ModuleD';
import Button from '@tcp/core/src/components/common/atoms/Button';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import RichText from '@tcp/core/src/components/common/atoms/RichText';
import TextBox from '@tcp/core/src/components/common/atoms/TextBox';
import CarouselConfig from '@tcp/web/config';
import errorBoundary from '@tcp/core/src/components/common/hoc/errorBoundary';
import { PropTypes } from 'prop-types';
import { NavBar, SampleCarousel, Test } from '../molecules';

// colCount is the number of columns the component needs to cover in each of the viewport
const colSize = {
  small: 1,
  medium: 1,
  large: 1,
};

const colSize1 = {
  small: 1,
  medium: 1,
  large: 1,
};

const colSize2 = {
  small: 1,
  medium: 1,
  large: 1,
};

const moduleDData = {
  type: 'module',
  name: 'moduleD',
  contentID: '<uuid>',
  value: [
    {
      type: 'composite',
      name: 'header',
      value: {
        type: 'link',
        name: 'headerLink',
        value: {
          url: '/node/pdp/<uuid>',
          text: 'Mini Me Shop',
          title: 'go to mini me shop',
          target: '',
          external: 0,
          class: '',
          view: 'link',
        },
      },
    },
    {
      type: 'composite',
      subtype: 'promoBanner',
      value: {
        type: 'link',
        name: 'headerLink',
        value: {
          url: '/node/pdp/<uuid>',
          text: 'this is a <strong>promo</strong> banner',
          title: 'go to promo section',
          target: '',
          external: 0,
          class: '',
          view: 'link',
        },
      },
    },
    {
      type: 'composite',
      subtype: 'imageGallery',
      value: [
        {
          type: 'imageLink',
          name: 'imageLink1',
          value: {
            url: '/something',
            text: 'Family tees',
            target: '',
            external: 0,
            class: '',
            view: 'link',
            image: {
              src: 'https://via.placeholder.com/690',
              alt: '',
            },
          },
        },
        {
          type: 'imageLink',
          name: 'imageLink1',
          value: {
            url: '/something',
            text: 'Family tees',
            target: '',
            external: 0,
            class: '',
            view: 'link',
            image: {
              src: 'https://via.placeholder.com/690',
              alt: '',
            },
          },
        },
        {
          type: 'imageLink',
          name: 'imageLink1',
          value: {
            url: '/something',
            text: 'Family tees',
            target: '',
            external: 0,
            class: '',
            view: 'link',
            image: {
              src: 'https://via.placeholder.com/690',
              alt: '',
            },
          },
        },
        {
          type: 'imageLink',
          name: 'imageLink1',
          value: {
            url: '/something',
            text: 'Family tees',
            target: '',
            external: 0,
            class: '',
            view: 'link',
            image: {
              src: 'https://via.placeholder.com/690',
              alt: '',
            },
          },
        },
        {
          type: 'imageLink',
          name: 'imageLink1',
          value: {
            url: '/something',
            text: 'Family tees',
            target: '',
            external: 0,
            class: '',
            view: 'link',
            image: {
              src: 'https://via.placeholder.com/690',
              alt: '',
            },
          },
        },

        {
          type: 'imageLink',
          name: 'imageLink2',
          value: {
            url: '/something',
            text: 'Mom and Me tees',
            target: '',
            external: 0,
            class: '',
            view: 'link',
            image: {
              src: 'https://via.placeholder.com/690',
              alt: '',
            },
          },
        },
      ],
    },
    {
      type: 'composite',
      name: 'ctaButton',
      value: {
        type: 'link',
        name: 'cta1',
        value: {
          url: '/node/pdp',
          text: 'SHOP ALL',
          title: 'shop all categories',
          target: '',
          external: 0,
          class: '',
          view: 'button',
        },
      },
    },
  ],
};

const randomHTML = '<button class="asdfasdf" type="button">test133</button>';

const HomePageView = ({ links }) => (
  <Fragment>
    <NavBar links={links} />
    <ModuleD data={moduleDData} />
    <Test className="test" />
    <Grid>
      <Row>
        <Col colSize={colSize}>
          <Button buttonVariation="fixed-width">test</Button>
        </Col>
        <Col colSize={colSize}>
          <Button buttonVariation="variable-width">test1</Button>
        </Col>
        <Col colSize={colSize}>
          <Button buttonVariation="fixed-width" fullWidth>
            test
          </Button>
        </Col>
        <Col colSize={colSize1}>
          <Anchor to="/to" anchorVariation="primary" fontSizeVariation="large" noLink="false">
            ABCD
          </Anchor>
        </Col>
        <Col colSize={colSize2}>Random line5 takes 1 col in desktop</Col>
        <Col colSize={colSize}>
          <RichText richTextHtml={randomHTML} />
        </Col>
        <Col
          colSize={{
            small: 1,
            medium: 1,
            large: 3,
          }}
        >
          <TextBox id="abcd" name="abcdee" textIcon="icon-sms" />
        </Col>
        <Col colSize={colSize}>
          <Button buttonVariation="fixed-width">test</Button>
        </Col>
        <Col colSize={colSize}>
          <Button buttonVariation="fixed-width">test</Button>
        </Col>
        <Col colSize={colSize}>
          <Button buttonVariation="fixed-width">test</Button>
        </Col>
        <Col colSize={colSize}>
          <Button buttonVariation="fixed-width">test</Button>
        </Col>
        <Col colSize={colSize}>
          <Button buttonVariation="fixed-width">test</Button>
        </Col>
      </Row>
    </Grid>
    <SampleCarousel props={CarouselConfig.CAROUSEL_OPTIONS} />
  </Fragment>
);

HomePageView.propTypes = {
  links: PropTypes.arrayOf.isRequired,
};

export default errorBoundary(HomePageView);
