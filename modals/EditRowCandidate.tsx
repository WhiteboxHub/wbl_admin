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
  const [formData, setFormData] = useState<Candidate | null>(null);

  useEffect(() => {
    if (rowData) {
      setFormData(rowData);
    }
  }, [rowData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      try {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/candidates/update/${formData.candidateid}`, formData, {
          headers: { AuthToken: localStorage.getItem('token') },
        });
        onSave();
        onRequestClose();
      } catch (error) {
        console.error('Error updating candidate:', error);
      }
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
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Candidate</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {formData && Object.keys(formData).map((key) => (
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
            type="button"
            onClick={onRequestClose}
            className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Update Candidate
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditRowCandidate;
