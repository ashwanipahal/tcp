import styled from 'styled-components/native';
import createThemeColorPalette from '@tcp/core/styles/themes/createThemeColorPalette';

const colorPallete = createThemeColorPalette();

const StyledWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-color: ${props => props.theme.colorPalette.gray[600]};
`;

// New Styled components

const StyledRadioButtonItem = styled.View`
  display: flex;
  padding: ${props => props.theme.spacing.ELEM_SPACING.SM};
  border-top-width: 1px;
  border-color: ${props => props.theme.colorPalette.gray[600]};
  opacity: ${props => (props.disabled ? '0.6' : '1.0')};
`;

const StyledTopRow = styled.View`
  display: flex;
  flex-direction: row;
`;

const StyledBottomRow = styled.View`
  display: flex;
  flex-direction: row;
  padding: 0 28px;
  align-items: flex-end;
  justify-content: space-between;
`;

const StyledDatesWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const StyledStoreWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const StyledChangeStore = styled.View`
  border-bottom-color: ${props => props.theme.colorPalette.gray[900]};
  border-bottom-width: 1px;
`;

const labelStyle = {
  fontSize: 14,
  color: colorPallete.gray[900],
};

export {
  StyledWrapper,
  StyledTopRow,
  StyledBottomRow,
  StyledRadioButtonItem,
  StyledDatesWrapper,
  StyledStoreWrapper,
  StyledChangeStore,
  labelStyle,
};
