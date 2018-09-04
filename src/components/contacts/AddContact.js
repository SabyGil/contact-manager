import React, {
	Component
} from 'react';
import {
	Consumer
} from '../../context';
import uuid from 'uuid';
import TextInputGroup from '../layout/TextInputGroup';
import api from '../../utils/api';
import Contact from './Contact';

class AddContact extends Component {
	state = {
		name: '',
		email: '',
		phone: '',
		address: '',
		errors: {}
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: [e.target.value]
		})
	}

	onSubmit = async (dispatch, e) => {
		e.preventDefault();
		const {
			name,
			email,
			phone,
			address,
			errors
		} = this.state;

		//Form Validation
		if(name === '') {
			this.setState({
				errors: {
					name: 'Name is required!'
				}
			})
			return;
		}

		if(email === '') {
			this.setState({
				errors: {
					email: 'Email is required!'
				}
			})
			return;
		}

		if(phone === '') {
			this.setState({
				errors: {
					phone: 'Phone is required!'
				}
			})
			return;
		}

		if(address === '') {
			this.setState({
				errors: {
					address: 'Address is required!'
				}
			})
			return;
		}

		//Adding new contact info
		const newContact = {
			name,
			email,
			phone,
			address
		}

		const res = await api.addUser(newContact);

		dispatch({
			type: "ADD_CONTACT",
			payload: res.data
		});

		//Reset Form Inputs
		this.setState({
			name: '',
			email: '',
			phone: '',
			address: '',
			errors: {}
		})
	}

	getRecentContacts = (contacts) => {
		return contacts.map((contact, i) => {
			while(i < 3) {
				return(
					<Contact key={uuid()} contact={contact}/>
				)
			}
		})
	}

	render() {
		const {
			name,
			email,
			phone,
			address,
			errors
		} = this.state;
		return(
			<Consumer>
        {value => {
          const { contacts, dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label='Name'
                    name='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label='Email'
                    name='email'
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label='Phone'
                    name='phone'
                    placeholder='Enter Phone'
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <TextInputGroup
                    label='Address'
                    name='address'
                    placeholder='Enter Address'
                    value={address}
                    onChange={this.onChange}
                    error={errors.address}
                  />
                  <input
                    type='submit'
                    value='Add Contact'
                    className='btn btn-light btn-block'
                  />
                </form>

                <h1 className='display-4'>Recently Added:</h1>
                {this.getRecentContacts.bind(this, contacts)()}
              </div>
            </div>
          )
        }
        }
      </Consumer>
		)
	}
}

export default AddContact;
