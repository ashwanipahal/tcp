import styled from 'styled-components/native';

const EditHandleClickWrapper = styled.View`
  padding-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const GiftWrappingName = styled.Text`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const GiftTitleWrapper = styled.View`
  display: flex;
  flex-direction: row;
  padding-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

export default { EditHandleClickWrapper, GiftWrappingName, GiftTitleWrapper };
