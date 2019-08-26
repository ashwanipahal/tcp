import styled from 'styled-components/native';
import BodyCopy from '../BodyCopy';

/**
 * @param {*} props
 * This function will create a css string based on the spacingStyles prop passed.
 * spacingStyles format will be "margin-bottom-XL" where margin-bottom is the style to be created
 * and XL is ELEM_SPACING spacing object key.
 * For ex. spacingStyles = 'margin-bottom-XL padding-top-MED', it will return
 * `
 *  margin-bottom: props.theme.spacing.ELEM_SPACING.XL;
 *  padding-top: props.theme.spacing.ELEM_SPACING.MED;
 * `
 */
const getSpacingStyles = props => {
  let spacingStyles = '';
  if (props.spacingStyles) {
    spacingStyles = props.spacingStyles.split(' ').reduce((styleString, currentStyle) => {
      let currentStyleString;
      const del = currentStyle.lastIndexOf('-');
      if (del > -1) {
        const [styleVar, spacingVar] = [
          currentStyle.substring(0, del),
          currentStyle.substring(del + 1, currentStyle.length),
        ];
        if (props.theme.spacing.ELEM_SPACING[spacingVar]) {
          currentStyleString = `${styleString}
          ${styleVar}: ${props.theme.spacing.ELEM_SPACING[spacingVar]};
         `;
        }
      }
      return currentStyleString;
    }, '');
  }

  return spacingStyles;
};

export const StyledHeading = styled.Text`
  font-weight: ${props => props.theme.typography.fontWeights.extrabold};
  padding: ${props => props.theme.spacing.ELEM_SPACING.XL} 0
    ${props => props.theme.spacing.ELEM_SPACING.SM};
`;

export const StyledUnderline = styled.View`
  height: 3px;
  background-color: ${props => props.theme.colorPalette.black};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXL};
`;

export const ButtonWrapperStyle = styled.View`
  margin-top: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
  margin-bottom: ${props => props.theme.spacing.ELEM_SPACING.XXS};
`;

export const BodyCopyWithSpacing = styled(BodyCopy)`
  ${getSpacingStyles}
`;

export const ViewWithSpacing = styled.View`
  ${getSpacingStyles}
`;

export const TextWithSpacing = styled.Text`
  ${getSpacingStyles}
`;
