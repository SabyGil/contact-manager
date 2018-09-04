import React, {
	Component
} from 'react';
import {
	Consumer
} from '../../context';
import uuid from 'uuid';
import TextInputGroup from '../layout/TextInputGroup';
import api from '../../utils/api';

class EditContact extends Component {
	state = {
		name: '',
		email: '',
		phone: '',
		address: '',
		errors: {}
	}

	async componentDidMount() {
		const {
			id
		} = this.props.match.params;

		const res = await api.fillInUserInfo(id);

		const contact = res.data;

		this.setState({
			name: contact.name,
			email: contact.email,
			phone: contact.phone,
			address: contact.address
		})
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

		//Edit Functionality
		const updContact = {
			name,
			email,
			phone,
			address
		}

		const {
			id
		} = this.props.match.params;

		const res = await api.editUser(id, updContact)
		dispatch({
			type: 'UPDATE_CONTACT',
			payload: res.data
		})

		//Reset State
		this.setState({
			name: '',
			email: '',
			phone: '',
			address: '',
			errors: {}
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
              <div className="card-header">Edit Contact</div>
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
                    value={`${address.street} ${address.city} ${address.suite} ${address.zipcode}`}
                    onChange={this.onChange}
                    error={errors.address}
                  />
                  <input
                    type='submit'
                    value='Update Contact'
                    className='btn btn-light btn-block'
                  />
                </form>
            </div>
          </div>
          )
        }

        }
      </Consumer>
		)
	}
}

export default EditContact;
