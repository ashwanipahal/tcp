import styled from 'styled-components/native';

const TouchabelContainer = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  height: 45px;
  align-items: center;
  padding: 0px ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

const RightArrowImageContainer = styled.View`
  margin: ${props => props.theme.spacing.LAYOUT_SPACING.SM}
    ${props => props.theme.spacing.ELEM_SPACING.XXS};
  flex: 1;
  align-items: flex-end;
`;

export { TouchabelContainer, RightArrowImageContainer };
