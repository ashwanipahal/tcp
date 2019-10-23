import styled, { css } from 'styled-components';

const getAdditionalStyle = props => {
  const { margins, paddings } = props;
  return {
    ...(margins && { margin: margins }),
    ...(margins && { padding: paddings }),
  };
};

const PageContainer = styled.View`
  flex: 1;
  ${getAdditionalStyle}
`;

const ItemCountContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 12px;
  margin-top: 16px;
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

const styles = css``;

export { styles, PageContainer, ItemCountContainer, ListHeaderContainer };
