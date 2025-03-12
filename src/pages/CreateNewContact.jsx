import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer"; // Custom hook for accessing the global state.

import { Link } from "react-router-dom";
const API_URL_BASE = "https://playground.4geeks.com/contact/";
const USER = "jsanchof";

export const CreateNewContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const [inputValues, setInputValues] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (!inputValues.name.trim()) {
      setErrorMessage("Name is required.");
      return;
    }

    setErrorMessage("");

    let contact = {
      name: inputValues.name,
      phone: inputValues.phone,
      email: inputValues.email,
      address: inputValues.address,
    };

    fetch(API_URL_BASE + "agendas/" + USER + "/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("There was an error adding the contact!");
        }
        return response.json();
      })
      .then((data) => {
        dispatch({ type: "get_contacts", payload: data.contacts });

        setInputValues({
          name: "",
          phone: "",
          email: "",
          address: "",
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <form className="m-3">
        <div className="form-group">
          <label htmlFor="inputName">Name</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            name="name"
            placeholder="Contact Name"
            value={inputValues.name}
            onChange={handleChange}
          />
          {errorMessage && <small className="text-danger">{errorMessage}</small>}
          <small className="form-text text-muted">The name for the new contact.</small>
        </div>

        <div className="form-group">
          <label htmlFor="inputNumber">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="inputNumber"
            name="phone"
            placeholder="Enter Phone Number"
            value={inputValues.phone}
            onChange={handleChange}
          />
          <small className="form-text text-muted">The phone number for the new contact.</small>
        </div>

        <div className="form-group">
          <label htmlFor="inputEmail">Email Address</label>
          <input
            type="text"
            className="form-control"
            id="inputEmail"
            name="email"
            placeholder="Enter Email"
            value={inputValues.email}
            onChange={handleChange}
          />
          <small className="form-text text-muted">Email address for the contact.</small>
        </div>

        <div className="form-group">
          <label htmlFor="inputAddress">Address</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            name="address"
            placeholder="Enter Address"
            value={inputValues.address}
            onChange={handleChange}
          />
          <small className="form-text text-muted">The address of the contact.</small>
        </div>
        <div className="div d-grid gap-2">
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            Create
          </button>
        </div>
        <div className="ml-auto">
          <Link to="/">
            <small className="">or get back to contacts</small>
          </Link>
        </div>
      </form>
    </div>
  );
};
