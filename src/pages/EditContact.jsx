import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const API_URL_BASE = "https://playground.4geeks.com/contact/";
const USER = "jsanchof";

export const EditContact = () => {
  const { id } = useParams();
  const { store, dispatch } = useGlobalReducer();

  const contact = store.contacts.find(contact => contact.id === Number(id));

  if (!contact) {
    return <div>Contact not found.</div>;
  }

  const [updatedContact, setUpdatedContact] = useState(contact);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContact({
      ...updatedContact,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    fetch(API_URL_BASE + "agendas/" + USER + "/contacts/" + Number(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedContact),
    })
      .then((response) => response.json())
      .then((data) => {

        if (!data || !data.id) {
          console.error("Error: API did not return a valid contact object.");
          return;
        }
      

        dispatch({
          type: "update_contact",
          payload: data,
        });
        navigate("/");
      })
      .catch((error) => console.error("Error updating contact:", error));
  };

  return (
    <div className="container">
      <h2>Edit Contact</h2>
      <form>
        <div className="form-group">
          <label htmlFor="inputName">Name</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            name="name"
            value={updatedContact.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPhone">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="inputPhone"
            name="phone"
            value={updatedContact.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputEmail">Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            name="email"
            value={updatedContact.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Address</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            name="address"
            value={updatedContact.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
