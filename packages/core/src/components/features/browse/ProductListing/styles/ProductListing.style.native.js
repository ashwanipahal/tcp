import styled, { css } from 'styled-components';

const getAdditionalStyle = props => {
  const { margins, paddings } = props;
  return {
    ...(margins && { margin: margins }),
    ...(paddings && { padding: paddings }),
  };
};

const PageContainer = styled.View`
  flex: 1;
  ${getAdditionalStyle}
`;

const ItemCountContainer = styled.View`
  flex-direction: row;
`;

const EmptyView = styled.View`
  min-width: 10px;
  min-height: 10px;
  ${getAdditionalStyle};
`;

const FilterContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const getListHeaderContainerStyle = props => {
  const { theme } = props;
  const { colorPalette, spacing } = theme;
  return `
    background: ${colorPalette.white}
    padding-bottom: ${spacing.ELEM_SPACING.SM}
  `;
};

const ListHeaderContainer = styled.View`
  ${getListHeaderContainerStyle}
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  ${getAdditionalStyle};
`;

const DisplayPlp = styled.View`
  ${props => (props.renderplp ? `display:none` : ``)};
  ${props => (!props.renderskeleton ? `display:none` : '')};
`;

const DisplaySkeleton = styled.View`
  ${props => (!props.renderskeleton ? `display:none` : ``)};
  ${props => (props.renderplp ? `display:none` : '')};
`;

const styles = css``;

export {
  styles,
  PageContainer,
  ItemCountContainer,
  ListHeaderContainer,
  FilterContainer,
  EmptyView,
  RowContainer,
  DisplayPlp,
  DisplaySkeleton,
};
