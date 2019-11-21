import React from 'react';
import { storiesOf } from '@storybook/react';
import BackToTop from '../views/BackToTop';

storiesOf('BackToTop', module).add('Basic', () => (
  <div style={{ height: '200vh' }}>
    {' '}
    <BackToTop />{' '}
  </div>
));
