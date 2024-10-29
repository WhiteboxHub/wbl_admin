import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';

interface Url {
  id?: string;
  url?: string;
}

interface EditRowModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshData: () => void;
  initialData: Url;
}

const EditRowModal: React.FC<EditRowModalProps> = ({ isOpen, onClose, refreshData, initialData }) => {
  const [formData, setFormData] = useState<Url>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/url/${formData.id}`, formData);
      refreshData();
      onClose();
    } catch (error) {
      console.error('Error updating URL:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          top: '55%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          maxWidth: '400px',
          width: '90%',
          maxHeight: '80vh',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          overflowY: 'auto',
          fontFamily: 'Arial, sans-serif',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-2xl font-semibold text-red-500 hover:text-red-700 transition duration-200"
        >
          &times;
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 pr-8">Edit URL</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ID */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter ID"
            readOnly
          />
        </div>

        {/* URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">URL</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter URL"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-sm"
        >
          Save Changes
        </button>
      </form>
    </Modal>
  );
};

export default EditRowModal;
