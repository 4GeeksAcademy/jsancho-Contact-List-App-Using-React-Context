import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "./ContactCard.jsx";
import NoContacts from "./NoContacts.jsx";

import { useState, useEffect } from "react";

const API_URL_BASE = "https://playground.4geeks.com/contact/";
const USER = "jsanchof"

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		fetch(API_URL_BASE + 'agendas/' + USER + '/contacts')
			.then((response) => {
				if (!response.ok) {
					throw new Error("There was an error importing the contacts!");
				}
				return response.json();
			})
			.then((data) => {
				dispatch({ type: 'get_contacts', payload: data.contacts });
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<div className="container contact-list">
			{store.contacts && store.contacts.length > 0 ? (
				store.contacts.map((contact) => <ContactCard key={contact.id} contact={contact} />)
			) : (
				<NoContacts />
			)}
		</div>
	);
};

