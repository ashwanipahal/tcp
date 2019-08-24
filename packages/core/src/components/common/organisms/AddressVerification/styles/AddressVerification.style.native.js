import styled from 'styled-components/native';

const AddressVerificationContainer = styled.View`
  margin: 0 ${props => props.theme.spacing.LAYOUT_SPACING.MED};
`;

const ButtonWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
`;

const MessageWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

const AddressOptionWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
`;

const EnteredWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
`;

const EnteredSectionWrapper = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.PRIMARY.GRAY};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const SuggestWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.XL};
`;

const SuggestSectionWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const VerifyAddressWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XL};
`;

export {
  AddressVerificationContainer,
  ButtonWrapper,
  MessageWrapper,
  AddressOptionWrapper,
  EnteredWrapper,
  SuggestWrapper,
  EnteredSectionWrapper,
  SuggestSectionWrapper,
  VerifyAddressWrapper,
};
