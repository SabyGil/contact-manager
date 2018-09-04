import React, {
	Component
} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from "react-router-dom";
import {
	Provider
} from "./context";
import Header from './components/layout/Header';
import AddressBook from './components/contacts/AddressBook';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
	state = {}

	render() {
		return(
			<Provider>
				<Router>
					<div>
						<Header/>
							<div className="container">
							<Switch>
			          <Route exact path="/" component={AddContact} />
								<Route exact path="/allcontacts" component={AddressBook}/>
								<Route exact path="/editcontact/:id" component={EditContact}/>
								<Route
			            render={() => (
			              <div>
			                <h1 className="display-4">
			                  <span className="text-danger">404</span> Page Not Found
			                </h1>
			                <p className="lead">Sorry, that page does not exist</p>
			              </div>
			            )}
			          />
							</Switch>
						</div>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
