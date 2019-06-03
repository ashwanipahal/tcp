import Link from 'next/link';
import Collapsible from 'react-collapsible';


class AccordionSectionA extends React.Component {
    state = {
        item: null
    }
    componentDidMount(){
        this.setState({
            item: this.props.item
        })
    }
    render(){

    let item = this.state.item;
    
    return item && (
        <Collapsible trigger={item.val[0].val.title}>
        <p>{item.val[1].val.map((link, i) => (
            <Link key={i} href={link.val.url}><a>{link.val.title}</a></Link>
            )
        )}</p>
        </Collapsible>
        );
    }
};
  


export default AccordionSectionA;

