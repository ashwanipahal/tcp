import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { styles, Container } from '../styles/FilterButtons.style.native';
import { Button } from '../../../../../../common/atoms';

/**
 * @param {Object} props : props for colorsMap
 * @desc This method generate color switches
 */
const FilterButtons = props => {
  const { labelsFilter, onPressFilter, onPressSort } = props;
  return (
    <Container>
      <Button
        buttonVariation="variable-width"
        type="button"
        data-locator="view_gallery_button"
        text={labelsFilter.lbl_filter}
        onPress={onPressFilter}
      />
      <Button
        buttonVariation="variable-width"
        type="button"
        data-locator="view_gallery_button"
        text={labelsFilter.lbl_sort}
        onPress={onPressSort}
      />
    </Container>
  );
};

FilterButtons.propTypes = {
  props: PropTypes.shape({}),
  labelsFilter: PropTypes.shape({}),
  onPressFilter: PropTypes.func,
  onPressSort: PropTypes.func,
};

FilterButtons.defaultProps = {
  props: {},
  labelsFilter: {
    lbl_filter: 'FILTER',
    lbl_sort: 'SORT',
  },
  onPressFilter: () => {},
  onPressSort: () => {},
};

export default withStyles(FilterButtons, styles);
export { FilterButtons as FilterButtonsVanilla };
