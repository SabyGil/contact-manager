import React, {
	Component
} from 'react';
import Contact from './Contact';
import {
	Consumer
} from '../../context';

class AddressBook extends Component {

	render() {
		//this component will contain all contacts and render them to the screen
		return(
			<Consumer>
        {value =>{
          const { contacts } = value;

          return (
            <React.Fragment>
              {contacts.map(contact =>
                <Contact key={contact.id} contact={contact}/>
              )

              }
            </React.Fragment>
          )
        }

        }
      </Consumer>
		)
	}
}

export default AddressBook;
