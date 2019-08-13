import styled from 'styled-components/native';

const FlexRow = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const FormContainer = styled.View`
  padding: 18px 16px 12px 14px;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  margin: 0px;
  margin-bottom: 18px;
  align-items: flex-end;
`;

const InputField = styled.View`
  display: flex;
  flex: 1;
  padding-right: 8px;
`;

const ApplyButtonText = {
  fontWeight: 'normal',
  opacity: 0.5,
};

const ApplyButton = {
  height: 42,
  width: 102,
};

const CouponFormContainer = styled.View`
  margin-top: 15;
`;

const NeedHelpText = { paddingLeft: 12 };

export {
  FlexRow,
  Header,
  InputField,
  ApplyButton,
  ApplyButtonText,
  FormContainer,
  CouponFormContainer,
  NeedHelpText,
};
