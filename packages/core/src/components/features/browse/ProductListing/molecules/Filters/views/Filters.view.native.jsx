import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components/native';
import { Button } from '@tcp/core/src/components/common/atoms';
import { BUTTON_VARIATION } from '@tcp/core/src/components/common/atoms/Button';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import {
  styles,
  PageContainer,
  Container,
  getFlatListContainerStyle,
  ItemSeparatorStyle,
  TitleText,
  ApplyAndClearButtonContainer,
} from '../Filters.style.native';
import LinkImageIcon from '../../../atoms/LinkImageIcon';

class Filters extends React.PureComponent {
  static propTypes = {
    filters: PropTypes.shape({}),
    theme: PropTypes.shape({}),
    labelsFilter: PropTypes.shape({}),
  };

  static defaultProps = {
    filters: {},
    theme: {},
    labelsFilter: {},
  };

  filterNames = [];

  constructor(props) {
    super(props);
    const { filters } = this.props;
    const { unbxdDisplayName } = filters;
    this.filterNames = Object.entries(unbxdDisplayName);
  }

  /**
   * @desc This is seperator method which used for making gap between color switches
   */
  renderSeparator = () => {
    return <ItemSeparatorStyle />;
  };

  onSelectFilter = () => {};

  renderListItem = ({ item }) => {
    const { displayName } = item;
    return (
      <Button
        buttonVariation={BUTTON_VARIATION.mobileAppFilter}
        text={displayName}
        onPress={this.onSelectFilter}
        selected={false}
        data-locator=""
        accessibilityLabel={displayName}
      />
    );
  };

  renderColorSwitchItem = ({ item }) => {
    const { imagePath } = item;
    return <LinkImageIcon uri={imagePath} onPress={() => {}} />;
  };

  onClearAll = () => {};

  onApplyFilter = () => {};

  renderList = (key, title, filterData) => {
    if (filterData && filterData.length > 0) {
      const itemRenderer =
        key === 'TCPColor_uFilter' ? this.renderColorSwitchItem : this.renderListItem;
      return (
        <Container>
          <TitleText>{title}</TitleText>
          <FlatList
            contentContainerStyle={getFlatListContainerStyle()}
            listKey={item => item.id}
            data={filterData}
            renderItem={itemRenderer}
            keyExtractor={item => item.id}
            initialNumToRender={8}
            maxToRenderPerBatch={2}
            horizontal
            ItemSeparatorComponent={this.renderSeparator}
            showsHorizontalScrollIndicator={false}
          />
        </Container>
      );
    }
    return null;
  };

  renderFilters = () => {
    const { filters } = this.props;
    return this.filterNames.map(item => {
      const key = item[0];
      const value = item[1];
      const filterData = filters[key] || [];
      return this.renderList(key, value, filterData);
    });
  };

  render() {
    const { labelsFilter } = this.props;
    return (
      <PageContainer>
        {this.renderFilters()}
        <ApplyAndClearButtonContainer>
          <Button
            fill="WHITE"
            type="submit"
            buttonVariation="variable-width"
            data-locator=""
            text={labelsFilter.lbl_clear}
            onPress={this.onClearAll}
            accessibilityLabel={labelsFilter.lbl_clear}
            width="48%"
            fontSize="fs14"
          />
          <Button
            fill="BLACK"
            type="submit"
            buttonVariation="variable-width"
            data-locator=""
            text={labelsFilter.lbl_apply}
            onPress={this.onApplyFilter}
            accessibilityLabel={labelsFilter.lbl_apply}
            width="48%"
            fontSize="fs14"
          />
        </ApplyAndClearButtonContainer>
      </PageContainer>
    );
  }
}

export default withStyles(withTheme(Filters), styles);
export { Filters as FiltersVanilla };
