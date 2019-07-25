import styled from 'styled-components/native';

export const TitleView = styled.View`
  background: #ebf7ff;
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
    ${props => props.theme.spacing.ELEM_SPACING.MED} 14px;
`;

export const ItemView = styled.View`
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
    ${props => props.theme.spacing.ELEM_SPACING.MED} 14px;
`;

export const HeadingView = styled.View`
  padding: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
    ${props => props.theme.spacing.ELEM_SPACING.MED} 14px;
  border-bottom-color: #c3c3c3;
  border-bottom-width: 1;
`;
