import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Candidate } from '../types/index'; // Adjust the import path accordingly

interface FormData {
  name: string;
  enrolleddate: string;
  email: string;
  course: string;
  phone: string;
  status: string;
  workstatus: string;
  education: string;
  workexperience: string;
  ssn: string;
  agreement: string;
  promissory: string;
  driverslicense: string;
  workpermit: string;
  wpexpirationdate: string;
  offerletter: string;
  secondaryemail: string;
  secondaryphone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  linkedin: string;
  dob: string;
  emergcontactname: string;
  emergcontactemail: string;
  emergcontactphone: string;
  emergcontactaddrs: string;
  guidelines: string;
  ssnvalidated: string;
  bgv: string;
  term: string;
  feepaid: string;
  feedue: string;
  salary0: string;
  salary6: string;
  salary12: string;
  guarantorname: string;
  guarantordesignation: string;
  guarantorcompany: string;
  contracturl: string;
  empagreementurl: string;
  offerletterurl: string;
  dlurl: string;
  workpermiturl: string;
  ssnurl: string;
  referralid: string;
  portalid: string;
  avatarid: string;
  notes: string;
  batchname: string;
  coverletter: string;
  background: string;
  recruiterassesment: string;
  instructorassesment: string;
  processflag: string;
  defaultprocessflag: string;
  originalresume: string;
  lastmoddatetime: string;
  statuschangedate: string;
  diceflag: string;
  batchid: string;
  emaillist: string;
}

interface AddRowCandidateProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: () => void;
}

const AddRowCandidate: React.FC<AddRowCandidateProps> = ({ isOpen, onRequestClose, onSave }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    enrolleddate: '',
    email: '',
    course: '',
    phone: '',
    status: '',
    workstatus: '',
    education: '',
    workexperience: '',
    ssn: '',
    agreement: '',
    promissory: '',
    driverslicense: '',
    workpermit: '',
    wpexpirationdate: '',
    offerletter: '',
    secondaryemail: '',
    secondaryphone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    linkedin: '',
    dob: '',
    emergcontactname: '',
    emergcontactemail: '',
    emergcontactphone: '',
    emergcontactaddrs: '',
    guidelines: '',
    ssnvalidated: '',
    bgv: '',
    term: '',
    feepaid: '',
    feedue: '',
    salary0: '',
    salary6: '',
    salary12: '',
    guarantorname: '',
    guarantordesignation: '',
    guarantorcompany: '',
    contracturl: '',
    empagreementurl: '',
    offerletterurl: '',
    dlurl: '',
    workpermiturl: '',
    ssnurl: '',
    referralid: '',
    portalid: '',
    avatarid: '',
    notes: '',
    batchname: '',
    coverletter: '',
    background: '',
    recruiterassesment: '',
    instructorassesment: '',
    processflag: '',
    defaultprocessflag: '',
    originalresume: '',
    lastmoddatetime: '',
    statuschangedate: '',
    diceflag: '',
    batchid: '',
    emaillist: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/candidates/insert`, formData, {
        headers: { AuthToken: localStorage.getItem('token') },
      });
      onSave();
      onRequestClose();
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: '15%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, 0)',
          overflowY: 'auto',
          maxHeight: '80vh',
          width: '40%',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className="modal-header flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Add New Candidate</h2>
        <button className="text-2xl font-semibold hover:text-red-500 transition" onClick={onRequestClose}>
          &times;
        </button>
      </div>

      <form onSubmit={handleSubmit} className="modal-body space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key} className="modal-field">
            <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key as keyof FormData]}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>
        ))}

        <div className="modal-actions flex justify-between mt-4">
          <button
            type="button"
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md transition duration-300 hover:bg-red-500"
            onClick={onRequestClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-500"
          >
            Add Candidate
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddRowCandidate;
