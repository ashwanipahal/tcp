/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import SortSelectorStyle from '../SortSelector.style';
import CustomSelect from '../../CustomSelect/views';
import { Field } from 'redux-form';

// @flow
type Props = {
  className: string,
  onChange: any,
  sortSelectOptions: any,
  selectTextOverride: any,
  onExpandCallback: any,
  expanded: any,
  hideTitle: any,
};

export const FACETS_FIELD_KEY = {
  sort: 'sort',
};

class SortSelector extends React.PureComponent<Props> {
  render() {
    const {
      className,
      onChange,
      sortSelectOptions,
      selectTextOverride,
      onExpandCallback,
      expanded,
      hideTitle,
      isSortOpenModal,
    } = this.props;

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
        type={FACETS_FIELD_KEY.sort}
        isSortOpenModal={isSortOpenModal}
      />
    );
  }
}

export default withStyles(SortSelector, SortSelectorStyle);
export { SortSelector as SortSelectorVanilla };
