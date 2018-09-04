import React from 'react';
import {
	Link
} from 'react-router-dom';

//add NavLink for activeClassName

const Header = (props) => {
	const {
		branding
	} = props;
	return(
		<nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
			<div className="container">
				<a href="/" className="navbar-brand">
					{branding}
				</a>
		    {/* <Link to='/'>
		      <h1>Addressbook</h1>
		    </Link>
		    <Link to='/'>Add Contact</Link>
		    <Link to='/allcontacts'>All Contacts </Link>
		    <Link to='/editcontact'>Edit Contacts</Link> */}

				{/*  */}
			{/* <React.Fragment> */}
				<ul className="navbar-nav ml-auto">
					 <li className="nav-item">
						 <Link to="/" className="nav-link">
							 <i className="fas fa-home" /> Add Contact
						 </Link>
					 </li>
					 <li className="nav-item">
						 <Link to="/allcontacts" className="nav-link">
							 <i className="fas fa-plus" /> All Contacts
						 </Link>
					 </li>
					 <li className="nav-item">
						 <Link to="/about" className="nav-link">
							 <i className="fas fa-question" /> About
						 </Link>
					 </li>
				 </ul>
			 {/* </React.Fragment> */}
			</div>
    </nav>
	);
};

Header.defaultProps = {
	branding: "Contact Manager"
}

export default Header;
