import styled from 'styled-components/native';

const SaveToAccountWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  display: flex;
  flex-direction: row;
`;

const SaveToAccountTextWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

const FooterButtonsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: ${props => props.theme.typography.fontSizes.fs12};
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXL};
`;

export { SaveToAccountWrapper, FooterButtonsWrapper, SaveToAccountTextWrapper };
