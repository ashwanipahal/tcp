import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import FormPageHeadingComponent from '../../common/molecule/FormPageHeading';

import MyPref from '../organism/MyPreferencesSection.view';

const MyPrefrence = ({ labels, ...otherProps }) => {
  return (
    <div>
      <FormPageHeadingComponent
        heading={getLabelValue(labels, 'lbl_prefrence_heading')}
        className="margin-none"
        data-locator="mypreference-header"
      />
      <MyPref labels={labels} {...otherProps} />
    </div>
  );
};

MyPrefrence.propTypes = {
  labels: PropTypes.shape({}),
};

MyPrefrence.defaultProps = {
  labels: {},
};

export default MyPrefrence;
