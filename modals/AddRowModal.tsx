'use client'; 

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Modal from 'react-modal';
import '../styles/welcome.css'; // Ensure this path is correct

Modal.setAppElement('#__next'); // Use the root element for Next.js

interface AddRowModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: (data: FormData) => void;
}

interface FormData {
  name: string;
  startdate: string;
  phone: string;
  email: string;
  priority: string;
  workstatus: string;
  source: string;
  workexperience: string;
  sourcename: string;
  course: string;
  intent: string;
  attendedclass: string;
  siteaccess: string;
  assignedto: string;
  status: string;
  secondaryemail: string;
  secondaryphone: string;
  address: string;
  spousename: string;
  spouseemail: string;
  spousephone: string;
  spouseoccupationinfo: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  faq: string;
  callsmade: string;
  closedate: string;
  notes: string;
}

const AddRowModal: React.FC<AddRowModalProps> = ({ isOpen, onRequestClose, onSave }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    startdate: '',
    phone: '',
    email: '',
    priority: '',
    workstatus: '',
    source: '',
    workexperience: '',
    sourcename: '',
    course: '',
    intent: '',
    attendedclass: '',
    siteaccess: '',
    assignedto: '',
    status: '',
    secondaryemail: '',
    secondaryphone: '',
    address: '',
    spousename: '',
    spouseemail: '',
    spousephone: '',
    spouseoccupationinfo: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    faq: '',
    callsmade: '',
    closedate: '',
    notes: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2 className="modal-title">Add New Lead</h2>
        <button className="modal-close-button" onClick={onRequestClose}>&times;</button>
      </div>
      <form onSubmit={handleSubmit} className="modal-body">
        {Object.keys(formData).map((key) => (
          <div key={key} className="modal-field">
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key as keyof FormData]}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="modal-actions">
          <button type="button" className="cancel-button" onClick={onRequestClose}>Cancel</button>
          <button type="submit" className="save-button">Save</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddRowModal;




