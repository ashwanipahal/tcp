import React from 'react';
import DynamicComponent from '../../src/components/common/atoms/DynamicTag/DynamicComponent';

const HeadingStyle = props => <DynamicComponent {...props} />;
const BodyStyle = props => <DynamicComponent {...props} />;
export { HeadingStyle, BodyStyle };
