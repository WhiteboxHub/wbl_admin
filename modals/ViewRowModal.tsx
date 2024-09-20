import React from 'react';
import Modal from 'react-modal';

// Define the types for props
interface ViewRowModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  rowData: Record<string, any> | null; // Use Record<string, any> for dynamic keys
}

const ViewRowModal: React.FC<ViewRowModalProps> = ({ isOpen, onRequestClose, rowData }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="View Row Details"
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg flex flex-col max-h-[90vh]">
        <header className="border-b border-gray-200 pb-4 mb-4">
          <h1 className="text-2xl font-bold italic text-black">Row Details</h1>
        </header>
        <div className="flex-1 overflow-auto mb-4">
          {rowData ? (
            <div>
              {Object.keys(rowData).map(key => (
                <div key={key} className="mb-2 text-black">
                  <strong className="font-semibold capitalize">{key}:</strong> {rowData[key]}
                </div>
              ))}
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
        <footer className="border-t border-gray-200 pt-4">
          <button
            onClick={onRequestClose}
            className="bg-blue-500 hover:bg-blue-700 text-black font-bold w-full py-2 px-4 rounded"
          >
            <b>Close</b>
          </button>
        </footer>
      </div>
    </Modal>
  );
};

export default ViewRowModal;
