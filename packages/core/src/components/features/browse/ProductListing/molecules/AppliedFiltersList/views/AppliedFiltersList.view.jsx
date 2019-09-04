import React from 'react';
import withStyles from '../../../../../../common/hoc/withStyles';
import AppliedFiltersListStyle from '../styles/AppliedFiltersList.style';
import AppliedFilterChip from '../../../atoms/AppliedFilterChip';

// @flow
type Props = {
  appliedFilters: any,
  onRemoveFilter: any,
  removeAllFilters: any,
  className: string,
  labels: any,
};

class AppliedFiltersList extends React.PureComponent<Props> {
  render() {
    const { appliedFilters, onRemoveFilter, removeAllFilters, className, labels } = this.props;
    let chipsCount = 0;

    return (
      <div className={`${className} applied-filters-sorting-container`}>
        <span className="filtering-title" data-locator="plp_filter_filtering_by">
          {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
          {labels.lbl_filtering_by}:
        </span>

        <ul className="applied-filter-list">
          {appliedFilters.map(
            filter =>
              filter &&
              filter.map(data => {
                const name = data.displayName;

                // eslint-disable-next-line no-plusplus
                chipsCount++;
                return (
                  <AppliedFilterChip
                    id={data.id}
                    key={data.id}
                    fieldName={data.facetName}
                    displayName={name}
                    onRemoveClick={onRemoveFilter}
                  />
                );
              })
          )}
          {removeAllFilters && chipsCount > 1 && (
            <button
              type="button"
              className="applied-filter-clear-all"
              onClick={removeAllFilters}
              data-locator="plp_filter_applied_filter_clear_all"
            >
              <span className="applied-filter-remove-button"> Clear All </span>
              {labels.lbl_clear}
            </button>
          )}
        </ul>
      </div>
    );
  }
}

export default withStyles(AppliedFiltersList, AppliedFiltersListStyle);
export { AppliedFiltersList as AppliedFiltersListVanilla };
