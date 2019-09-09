import styled from 'styled-components/native';

const BtnWrapper = styled.View`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const getWrapperStyles = props => {
  return `
    height: 42px;
    width: ${props.isPlcc ? '103px' : props.theme.spacing.LAYOUT_SPACING.XXL}
    border: 1px solid ${props.theme.colors.BORDER.NORMAL};
    justify-content: space-around;
    padding: ${props.theme.spacing.ELEM_SPACING.XXS};
    margin-left: ${props.index > 0 ? props.theme.spacing.ELEM_SPACING.MED : 0};
  `;
};

const StyledTouchableOpacity = styled.TouchableOpacity`
  ${props => `${getWrapperStyles(props)}`}
`;

const StyledView = styled.View`
  opacity: 0.5;
  ${props => `${getWrapperStyles(props)}`};
`;
export { BtnWrapper, StyledView, StyledTouchableOpacity };
