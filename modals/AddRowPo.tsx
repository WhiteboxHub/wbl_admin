import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';

interface PO {
  id?: string;
  placementid?: string;
  begindate?: string;
  enddate?: string;
  rate?: string;
  overtimerate?: string;
  freqtype?: string;
  frequency?: string;
  invoicestartdate?: string;
  invoicenet?: string;
  polink?: string;
  notes?: string;
}

interface AddRowModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshData: () => void;
}

const AddRowPo: React.FC<AddRowModalProps> = ({ isOpen, onClose, refreshData }) => {
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  const [formData, setFormData] = useState<PO>({
    id: '',
    placementid: '',
    begindate: currentDate, // Set default to current date
    enddate: '',
    rate: '',
    overtimerate: '',
    freqtype: '',
    frequency: '',
    invoicestartdate: '',
    invoicenet: '',
    polink: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/po/insert`, formData, {
        headers: { AuthToken: localStorage.getItem('token') },
      });

      // Here, use the newly created PO data for the refreshData
      const newPO = response.data; // assuming the API returns the new PO
      refreshData(); // Pass the new PO to be added
      onClose();
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
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
      <div className="">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-0 text-gray-500 hover:text-gray-800 transition duration-200"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New PO</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* PO ID */}
          <div>
            <label className="block text-gray-700">PO ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter PO ID"
            />
          </div>

          {/* Placement ID */}
          <div>
            <label className="block text-gray-700">Placement ID</label>
            <input
              type="text"
              name="placementid"
              value={formData.placementid}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Placement ID"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              name="begindate"
              value={formData.begindate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              name="enddate"
              value={formData.enddate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Rate */}
          <div>
            <label className="block text-gray-700">Rate</label>
            <input
              type="text"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter rate"
            />
          </div>

          {/* Overtime Rate */}
          <div>
            <label className="block text-gray-700">Overtime Rate</label>
            <input
              type="text"
              name="overtimerate"
              value={formData.overtimerate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter overtime rate"
            />
          </div>

          {/* Freq. Type */}
          <div>
            <label className="block text-gray-700">Freq. Type</label>
            <input
              type="text"
              name="freqtype"
              value={formData.freqtype}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter frequency type"
            />
          </div>

          {/* Invoice Frequency */}
          <div>
            <label className="block text-gray-700">Invoice Frequency</label>
            <input
              type="text"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter invoice frequency"
            />
          </div>

          {/* Invoice Start Date */}
          <div>
            <label className="block text-gray-700">Invoice Start Date</label>
            <input
              type="date"
              name="invoicestartdate"
              value={formData.invoicestartdate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Invoice Net */}
          <div>
            <label className="block text-gray-700">Invoice Net</label>
            <input
              type="text"
              name="invoicenet"
              value={formData.invoicenet}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter invoice net"
            />
          </div>

          {/* PO Url */}
          <div>
            <label className="block text-gray-700">PO Url</label>
            <input
              type="text"
              name="polink"
              value={formData.polink}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter PO URL"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700">Notes</label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter notes"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Save PO
          </button>

          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddRowPo;
