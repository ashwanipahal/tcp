import styled, { css } from 'styled-components/native';

export const AnchorStyles = css`
  ${props =>
    props.anchorVariation === 'primary'
      ? `
              color: ${props.theme.colors.ANCHOR.PRIMARY};
            `
      : ''};
  ${props =>
    props.anchorVariation === 'secondary'
      ? `
                  color: ${props.theme.colors.ANCHOR.SECONDARY};
                `
      : ''};
  ${props =>
    props.anchorVariation === 'tertiary'
      ? `
                  color: ${props.theme.colors.ANCHOR.TERTIARY};
                `
      : ''};
  ${props =>
    props.anchorVariation === 'grayed'
      ? `
                  color: ${props.theme.colors.ANCHOR.GRAYED};
                  `
      : ''};
  ${props =>
    props.fontSizeVariation === 'small'
      ? `
                  font-size: ${props.theme.fonts.fontSize.anchor.small}px;
                  `
      : ''};
  ${props =>
    props.fontSizeVariation === 'medium'
      ? `
                  font-size: ${props.theme.fonts.fontSize.anchor.medium}px;
                  `
      : ''};
  ${props =>
    props.fontSizeVariation === 'large'
      ? `
                  font-size: ${props.theme.fonts.fontSize.anchor.large}px;
                      `
      : ''};
  ${props =>
    props.fontSizeVariation === 'xlarge'
      ? `
                  font-size: ${props.theme.fonts.fontSize.anchor.xlarge}px;
                    `
      : ''};
  ${props =>
    props.fontWeightVariation === 'active'
      ? `
                      font-weight: ${props.theme.fonts.fontWeight.bold};
                    `
      : ''};
  ${props =>
    props.fullWidth
      ? `
                      width: 100%;
                      `
      : ''};
  ${props =>
    props.underline
      ? `
                      text-decoration: underline;
                        `
      : 'text-decoration: none;'};

  ${props =>
    props.withCaret
      ? `
                        &:after {
                        content: "›";
                        margin-left: 5px;
              }
            `
      : ''};
  ${props =>
    props.centered
      ? `
                     text-align: center;
                      `
      : ''};
  ${props => (props.inheritedStyles ? props.inheritedStyles : '')};
`;

export const AnchorView = styled.TouchableOpacity`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const AnchorIcon = styled.Image`
  width: 3px;
  height: 7px;
  margin-top: ${props => props.theme.spacing.ELEM_SPACING.XXXS};
  margin-left: ${props => props.theme.spacing.ELEM_SPACING.XS};
`;

export default { AnchorStyles, AnchorView, AnchorIcon };
