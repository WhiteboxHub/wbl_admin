import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';
import { Placement } from '../types/index';

interface AddRowModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshData: () => void;
}

const AddRowPlacement: React.FC<AddRowModalProps> = ({ isOpen, onClose, refreshData }) => {
  const [formData, setFormData] = useState<Placement>({
    id: '',
    startDate: '',
    endDate: '',
    status: '',
    masterAgreementId: '',
    otherAgreementsIds: [],
    paperwork: '',
    insurance: '',
    workLocation: '',
    workDesignation: '',
    workEmail: '',
    workPhone: '',
    mgrName: '',
    mgrEmail: '',
    mgrPhone: '',
    hiringMgrName: '',
    hiringMgrEmail: '',
    hiringMgrPhone: '',
    reference: '',
    ipEmailClear: false,
    projectDocs: [],
    feedbackId: '',
    lock: false,
    notes: '',
    projectName: '',
    projectDesc: '',
    candidateId: '',
    mmId: '',
    recruiterId: '',
    vendorId: '',
    vendor2Id: '',
    vendor3Id: '',
    clientId: '',
    lastModDateTime: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/placement/insert`, formData, {
        headers: { AuthToken: localStorage.getItem('token') },
      });
      refreshData();
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Placement</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Placement ID */}
          <div>
            <label className="block text-gray-700">Placement ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
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
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Status"
            />
          </div>

          {/* Master Agreement ID */}
          <div>
            <label className="block text-gray-700">Master Agreement ID</label>
            <input
              type="text"
              name="masterAgreementId"
              value={formData.masterAgreementId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Master Agreement ID"
            />
          </div>

          {/* Other Agreements IDs */}
          <div>
            <label className="block text-gray-700">Other Agreements IDs</label>
            <input
              type="text"
              name="otherAgreementsIds"
              value={formData.otherAgreementsIds.join(',')}
              onChange={(e) => setFormData({ ...formData, otherAgreementsIds: e.target.value.split(',') })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Other Agreements IDs (comma-separated)"
            />
          </div>

          {/* Paperwork */}
          <div>
            <label className="block text-gray-700">Paperwork</label>
            <input
              type="text"
              name="paperwork"
              value={formData.paperwork}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Paperwork"
            />
          </div>

          {/* Insurance */}
          <div>
            <label className="block text-gray-700">Insurance</label>
            <input
              type="text"
              name="insurance"
              value={formData.insurance}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Insurance"
            />
          </div>

          {/* Work Location */}
          <div>
            <label className="block text-gray-700">Work Location</label>
            <input
              type="text"
              name="workLocation"
              value={formData.workLocation}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Work Location"
            />
          </div>

          {/* Work Designation */}
          <div>
            <label className="block text-gray-700">Work Designation</label>
            <input
              type="text"
              name="workDesignation"
              value={formData.workDesignation}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Work Designation"
            />
          </div>

          {/* Work Email */}
          <div>
            <label className="block text-gray-700">Work Email</label>
            <input
              type="email"
              name="workEmail"
              value={formData.workEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Work Email"
            />
          </div>

          {/* Work Phone */}
          <div>
            <label className="block text-gray-700">Work Phone</label>
            <input
              type="text"
              name="workPhone"
              value={formData.workPhone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Work Phone"
            />
          </div>

          {/* Manager Name */}
          <div>
            <label className="block text-gray-700">Manager Name</label>
            <input
              type="text"
              name="mgrName"
              value={formData.mgrName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Manager Name"
            />
          </div>

          {/* Manager Email */}
          <div>
            <label className="block text-gray-700">Manager Email</label>
            <input
              type="email"
              name="mgrEmail"
              value={formData.mgrEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Manager Email"
            />
          </div>

          {/* Manager Phone */}
          <div>
            <label className="block text-gray-700">Manager Phone</label>
            <input
              type="text"
              name="mgrPhone"
              value={formData.mgrPhone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Manager Phone"
            />
          </div>

          {/* Hiring Manager Name */}
          <div>
            <label className="block text-gray-700">Hiring Manager Name</label>
            <input
              type="text"
              name="hiringMgrName"
              value={formData.hiringMgrName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Hiring Manager Name"
            />
          </div>

          {/* Hiring Manager Email */}
          <div>
            <label className="block text-gray-700">Hiring Manager Email</label>
            <input
              type="email"
              name="hiringMgrEmail"
              value={formData.hiringMgrEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Hiring Manager Email"
            />
          </div>

          {/* Hiring Manager Phone */}
          <div>
            <label className="block text-gray-700">Hiring Manager Phone</label>
            <input
              type="text"
              name="hiringMgrPhone"
              value={formData.hiringMgrPhone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Hiring Manager Phone"
            />
          </div>

          {/* Reference */}
          <div>
            <label className="block text-gray-700">Reference</label>
            <input
              type="text"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Reference"
            />
          </div>

          {/* IP Email Clear */}
          <div>
            <label className="block text-gray-700">IP Email Clear</label>
            <input
              type="checkbox"
              name="ipEmailClear"
              checked={formData.ipEmailClear}
              onChange={(e) => setFormData({ ...formData, ipEmailClear: e.target.checked })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Project Docs */}
          <div>
            <label className="block text-gray-700">Project Docs</label>
            <input
              type="text"
              name="projectDocs"
              value={formData.projectDocs.join(',')}
              onChange={(e) => setFormData({ ...formData, projectDocs: e.target.value.split(',') })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Project Docs (comma-separated)"
            />
          </div>

          {/* Feedback ID */}
          <div>
            <label className="block text-gray-700">Feedback ID</label>
            <input
              type="text"
              name="feedbackId"
              value={formData.feedbackId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Feedback ID"
            />
          </div>

          {/* Lock */}
          <div>
            <label className="block text-gray-700">Lock</label>
            <input
              type="checkbox"
              name="lock"
              checked={formData.lock}
              onChange={(e) => setFormData({ ...formData, lock: e.target.checked })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              placeholder="Enter Notes"
            />
          </div>

          {/* Project Name */}
          <div>
            <label className="block text-gray-700">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Project Name"
            />
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-gray-700">Project Description</label>
            <input
              type="text"
              name="projectDesc"
              value={formData.projectDesc}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Project Description"
            />
          </div>

          {/* Candidate ID */}
          <div>
            <label className="block text-gray-700">Candidate ID</label>
            <input
              type="text"
              name="candidateId"
              value={formData.candidateId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Candidate ID"
            />
          </div>

          {/* MM ID */}
          <div>
            <label className="block text-gray-700">MM ID</label>
            <input
              type="text"
              name="mmId"
              value={formData.mmId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter MM ID"
            />
          </div>

          {/* Recruiter ID */}
          <div>
            <label className="block text-gray-700">Recruiter ID</label>
            <input
              type="text"
              name="recruiterId"
              value={formData.recruiterId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Recruiter ID"
            />
          </div>

          {/* Vendor ID */}
          <div>
            <label className="block text-gray-700">Vendor ID</label>
            <input
              type="text"
              name="vendorId"
              value={formData.vendorId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Vendor ID"
            />
          </div>

          {/* Vendor 2 ID */}
          <div>
            <label className="block text-gray-700">Vendor 2 ID</label>
            <input
              type="text"
              name="vendor2Id"
              value={formData.vendor2Id || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Vendor 2 ID"
            />
          </div>

          {/* Vendor 3 ID */}
          <div>
            <label className="block text-gray-700">Vendor 3 ID</label>
            <input
              type="text"
              name="vendor3Id"
              value={formData.vendor3Id || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Vendor 3 ID"
            />
          </div>

          {/* Client ID */}
          <div>
            <label className="block text-gray-700">Client ID</label>
            <input
              type="text"
              name="clientId"
              value={formData.clientId}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter Client ID"
            />
          </div>

          {/* Last Modified DateTime */}
          <div>
            <label className="block text-gray-700">Last Modified DateTime</label>
            <input
              type="datetime-local"
              name="lastModDateTime"
              value={formData.lastModDateTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Save Placement
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

export default AddRowPlacement;
