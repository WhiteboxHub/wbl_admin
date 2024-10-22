





import React from 'react';
import Modal from 'react-modal';
import { Lead } from '../types/index'; // Adjust the import path accordingly

interface ViewRowModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  rowData: Lead | null;
}

const ViewRowModal: React.FC<ViewRowModalProps> = ({ isOpen, onRequestClose, rowData }) => {
  const customStyles: ReactModal.Styles = {
    content: {
      top: '15%',  // Position the modal at the top of the page
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, 0)',  // Center the modal horizontally
      overflowY: 'auto',  // Enable vertical scrolling
      maxHeight: '80vh',  // Set a max height for the modal
      width: '40%',  // Increase the horizontal size of the modal
      padding: '20px',  // Add padding to the modal content
    },
  };

  return (
    // <Modal
    //   isOpen={isOpen}
    //   onRequestClose={onRequestClose}
    //   style={customStyles}
    //   contentLabel="View Row Modal"
    // >
    //   <div className="modal-header">
    //     <h1 className="text-xl font-bold mb-4">Row Details</h1>

    //     {/* <button className="modal-close-button" onClick={onRequestClose}>&times;</button> */}
    //   </div>
    //   <div className="modal-body ">
    //     {rowData ? (
    //       <div className="grid grid-cols-2 gap-4">
    //         {Object.keys(rowData).map(key => (
    //           <div key={key} className="modal-field">
    //             <label htmlFor={key} className="font-bold">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</label>
    //             <p className="text-gray-700">{rowData[key as keyof Lead]}</p>
    //           </div>
    //         ))}
    //       </div>
    //     ) : (
    //       <p>No data available</p>
    //     )}
    //   </div>
    //   <div className="modal-actions flex justify-end mb-4">
    //   <button type="button" className="mb-4 flex items-center py-2 px-4 bg-red-600 text-white rounded-md transition duration-300 hover:bg-red-500" onClick={onRequestClose}>Close</button>
    //   </div>
    // </Modal>


<Modal
  isOpen={isOpen}
  onRequestClose={onRequestClose}
  style={customStyles}
  contentLabel="View Row Modal"
>
  <div className="modal-header flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold text-gray-800">Row Details</h1>
    <button className="text-2xl font-semibold hover:text-red-500 transition" onClick={onRequestClose}>
      &times;
    </button>
    {/* You can add a close button here if necessary */}
  </div>

  <div className="modal-body">
    {rowData ? (
      <div className="grid grid-cols-2 gap-6">
        {Object.keys(rowData).map((key) => (
          <div key={key} className="modal-field">
            <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <p className="text-gray-700 bg-gray-100 p-2 rounded-md">{rowData[key as keyof Lead] || 'N/A'}</p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-600">No data available</p>
    )}
  </div>

  <div className="modal-actions flex justify-end mt-6">
    <button
      type="button"
       className="mt-2 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
      onClick={onRequestClose}
    >
      Close
    </button>
  </div>
</Modal>




  );
};

export default ViewRowModal;
