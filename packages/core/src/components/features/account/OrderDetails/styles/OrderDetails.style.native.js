import styled from 'styled-components/native';

const ItemContent = styled.View`
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  padding-right: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const ContentWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export { ContentWrapper, ItemContent };
