import React from 'react';
import { BatchData } from '../types/index'; // Adjust the import path accordingly

interface ViewRowModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  rowData: BatchData | null; // Ensure rowData uses the BatchData type
}

const ViewRowModal: React.FC<ViewRowModalProps> = ({ isOpen, onRequestClose, rowData }) => {
  if (!isOpen || !rowData) return null; // Don't render if not open or no data

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-lg font-semibold">View Batch Details</h2>
        <div className="mt-4">
          <div className="mb-2">
            <strong>Batch Name:</strong> {rowData.batchname}
          </div>
          <div className="mb-2">
            <strong>Current:</strong> {rowData.current ? 'Yes' : 'No'}
          </div>
          <div className="mb-2">
            <strong>Orientation Date:</strong> {rowData.orientationdate}
          </div>
          <div className="mb-2">
            <strong>Subject:</strong> {rowData.subject}
          </div>
          <div className="mb-2">
            <strong>Start Date:</strong> {rowData.startdate}
          </div>
          <div className="mb-2">
            <strong>End Date:</strong> {rowData.enddate}
          </div>
          <div className="mb-2">
            <strong>Exams:</strong> {rowData.exams}
          </div>
          <div className="mb-2">
            <strong>Instructor 1:</strong> {rowData.instructor1}
          </div>
          <div className="mb-2">
            <strong>Instructor 2:</strong> {rowData.instructor2}
          </div>
          <div className="mb-2">
            <strong>Instructor 3:</strong> {rowData.instructor3}
          </div>
          <div className="mb-2">
            <strong>Topics Covered:</strong> {rowData.topicscovered}
          </div>
          <div className="mb-2">
            <strong>Topics Not Covered:</strong> {rowData.topicsnotcovered}
          </div>
        </div>
        <button onClick={onRequestClose} className="mt-4 bg-blue-500 text-white rounded p-2">
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewRowModal;
