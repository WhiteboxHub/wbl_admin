import React from 'react';
import Modal from 'react-modal';
import { Batch } from '../../types/index';
import { AiOutlineClose } from 'react-icons/ai'; // Adjust the import path accordingly

interface ViewRowModalProps {
  isOpen: boolean;
  onClose: () => void;
 // onRequestClose: () => void;
  rowData: Batch | null;
}

const ViewRowBatch: React.FC<ViewRowModalProps> = ({ isOpen, onClose, rowData }) => {
  // const customStyles = {
  //   content: {
  //     top: '15%',
  //     left: '50%',
  //     right: 'auto',
  //     bottom: 'auto',
  //     transform: 'translate(-50%, 0)',
  //     overflowY: 'auto',
  //     maxHeight: '80vh',
  //     width: '40%',
  //   },
  // };



  // -----------*******Existing code************----------------
  // return (
  //   <Modal
  //     isOpen={isOpen}
  //    // onRequestClose={onRequestClose} // Ensure this function is correctly defined in the parent
  //     //style={customStyles}
  //     style={{
  //       content: {
  //         top: '15%',
  //         left: '50%',
  //         right: 'auto',
  //         bottom: 'auto',
  //         transform: 'translate(-50%, 0)',
  //         overflowY: 'auto',
  //         maxHeight: '80vh',
  //         width: '40%',
  //         padding: '20px',
  //         borderRadius: '10px',
  //         boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  //       },
  //       overlay: {
  //         backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //       },
  //     }}
  //     contentLabel="View Row Modal"
  //     ariaHideApp={false} // Disable aria app for accessibility if needed
  //   >
     
  //     <div className="">
  //     <div className="relative">
  //     <button
  //       onClick={onClose}
  //       className="absolute top-4 right-0 text-gray-500 hover:text-gray-800 transition duration-200"
  //     >
  //       <AiOutlineClose size={24} />
  //     </button>
  //   </div>
  //       <h2 className="text-2xl font-semibold text-gray-800 mb-4">Row Details 
  //       </h2>
  //     </div>
  //     <div className="modal-body">
  //       {rowData ? (
  //         <div>
  //           {Object.keys(rowData).map(key => (
  //             <div key={key} className="modal-field">
  //               <label htmlFor={key}>
  //                 {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
  //               </label>
  //               <div className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline">
  //                 {rowData[key as keyof Batch]} {/* Correct type access */}
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       ) : (
  //         <p>No data available</p>
  //       )}
  //     </div>
  //     <div className="modal-actions">
  //     <button
  //     type="button"
  //     onClick={onClose}
  //     className="mt-2 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
  //   >
  //     Cancel
  //   </button>
  //     </div>
  //   </Modal>
  // );
// ---------************new code************----------------
return (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose} // Ensure this function is correctly defined in the parent
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
    contentLabel="View Row Modal"
    ariaHideApp={false} // Disable aria app for accessibility if needed
  >
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute top-0 right-0 text-2xl font-semibold text-red-500 hover:text-red-700 transition duration-200"
      >
        &times;
      </button>
    </div>
    <h2 className="text-2xl font-bold mb-6 text-gray-800 pr-8">Row Details</h2>

    <div className="modal-body">
      {rowData ? (
        <div className="space-y-4">
          {Object.keys(rowData).map((key) => (
            <div key={key} className="modal-field">
              <label htmlFor={key} className="block text-sm font-semibold text-gray-700 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              <p className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-50">
                {rowData[key as keyof Batch] || 'N/A'} {/* Correct type access */}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No data available</p>
      )}
    </div>
    <div className="modal-actions">
      <button
        type="button"
        onClick={onClose}
        className="mt-2 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
      >
        Cancel
      </button>
    </div>
  </Modal>
);

};

export default ViewRowBatch;