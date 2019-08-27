/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import SortSelectorStyle from '../SortSelector.style';
import CustomSelect from '../../CustomSelect/views';
import { reduxForm, Field, submit } from 'redux-form';

export const FACETS_FIELD_KEY = {
  sort: 'sort',
};

const SortSelector = props => {
  const {
    className,
    onChange,
    sortSelectOptions,
    selectTextOverride,
    onExpandCallback,
    expanded,
    hideTitle,
  } = props;
  console.info('sortSelectOptions', sortSelectOptions);
  return (
    <Field
      name={FACETS_FIELD_KEY.sort}
      component={CustomSelect}
      optionsMap={sortSelectOptions}
      title={hideTitle ? '' : 'Sort By: '}
      placeholder={hideTitle ? '' : 'Sort'}
      allowMultipleSelections={false}
      className={className}
      onChange={onChange}
      onExpandCallback={onExpandCallback}
      expanded={expanded}
      selectTextOverride={selectTextOverride}
    />
  );
};

SortSelector.propTypes = {
  sortSelectOptions: PropTypes.shape({}),
};

SortSelector.defaultProps = {
  sortSelectOptions: {},
};

export default reduxForm({
  form: 'sort-selector', // a unique identifier for this form
})(withStyles(SortSelector, SortSelectorStyle));
