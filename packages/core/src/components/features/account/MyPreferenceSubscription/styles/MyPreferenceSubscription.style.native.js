import styled from 'styled-components/native';

export const AppTextWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export const SubscribeCheckWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

export const AppAlertWrapper = styled.View`
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
`;

export default AppTextWrapper;
