import styled from 'styled-components/native';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';

const TouchableLink = styled.TouchableHighlight.attrs({
  underlayColor: props => props.theme.colors.BUTTON.WHITE.ALT_FOCUS,
})`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const MyFavoriteTileItemContainer = styled.View`
  height: 20px;
  flex: 1;
  flex-direction: row;
`;

const BodyCopyStyle = {
  fontSize: 'fs13',
};

const BodyCopyWrapper = styled(BodyCopy)`
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
  text-transform: ${props => (props.textTransform ? props.textTransform : 'capitalize')};
`;

const LeftContainer = {
  flex: 1.5,
  justifyContent: 'flex-start',
};

const RightContainer = {
  flex: 0.5,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
};

export {
  TouchableLink,
  BodyCopyStyle,
  MyFavoriteTileItemContainer,
  LeftContainer,
  RightContainer,
  BodyCopyWrapper,
};
