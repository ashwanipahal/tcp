import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import { styles, Container } from '../styles/FilterButtons.style.native';
import { Button } from '../../../../../../common/atoms';
import { BUTTON_VARIATION } from '../../../../../../common/atoms/Button';

/**
 * @param {Object} props : props for filter buttons
 * @desc This method generate filter buttons
 */
const FilterButtons = props => {
  const { labelsFilter, onPressFilter, onPressSort, selected } = props;
  const { mobileAppFilterIcon } = BUTTON_VARIATION;
  return (
    <Container>
      <Button
        buttonVariation={mobileAppFilterIcon}
        type="button"
        data-locator="view_gallery_button"
        text={labelsFilter.lbl_filter}
        onPress={onPressFilter}
        showIcon
        width="48%"
        selected={selected}
      />
      <Button
        buttonVariation={mobileAppFilterIcon}
        type="button"
        data-locator="view_gallery_button"
        text={labelsFilter.lbl_sort}
        onPress={onPressSort}
        showIcon
        width="48%"
        selected={selected}
      />
    </Container>
  );
};

FilterButtons.propTypes = {
  props: PropTypes.shape({}),
  labelsFilter: PropTypes.shape({}),
  onPressFilter: PropTypes.func,
  onPressSort: PropTypes.func,
  selected: PropTypes.bool,
};

FilterButtons.defaultProps = {
  props: {},
  labelsFilter: {
    lbl_filter: 'FILTER',
    lbl_sort: 'SORT',
  },
  onPressFilter: () => {},
  onPressSort: () => {},
  selected: false,
};

export default withStyles(FilterButtons, styles);
export { FilterButtons as FilterButtonsVanilla };
