import React from 'react';
import { storiesOf } from '@storybook/react';
import MyComponent from '../views/MyComponent.native';

storiesOf('MyComponent', module).add('Basic', () => <MyComponent />);
