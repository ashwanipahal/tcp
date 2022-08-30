import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

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
  className: PropTypes.string,
};

ModuleFormWrapper.defaultProps = {
  className: '',
};

export default ModuleFormWrapper;
