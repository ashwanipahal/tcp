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

const PageContainer = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  align-items: center;
`;

const AnchorContainer = {
  flexDirection: 'row',
};

const RecommendationWrapper = styled.View`
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
  width: 100%;
`;

export {
  styles,
  RowContainer,
  ColumnContainer,
  PageContainer,
  AnchorContainer,
  RecommendationWrapper,
};
