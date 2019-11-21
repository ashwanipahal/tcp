import styled from 'styled-components/native';

// Conditional spacing based on showInput prop
const OptionsSpacing = props =>
  props.showInput ? props.theme.spacing.LAYOUT_SPACING.MED : props.theme.spacing.LAYOUT_SPACING.XL;

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
  margin-left: ${props => OptionsSpacing(props)};
  margin-right: ${props => OptionsSpacing(props)};
`;

const EnteredWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-left: ${props => OptionsSpacing(props)};
  margin-right: ${props => OptionsSpacing(props)};
`;

const EnteredSectionWrapper = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.PRIMARY.GRAY};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const SuggestWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.SM};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.MED};
`;

const SuggestSectionWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
`;

const VerifyAddressWrapper = styled.View`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const OptionAddressLineWrapper = styled.View`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XL};
  margin-left: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
  margin-right: ${props => props.theme.spacing.LAYOUT_SPACING.SM};
`;

export {
  AddressVerificationContainer,
  ButtonWrapper,
  MessageWrapper,
  AddressOptionWrapper,
  OptionAddressLineWrapper,
  EnteredWrapper,
  SuggestWrapper,
  EnteredSectionWrapper,
  SuggestSectionWrapper,
  VerifyAddressWrapper,
};
