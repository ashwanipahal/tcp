import styled from 'styled-components/native';

export const BagPageBackContainer = styled.TouchableOpacity`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.MED};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  width: 100%;
  border-bottom-color: ${props => props.theme.colorPalette.gray[500]};
  border-bottom-width: 1;
`;

export default {
  BagPageBackContainer,
};
