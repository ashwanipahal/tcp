import React from 'react';
import styles from '../styles/DropdownList.style';
import withStyles from '../../../hoc/withStyles';
import BodyCopy from '../../../atoms/BodyCopy';

// @flow
type Props = {
  optionsMap: object,
  className: string,
  clickHandler: Function,
  ValueForActiveClass: string,
  addClickhandler: Function
};




const DropdownList = ({
    className,
    optionsMap,
    clickHandler,
    addClickhandler,
    ValueForActiveClass
   }: Props)=>{
    const nthClild =   optionsMap.find(itemValue => itemValue.value==='');
    const nthClildWithClass = nthClild ? nthClild.value:'undefined' ;
    return (
      <div className={className}>
        <BodyCopy className={`${(nthClildWithClass==='') ? 'addNewItemButton' : ''}`}>
          <BodyCopy className="divOverFlow">
            <ul className={`${(nthClildWithClass==='') ? 'ulBorderWithLastRow' : 'ulBorder'}`}>
              {optionsMap.map((item) =>(
                <li key={item.value}>
                  <BodyCopy role="button" className={`liBottomBorder ${(ValueForActiveClass===item.value) ? 'activeClass' : ''}`} tabIndex={-1} key={item.value} onClick={(item.value==='') ? (e) => addClickhandler(e, item.value, item.title): (e) => clickHandler(e, item.value, item.title)} onKeyPress={(item.value==='') ? (e) => addClickhandler(e, item.value, item.title): (e) => clickHandler(e, item.value, item.title)}>
                    <BodyCopy className={`${(ValueForActiveClass===item.value) ? 'activeIcon' : ''}`} />
                    {item.content}
                  </BodyCopy>
                </li>
              ))}
            </ul>
          </BodyCopy>
        </BodyCopy>
      </div>
    );
}

export default withStyles(DropdownList, styles);
export { DropdownList as CustomSelectVanilla };

