import styled from 'styled-components/native';

const GiftWrappingTitle = styled.Text`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

const GiftWrappingName = styled.Text`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export default { GiftWrappingTitle, GiftWrappingName };
