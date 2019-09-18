import React from 'react';
import { storiesOf } from '@storybook/react';
import { css } from 'styled-components';
import tcpTheme from '@tcp/core/styles/themes/TCP';
import CollapsibleContainer from '../views/CollapsibleContainer.view';
import withStyles from '../../../hoc/withStyles';

const overrideStyles = css`
  border-bottom: 1px solid ${props => props.theme.colors.PRIMARY.LIGHTGRAY};

  .collapsible-header {
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    height: auto;
    padding-left: 0;
    padding-right: 0;
    padding-top: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
    padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
    background: none;

    &[aria-expanded='true'] {
      padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XXS};
    }

    &-text {
      font-size: ${props => props.theme.fonts.fontSize.body.small.secondary}px;
      font-weight: ${props => props.theme.fonts.fontWeight.bold};
      line-height: ${props => props.theme.fonts.lineHeight.normal};
      color: ${props => props.theme.colors.TEXT.DARK};
    }
    > div {
      flex: 1;
      text-align: left;
    }
  }

  .collapsible-icon {
    top: 28px;
  }

  .collapsible-content {
    font-family: ${props => props.theme.fonts.secondaryFontFamily};
    font-size: ${props => props.theme.fonts.fontSize.body.small.secondary}px;
    font-weight: ${props => props.theme.fonts.fontWeight.normal};
    line-height: ${props => props.theme.fonts.lineHeight.normal};
    color: ${props => props.theme.colors.TEXT.DARK};
    padding-bottom: ${props => props.theme.spacing.LAYOUT_SPACING.XS};
  }
`;

const WrapperComponent = withStyles(CollapsibleContainer, overrideStyles);

storiesOf('CollapsibleContainer', module).add('Store Locator Collapsible', () => (
  <WrapperComponent
    theme={tcpTheme}
    header={<span className="collapsible-header-text">Hell World</span>}
    body={
      <div className="collapsible-content">
        Aliqua reprehenderit quis deserunt ex pariatur minim occaecat magna ad do officia fugiat.
        Exercitation aute exercitation fugiat adipisicing adipisicing excepteur irure minim dolor
        laboris qui incididunt. Ad fugiat eu irure cillum magna reprehenderit do pariatur deserunt
        aute nulla quis dolor qui. Laborum reprehenderit culpa mollit laboris eu magna laborum. Enim
        nulla irure ad eu reprehenderit amet aliquip veniam minim proident sit esse occaecat.
        Laborum qui labore duis id magna deserunt mollit aute ea est aliqua ipsum.
      </div>
    }
  />
));
