import React, {
	Component
} from 'react';
import PropTypes from 'prop-types';
import {
	Consumer
} from '../../context';
import api from '../../utils/api';
import {
	Link
} from 'react-router-dom';

class Contact extends Component {

	state = {
		showContactInfo: false
	}

	toggleContactInfo = (e) => {
		const {
			showContactInfo
		} = this.state;
		this.setState({
			showContactInfo: !showContactInfo
		})
	}

	onDeleteClick = async (id, dispatch) => {
		try {
			await api.deleteUser(id);
			dispatch({
				type: "DELETE_CONTACT",
				payload: id
			});
		} catch(e) {
			dispatch({
				type: "DELETE_CONTACT",
				payload: id
			});
		}
	};

	render() {
		//this will show each individual component w/ their respective buttons
		const {
			id,
			name,
			email,
			phone,
			address
		} = this.props.contact;
		const {
			showContactInfo
		} = this.state;

		return(
			<Consumer>
				{value => {
					const { dispatch } = value;
					return (
						<div className='card card-body mb-3'>
			        <h4>
			          {/* {name || this.props.name} */}
								{name}{" "}
			          <i
			          className="fas fa-sort-down"
			          onClick={this.toggleContactInfo.bind(this, name)}
			          />
			          <i
			          className="fas fa-times"
			          style={{float: 'right', color: 'red'}}
			          onClick={this.onDeleteClick.bind(this, id, dispatch)}
			          />
								<Link to={`/editcontact/${id}`}>
									<i
									 className="fas fa-pencil-alt"
									 style={{float: 'right', color: 'black', marginRight: '1rem'}}
									/>
								</Link>
			        </h4>
			          {showContactInfo ? (
			            <ul className="list-group">
			              <li className='list-group-item'>Email: {email}</li>
			              <li className='list-group-item'>Phone: {phone}</li>
			              {/* <li className='list-group-item'>Address: {`${address.street} ${address.city} ${address.suite} ${address.zipcode}` || address} */}
			              <li className='list-group-item'>Address: {address.street} 

                      {/* <ul>
                        <li>
                          hello
                        </li>
                      </ul> */}
                    </li>
                    {/* value={`${address.street} ${address.city} ${address.suite} ${address.zipcode}`} */}
			            </ul>
								 )
			            : null
			          }
			      </div>
					)
				}
				}
			</Consumer>
		)
	}
}

Contact.propTypes = {
	contact: PropTypes.object.isRequired
}

export default Contact;
