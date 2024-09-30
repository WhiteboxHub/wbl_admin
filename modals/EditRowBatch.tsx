import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Batch } from '../types/index'; // Adjust the import path accordingly

interface BatchData {
  batchname: string;
  current: boolean;
  orientationdate: string;
  subject: string;
  startdate: string;
  enddate: string;
  exams: string;
  instructor1: string;
  instructor2: string;
  instructor3: string;
  topicscovered: string;
  topicsnotcovered: string;
  lastmoddatetime: string;
  batchid: string;
  courseid: string;
}

interface EditRowModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  rowData: BatchData | null;
  onSave: () => void;
}

const EditRowModal: React.FC<EditRowModalProps> = ({ isOpen, onRequestClose, rowData, onSave }) => {
  const [formData, setFormData] = useState<BatchData | null>(null);

  useEffect(() => {
    if (rowData) {
      setFormData(rowData);
    } else {
      setFormData(null); // Reset formData if rowData is null
    }
  }, [rowData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      const { name, type, value } = e.target;
      setFormData({ ...formData, [name]: type === 'checkbox' ? e.target.checked : value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL; // Ensure the API URL is set correctly
        await axios.put(`${API_URL}/api/batches/update/${formData.batchid}`, formData, {
          headers: { AuthToken: localStorage.getItem('token') },
        });
        onSave(); // Call the onSave callback to refresh data or handle post-update actions
        onRequestClose(); // Close the modal after saving
      } catch (error) {
        console.error('Error updating batch:', error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="modal-overlay">
      <h2 className="text-xl font-bold mb-4">Edit Batch</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="batchname"
          value={formData?.batchname || ''}
          onChange={handleChange}
          placeholder="Batch Name"
          className="border rounded-md p-2 w-full"
          required
        />
        <div className="flex items-center">
          <input
            type="checkbox"
            name="current"
            checked={formData?.current || false}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Current Batch</label>
        </div>
        <input
          type="date"
          name="orientationdate"
          value={formData?.orientationdate || ''}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
          required
        />
        <input
          type="text"
          name="subject"
          value={formData?.subject || ''}
          onChange={handleChange}
          placeholder="Subject"
          className="border rounded-md p-2 w-full"
          required
        />
        <input
          type="date"
          name="startdate"
          value={formData?.startdate || ''}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
          required
        />
        <input
          type="date"
          name="enddate"
          value={formData?.enddate || ''}
          onChange={handleChange}
          className="border rounded-md p-2 w-full"
          required
        />
        <input
          type="text"
          name="exams"
          value={formData?.exams || ''}
          onChange={handleChange}
          placeholder="Exams"
          className="border rounded-md p-2 w-full"
          required
        />
        <input
          type="text"
          name="instructor1"
          value={formData?.instructor1 || ''}
          onChange={handleChange}
          placeholder="Instructor 1"
          className="border rounded-md p-2 w-full"
          required
        />
        <input
          type="text"
          name="instructor2"
          value={formData?.instructor2 || ''}
          onChange={handleChange}
          placeholder="Instructor 2"
          className="border rounded-md p-2 w-full"
        />
        <input
          type="text"
          name="instructor3"
          value={formData?.instructor3 || ''}
          onChange={handleChange}
          placeholder="Instructor 3"
          className="border rounded-md p-2 w-full"
        />
        <input
          type="text"
          name="topicscovered"
          value={formData?.topicscovered || ''}
          onChange={handleChange}
          placeholder="Topics Covered"
          className="border rounded-md p-2 w-full"
          required
        />
        <input
          type="text"
          name="topicsnotcovered"
          value={formData?.topicsnotcovered || ''}
          onChange={handleChange}
          placeholder="Topics Not Covered"
          className="border rounded-md p-2 w-full"
        />
        <input
          type="text"
          name="lastmoddatetime"
          value={formData?.lastmoddatetime || ''}
          onChange={handleChange}
          placeholder="Last Modified Date/Time"
          className="border rounded-md p-2 w-full"
          required
        />
        <input
          type="hidden"
          name="batchid"
          value={formData?.batchid || ''}
        />
        <input
          type="hidden"
          name="courseid"
          value={formData?.courseid || ''}
        />
        <div className="flex justify-between mt-4">
          <button type="button" onClick={onRequestClose} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Update Batch
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditRowModal;
