import styled from 'styled-components/native';

export const AboutYouWrapper = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0;
`;

export const OptionsWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: ${props => props.theme.spacing.ELEM_SPACING.MED} 0
    ${props => props.theme.spacing.ELEM_SPACING.XS} -12px;
`;

export const Options = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.MED}
    ${props => props.theme.spacing.ELEM_SPACING.SM};
  width: 40%;
  justify-content: flex-start;
`;

export const ActionsWrapper = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.SM} 0;
`;

export const ActionsContainer = styled.View`
  margin: ${props => props.theme.spacing.ELEM_SPACING.LRG} 0;
`;
