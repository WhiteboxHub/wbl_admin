import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { User } from '../types/index'; // Adjust the import path accordingly

interface EditRowModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  rowData: User | null;
  onSave: () => void;
}

const UserEditRowModal: React.FC<EditRowModalProps> = ({ isOpen, onRequestClose, rowData, onSave }) => {
  const [formData, setFormData] = useState<User | null>(null);

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
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/update/${formData.id}`, formData, {
          headers: { AuthToken: localStorage.getItem('token') },
        });
        onSave();
        onRequestClose();
      } catch (error) {
        console.error('Error updating row:', error);
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
      <div className="relative">
        <button
          onClick={onRequestClose}
          className="absolute top-4 right-0 text-2xl font-semibold text-gray-500 hover:text-gray-800 transition duration-200"
        >
          &times;
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit User</h2>
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
              value={formData[key as keyof User]}
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>
        ))}

     
        <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 mb-4"  // Added mb-4
      >
        Save 
      </button>
      
      <button
        type="button"
        onClick={onRequestClose}
        className="mt-2 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
      >
        Cancel
      </button>
   
      </form>
    </Modal>
  );
};

export default UserEditRowModal;
