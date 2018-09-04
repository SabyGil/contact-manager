import axios from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com';

const api = {
	getUsers: () => {
		const url = baseURL + '/users';
		return axios.get(url);
	},
	deleteUser: (id) => {
		const url = `${baseURL}/users/${id}`;
		return axios.delete(url)
	},
	addUser: (user) => {
		const url = baseURL + '/users';
		return axios.post(url, user)
	},
	fillInUserInfo: (id) => {
		const url = `${baseURL}/users/${id}`;
		return axios.get(url)
	},
	editUser: (id, user) => {
		const url = `${baseURL}/users/${id}`;
		return axios.put(url, user);
	}
}

export default api;
