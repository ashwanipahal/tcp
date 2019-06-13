import React from 'react';
import DynamicComponent from './DynamicComponent';

const HeadingStyle = props => <DynamicComponent {...props} />;
const BodyStyle = props => <DynamicComponent {...props} />;
export { HeadingStyle, BodyStyle };
