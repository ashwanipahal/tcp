import styled, { css } from 'styled-components';

const getAdditionalStyle = props => {
  const { margins } = props;
  return {
    ...(margins && { margin: margins }),
  };
};

const styles = css`
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED}
    ${props => props.theme.spacing.ELEM_SPACING.MED} 0px;
`;

const RowContainer = styled.View`
  ${getAdditionalStyle};
  flex-direction: row;
`;

const ColumnContainer = styled.View`
  ${getAdditionalStyle};
  flex-direction: column;
`;

export { styles, RowContainer, ColumnContainer };
