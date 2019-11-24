import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style from '../styles/ModuleFormWrapper.style';

const returnModule = mod => mod.default;
const DynamicColumns = dynamic({
  modules: () => ({
    email_signup: () =>
      import('@tcp/core/src/components/common/organisms/EmailSignupForm').then(returnModule),
    sms_signup: () =>
      import('@tcp/core/src/components/common/organisms/SmsSignupForm').then(returnModule),
  }),
  render: (properties, modules) => {
    const Module = modules[properties.formType];
    return <Module {...properties} />;
  },
});

const ModuleFormWrapper = props => {
  const { className } = props;

  return <div className={`${className} moduleFormWrapper`}>{<DynamicColumns {...props} />}</div>;
};

ModuleFormWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
};

ModuleFormWrapper.defaultProps = {
  children: null,
};

export default withStyles(ModuleFormWrapper, style);
