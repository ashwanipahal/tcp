// any molecule will come here
import React, {Fragment} from 'react';
// import {Link, Image, Text} from '../atoms/index';
import Link from 'next/link';
import Collapsible from 'react-collapsible';
import AccordionStyle from './Accordion.style';


const Accordion = () => (
    <Fragment>
        <AccordionStyle />
        <Collapsible trigger="My Place Rewards">
            <p>
                <Link href="#"><a>Create An Account</a></Link>
                <Link href="#"><a>Check Point Balance</a></Link>
                <Link href="#"><a>Redeem Rewards</a></Link>
                <Link href="#"><a>Member Benefits</a></Link>
            </p>
        </Collapsible>
        <Collapsible trigger="My Place Rewards Credit Card">
            <p>
                <Link href="#"><a>Learn More</a></Link>
                <Link href="#"><a>Apply Now</a></Link>
                <Link href="#"><a>Pay yor Bill</a></Link>
                <Link href="#"><a>Manage Your Account</a></Link>
            </p>  
        </Collapsible>
        <Collapsible trigger="Help Center">
            <p>
                <Link href="#"><a>FAQs</a></Link>  
                <Link href="#"><a>Order Status</a></Link>  
                <Link href="#"><a>Manage Your Account</a></Link>  
                <Link href="#"><a>Return Policy</a></Link>  
                <Link href="#"><a>Shipping Options</a></Link>  
                <Link href="#"><a>Gift Card Balance</a></Link>  
                <Link href="#"><a>Privacy Policy</a></Link>  
                <Link href="#"><a>Terms and Conditions</a></Link>  
                <Link href="#"><a>Internet Based Ads</a></Link>  
                <Link href="#"><a>Contact Us</a></Link>
            </p>
        </Collapsible>
        <Collapsible trigger="Shopping">
        <p>
            <Link href="#"><a>My Account</a></Link>
            <Link href="#"><a>Create An Account</a></Link>
            <Link href="#"><a>Coupons</a></Link>
            <Link href="#"><a>Store Locator</a></Link>
            <Link href="#"><a>Size Chart</a></Link>
            <Link href="#"><a>Gift Cards</a></Link>
            <Link href="#"><a>Gift Services</a></Link>
            <Link href="#"><a>Favorites</a></Link>
            <Link href="#"><a>Seasonal Lookbooks</a></Link>
            <Link href="#"><a>Mobile App</a></Link>
            <Link href="#"><a>Recall Information</a></Link>
            <Link href="#"><a>The Mom Space</a></Link>
            <Link href="#"><a>Blog</a></Link>
        </p>
        </Collapsible>
        <Collapsible trigger="About Us">
        <p>
            <Link href="#"><a>Corporate Home</a></Link>
            <Link href="#"><a>Who We Are</a></Link>
            <Link href="#"><a>Careers</a></Link>
            <Link href="#"><a>Investor Relations</a></Link>
            <Link href="#"><a>Corporate Responsibility</a></Link>
            <Link href="#"><a>International Opportunities</a></Link>
        </p>
        </Collapsible>
        
    </Fragment>
);
  


export default Accordion;

