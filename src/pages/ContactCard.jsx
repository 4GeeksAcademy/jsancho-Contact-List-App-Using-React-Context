import React, { useRef, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";

const API_URL_BASE = "https://playground.4geeks.com/contact/";
const USER = "jsanchof";

const ContactCard = ({ contact }) => {
  const { store, dispatch } = useGlobalReducer();
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      new bootstrap.Modal(modalRef.current);
    }
  }, []);

  const handleDelete = () => {
    fetch(API_URL_BASE + "agendas/" + USER + "/contacts/" + contact.id, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("There was an error deleting the contact!");
        }
        return response.text();
      })
      .then(() => {
        const modalInstance = bootstrap.Modal.getInstance(modalRef.current);
        if (modalInstance) modalInstance.hide();

        dispatch({
          type: "get_contacts",
          payload: store.contacts.filter((c) => c.id !== contact.id),
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container row justify-content-between align-items-center m-1 contact-card">
      <div
        className="modal fade"
        id={`deleteModal-${contact.id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby={`deleteModalLabel-${contact.id}`}
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`deleteModalLabel-${contact.id}`}>
                Are you sure?
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              If you delete this thing, the entire universe will go down!
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Oh no!
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleDelete}>
                Yes baby!
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="col-2">
        <img src="https://picsum.photos/200" alt="Contact" className="contact-img" />
      </div>
      <div className="col-8">
        <div className="contact-info">
          <h4>{contact.name}</h4>
          <p className="text-muted">📍 {contact.address}</p>
          <p className="text-muted">📞 {contact.phone}</p>
          <p className="text-muted">✉️ {contact.email}</p>
        </div>
      </div>
      <div className="col-2">
        <div className="contact-actions">
          <Link to={`/edit-contact/${contact.id}`} 
          className="edit"
          style={{ textDecoration: "none" }}>
            ✏️
          </Link>
          <button className="delete"
            data-bs-toggle="modal"
            data-bs-target={`#deleteModal-${contact.id}`}
          >🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
