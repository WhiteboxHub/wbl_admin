import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Candidate } from '../types/index'; // Adjust the import path accordingly

interface EditRowCandidateProps {
  isOpen: boolean;
  onRequestClose: () => void;
  rowData: Candidate | null;
  onSave: () => void;
}

const EditRowCandidate: React.FC<EditRowCandidateProps> = ({ isOpen, onRequestClose, rowData, onSave }) => {
  const [formData, setFormData] = useState<Candidate>({
    candidateid: rowData.candidateid,
    name: rowData.name,
    enrolleddate: rowData.enrolleddate,
    email: rowData.email ,
    course: rowData.course ,
    phone: rowData.phone,
    status: rowData.status ,
    workstatus: rowData.workstatus,
    education: rowData.education,
    workexperience: rowData.workexperience,
    ssn: rowData.ssn ,
    agreement: rowData.agreement,
    promissory: rowData.promissory,
    driverslicense: rowData.driverslicense ,
    workpermit: rowData.workpermit,
    wpexpirationdate: rowData.wpexpirationdate ,
    offerletter: rowData.offerletter,
    secondaryemail: rowData.secondaryemail,
    secondaryphone: rowData.secondaryphone ,
    address: rowData.address ,
    city: rowData.city ,
    state: rowData.state ,
    country: rowData.country ,
    zip: rowData.zip,
    linkedin: rowData.linkedin,
    dob: rowData.dob ,
    emergcontactphone:rowData.emergcontactphone ,
    ssnvalidated: rowData.ssnvalidated,
    bgv: rowData.bgv ,
    term: rowData.term,
    feepaid: rowData.feepaid ,
    feedue: rowData.feedue,
    salary0: rowData.salary0,
    salary6: rowData.salary6,
    salary12: rowData.salary12 ,
    guarantorname: rowData.guarantorname ,
    guarantordesignation: rowData.guarantordesignation,
    guarantorcompany: rowData.guarantorcompany ,
    contracturl: rowData.contracturl ,
    empagreementurl: rowData.empagreementurl ,
    offerletterurl: rowData.offerletterurl ,
    workpermiturl: rowData.workpermiturl ,
    referralid: rowData.referralid ,
    portalid: rowData.portalid ,
    avatarid: rowData.avatarid ,
    notes: rowData.notes ,
 
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/candidates/update/${formData.candidateid}`, formData, {
        headers: { AuthToken: localStorage.getItem('token') },
      });
      onSave();
      onRequestClose();
    } catch (error) {
      console.error('Error updating candidate:', error);
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
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        },
      }}
    ><div className="relative">
    <button
    onClick={onRequestClose}
    className="absolute top-4 right-0 text-2xl font-semibold text-gray-500 hover:text-gray-800 transition duration-200">
    &times;</button>
    </div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Candidate</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {Object.keys(formData).map((key) => (
          <div key={key} className="modal-field">
            <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-2">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key as keyof Candidate]}
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>
        ))}

        <div className="flex justify-between items-center mt-6">
        <button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Save Lead
              </button>
    
              <button
                type="button"
                onClick={onRequestClose}
                className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                Cancel
              </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditRowCandidate;