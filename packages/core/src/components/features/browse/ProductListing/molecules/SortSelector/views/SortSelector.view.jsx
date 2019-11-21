import React from 'react';
import { Field } from 'redux-form';
import withStyles from '../../../../../../common/hoc/withStyles';
import SortSelectorStyle from '../SortSelector.style';
import CustomSelect from '../../CustomSelect/views';
import { getLocator } from '../../../../../../../utils';

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
      defaultPlaceholder,
    } = this.props;

    return (
      <Field
        name={FACETS_FIELD_KEY.sort}
        component={CustomSelect}
        optionsMap={sortSelectOptions}
        title={hideTitle ? '' : 'Sort By: '}
        placeholder={hideTitle ? '' : defaultPlaceholder || 'Sort'}
        allowMultipleSelections={false}
        className={className}
        onChange={onChange}
        onExpandCallback={onExpandCallback}
        expanded={expanded}
        selectTextOverride={selectTextOverride}
        type={FACETS_FIELD_KEY.sort}
        isSortOpenModal={isSortOpenModal}
        data-locator={getLocator('plp_sort_by_text')}
      />
    );
  }
}

export default withStyles(SortSelector, SortSelectorStyle);
export { SortSelector as SortSelectorVanilla };
