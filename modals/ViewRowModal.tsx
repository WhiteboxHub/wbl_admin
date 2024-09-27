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
//       <h2 className="text-xl font-bold mb-4">View Lead</h2>
//       {rowData ? (
//         <div>
//           {Object.entries(rowData).map(([key, value]) => (
//             <div key={key} className="mb-2">
//               <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {String(value)}
//             </div>
//           ))}
//           <div className="flex justify-end">
//             <button onClick={onRequestClose} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Close</button>
//           </div>
//         </div>
//       ) : (
//         <div>No data available.</div>
//       )}
//     </Modal>
//   );
// };

// export default ViewRowModal;



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
//         </button>
//       </div>
//     </div>
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
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <div className="modal-header">
        <h2 className="modal-title">Row Details</h2>
        <button className="modal-close-button" onClick={onRequestClose}>&times;</button>
      </div>
      <div className="modal-body">
        {rowData ? (
          <div>
            {Object.keys(rowData).map(key => (
              <div key={key} className="modal-field">
                <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</label>
                <div className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline">
                  {rowData[key as keyof Lead]}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
      <div className="modal-actions">
        <button type="button" className="cancel-button" onClick={onRequestClose}>Close</button>
      </div>
    </Modal>
  );
};

export default ViewRowModal;
