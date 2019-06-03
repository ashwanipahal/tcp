// any molecule will come here
import React, {Fragment} from 'react';
// import {Link, Image, Text} from '../atoms/index';
import Link from 'next/link';
import Collapsible from 'react-collapsible';
import AccordionStyle from './Accordion.style';
import DataFooterMiddle from './Accordion.fixture'
import AccordionSectionA from './AccordionSectionA';
import AccordionSectionB from './AccordionSectionB';

class Accordion extends React.Component {
    state = {
        footer: {}
    }
    componentDidMount(){
        const footerMiddle = DataFooterMiddle.data.val.filter(item => item.sub === 'footerMiddle');
        this.setState({
            footer: footerMiddle
        })
    }
    render(){
        
        const footerMiddle = this.state.footer;
        return (
    
            <Fragment>
                <AccordionStyle />
                {footerMiddle && footerMiddle[0] && footerMiddle[0].val && footerMiddle[0].val.map((item, key) => (  
                    item.sub === 'mprWrapper' ? 
                      <AccordionSectionA item={item} key={key} /> : <AccordionSectionB item={item} key={key}/>
                    ))
                }
            </Fragment>
        );
    }
}

export default Accordion;

