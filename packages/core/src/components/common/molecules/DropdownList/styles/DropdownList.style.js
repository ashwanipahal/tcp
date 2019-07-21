
import { css } from 'styled-components';
import { getIconPath } from '../../../../../utils';

const downArrowIcon = getIconPath('down_arrow_icon');
const activeIcon = getIconPath('active_icon');

const dropDownlist = css`
  .customSelectTitle {
    border-bottom: 1px solid #979797;
    margin-top:10px;
    background: url(${downArrowIcon})
      no-repeat right center;
  }

  .Row_img{
    text-align: right;
  }

  .ulBorder{
    border: solid 1px #979797;
    background-color: #ffffff;
  }

  .liBottomBorder{
    border-bottom: solid 1px #979797;
    width: 100%;
  }

  .divOverFlow{
    overflow-y: scroll;
    height: 200px;
  }

  .activeClass{
    background-color: #edf5fb;
    position: relative;
  }

  .activeIcon{
    background-image: url(${activeIcon});
    background-repeat: no-repeat;
    position: absolute;
    width: 3%;
    right: 1%;
    top: 40%;
    height: 16%;
  }

  .addNewItemButton{
    position: relative;
    padding-bottom: 68px;
    border: solid 1px #979797;
    background-color: #ffffff;
  }

  .classBtn{
    background-color: #1a1a1a;
    color: #fff;
  }

  .ulBorderWithLastRow{
    border-bottom: solid 1px #979797;
    width: 100%;
  }

  .ulBorderWithLastRow li:last-child {
    position: absolute;
    width: 96%;
    height: 45px;
    padding: 15px;
    left: 0;
    bottom: 0;
  }

`;

export default dropDownlist;
