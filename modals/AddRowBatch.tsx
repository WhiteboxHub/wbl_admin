import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

interface batch {
  batchname: string;
  current: string;
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

interface AddRowModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: () => void;
}

const AddRowModal: React.FC<AddRowModalProps> = ({ isOpen, onRequestClose, onSave }) => {
  const [formData, setFormData] = useState<batch>({
    batchname: '',
    current: 'Y',
    orientationdate: '',
    subject: 'ML',
    startdate: '',
    enddate: '',
    exams: '',
    instructor1: '',
    instructor2: '',
    instructor3: '',
    topicscovered: '',
    topicsnotcovered: '',
    lastmoddatetime: '',
    batchid: '',
    courseid: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/batches/insert`, formData, {
        headers: { AuthToken: localStorage.getItem('token') },
      });
      onSave();
      onRequestClose();
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="modal-overlay">
      <h2 className="text-xl font-bold mb-4">Add New Batch</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Batch Name</label>
          <input
            type="text"
            name="batchname"
            onChange={handleChange}
            placeholder="Batch Name"
            className="border rounded-md p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Current</label>
          <select
            name="current"
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            defaultValue="Y"
          >
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Orientation Date</label>
          <input
            type="date"
            name="orientationdate"
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Subject</label>
          <select
            name="subject"
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            defaultValue="ML"
          >
            <option value="ML">Machine Learning</option>
            <option value="UI">User Interface</option>
            <option value="QA">Quality Assurance</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Start Date</label>
          <input
            type="date"
            name="startdate"
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">End Date</label>
          <input
            type="date"
            name="enddate"
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Exams</label>
          <input
            type="text"
            name="exams"
            onChange={handleChange}
            placeholder="Exams"
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Instructor 1</label>
          <input
            type="text"
            name="instructor1"
            onChange={handleChange}
            placeholder="Instructor 1"
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Instructor 2</label>
          <input
            type="text"
            name="instructor2"
            onChange={handleChange}
            placeholder="Instructor 2"
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Instructor 3</label>
          <input
            type="text"
            name="instructor3"
            onChange={handleChange}
            placeholder="Instructor 3"
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Topics Covered</label>
          <input
            type="text"
            name="topicscovered"
            onChange={handleChange}
            placeholder="Topics Covered"
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Topics Not Covered</label>
          <input
            type="text"
            name="topicsnotcovered"
            onChange={handleChange}
            placeholder="Topics Not Covered"
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Last Modified Date Time</label>
          <input
            type="datetime-local"
            name="lastmoddatetime"
            onChange={handleChange}
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Batch ID</label>
          <input
            type="text"
            name="batchid"
            onChange={handleChange}
            placeholder="Batch ID"
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Course ID</label>
          <input
            type="text"
            name="courseid"
            onChange={handleChange}
            placeholder="Course ID"
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="flex justify-between mt-4">
          <button type="button" onClick={onRequestClose} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddRowModal;
