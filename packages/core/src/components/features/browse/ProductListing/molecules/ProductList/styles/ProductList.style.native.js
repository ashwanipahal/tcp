import styled, { css } from 'styled-components';

const PageContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const ItemCountContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-right: 12px;
  margin-top: 16px;
  flex: 1;
`;

const styles = css``;

export { styles, PageContainer, ItemCountContainer };
