import styled from 'styled-components/native';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';

const TouchableLink = styled.TouchableHighlight.attrs({
  underlayColor: props => props.theme.colors.BUTTON.WHITE.ALT_FOCUS,
})`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const ContactPreferencesTileItemContainer = styled.View`
  height: 24px;
  flex: 1;
  flex-direction: row;
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const BodyCopyStyle = {
  fontSize: 'fs13',
};

const BodyCopyLeftMargin = styled.View`
  margin-right: ${props => props.theme.spacing.ELEM_SPACING.LRG};
`;

const BodyCopyLabelWrapper = styled(BodyCopy)`
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

const LeftContainer = {
  flex: 2,
  flexDirection: 'row',
  justifyContent: 'flex-start',
};

const MiddleContainer = {
  flex: 1.5,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
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
  ContactPreferencesTileItemContainer,
  LeftContainer,
  RightContainer,
  MiddleContainer,
  BodyCopyLeftMargin,
  BodyCopyLabelWrapper,
};
