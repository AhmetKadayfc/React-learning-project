import React, { useState } from 'react';
import { Navbar, NavbarToggler, Collapse, NavItem, Nav } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function Navigate(props) {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen)
	const linkStyle = {
		color: "#333",
		textDecoration: "none",
		marginRight:"10px"
	}
	return (
		<Navbar light expand="md">
			<Link style={linkStyle} to="/">
				<h1>{props.title}</h1>
				</Link>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar className="justify-content-end">
				<Nav>
					<NavItem>
						<Link style={linkStyle} to="/">Home</Link>
					</NavItem>
					<NavItem>
						<Link style={linkStyle} to="/addUser">Add User</Link>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
}
Navigate.defaultProps = {
	title: 'Default Nav Title'
};
Navigate.propTypes = {
	title: PropTypes.string
};
export default Navigate;
