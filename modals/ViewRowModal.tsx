// import React from 'react';
// import Modal from 'react-modal';

// interface ViewRowModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   rowData: { [key: string]: unknown } | null;
// }

// const ViewRowModal: React.FC<ViewRowModalProps> = ({ isOpen, onRequestClose, rowData }) => {
//   return (
//     <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
//       <h2 className="text-xl font-bold">View Lead</h2>
//       <div className="mt-4">
//         {rowData && Object.entries(rowData).map(([key, value]) => (
//           <div key={key} className="flex justify-between">
//             <span className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
//             <span>{value}</span>
//           </div>
//         ))}
//       </div>
//       <button onClick={onRequestClose} className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-md">Close</button>
//     </Modal>
//   );
// };

// export default ViewRowModal;


// modals/ViewRowModal.tsx
// import React from 'react';
// import { Lead } from '../types/index'; // Adjust the import path accordingly

// interface ViewRowModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   rowData: Lead | null; // Make sure rowData uses the Lead type
// }

// const ViewRowModal: React.FC<ViewRowModalProps> = ({ isOpen, onRequestClose, rowData }) => {
//   if (!isOpen || !rowData) return null; // Don't render if not open or no data

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="bg-white p-5 rounded shadow-lg">
//         <h2 className="text-lg font-semibold">View Lead</h2>
//         <div>
//           <p><strong>Name:</strong> {rowData.name}</p>
//           <p><strong>Email:</strong> {rowData.email}</p>
//           {/* Add other fields as necessary */}
//         </div>
//         <button onClick={onRequestClose} className="mt-4 bg-blue-500 text-white rounded p-2">
//           Close
//         </button>//       </div>
//     </div>
//   );
// };

// export default ViewRowModal;





// import React from 'react';
// import Modal from 'react-modal';
// import { Lead } from '../types/index'; // Adjust the import path accordingly

// interface ViewRowModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   rowData: Lead | null;
// }

// const ViewRowModal: React.FC<ViewRowModalProps> = ({ isOpen, onRequestClose, rowData }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       className="modal-content"
//       overlayClassName="modal-overlay"
//     >
//       <div className="modal-header">
//         <h2 className="modal-title">Row Details</h2>
//         <button className="modal-close-button" onClick={onRequestClose}>&times;</button>
//       </div>
//       <div className="modal-body">
//         {rowData ? (
//           <div>
//             {Object.keys(rowData).map(key => (
//               <div key={key} className="modal-field">
//                 <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</label>
//                 <div className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline">
//                   {rowData[key as keyof Lead]}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No data available</p>
//         )}
//       </div>
//       <div className="modal-actions">
//         <button type="button" className="cancel-button" onClick={onRequestClose}>Close</button>
//       </div>
//     </Modal>
//   );
// };

// export default ViewRowModal;






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

    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
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
      >
        <div className="relative">
          <button
            onClick={onRequestClose}
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
                    {rowData[key as keyof Lead] || 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No data available</p>
          )}
        </div>
      </Modal>
    );
};

export default ViewRowModal;
