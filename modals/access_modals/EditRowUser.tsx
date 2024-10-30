// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';
// import { User } from '../types/index'; // Adjust the import path accordingly

// interface EditRowModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   rowData: User | null;
//   onSave: () => void;
// }

// const UserEditRowModal: React.FC<EditRowModalProps> = ({ isOpen, onRequestClose, rowData, onSave }) => {
//   const [formData, setFormData] = useState<User | null>(null);

//   useEffect(() => {
//     if (rowData) {
//       setFormData(rowData);
//     }
//   }, [rowData]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (formData) {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (formData) {
//       try {
//         await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/update/${formData.id}`, formData, {
//           headers: { AuthToken: localStorage.getItem('token') },
//         });
//         onSave();
//         onRequestClose();
//       } catch (error) {
//         console.error('Error updating row:', error);
//       }
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       style={{
//         content: {
//           top: '15%',
//           left: '50%',
//           right: 'auto',
//           bottom: 'auto',
//           transform: 'translate(-50%, 0)',
//           overflowY: 'auto',
//           maxHeight: '80vh',
//           width: '40%',
//           padding: '20px',
//           borderRadius: '10px',
//           boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
//         },
//         overlay: {
//           backgroundColor: 'rgba(0, 0, 0, 0.4)',
//         },
//       }}
//     >
//       <div className="relative">
//         <button
//           onClick={onRequestClose}
//           className="absolute top-4 right-0 text-2xl font-semibold text-gray-500 hover:text-gray-800 transition duration-200"
//         >
//           &times;
//         </button>
//       </div>
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit User</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {formData && Object.keys(formData).map((key) => (
//           <div key={key} className="modal-field">
//             <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-2">
//               {key.charAt(0).toUpperCase() + key.slice(1)}
//             </label>
//             <input
//               type="text"
//               id={key}
//               name={key}
//               value={formData[key as keyof User]}
//               onChange={handleChange}
//               placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//               className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//             />
//           </div>
//         ))}

     
//         <button
//         type="submit"
//         className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 mb-4"  // Added mb-4
//       >
//         Save 
//       </button>
      
//       <button
//         type="button"
//         onClick={onRequestClose}
//         className="mt-2 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
//       >
//         Cancel
//       </button>
   
//       </form>
//     </Modal>
//   );
// };

// export default UserEditRowModal;

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { User } from '@/types';
// import  User  from '../types/index'; // Adjust the import path accordingly

interface EditRowModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  rowData: User | null;
  onSave: () => void;
}

const UserEditRowModal: React.FC<EditRowModalProps> = ({ isOpen, onRequestClose, rowData, onSave }) => {
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    if (rowData) {
      setFormData({
        ...rowData,
        level: rowData.level || '3', // Default level to '3'
        instructor: rowData.instructor || 'N', // Default instructor to 'N'
        override: rowData.override || 'N', // Default override to 'N'
        status: rowData.status || 'inactive', // Default status to 'inactive'
        level3date: rowData.level3date || new Date().toISOString().split('T')[0], // Default to current date
      });
    }
  }, [rowData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      try {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/update/${formData.id}`, formData, {
          headers: { AuthToken: localStorage.getItem('token') },
        });
        onSave();
        onRequestClose();
      } catch (error) {
        console.error('Error updating row:', error);
      }
    }
  };

  // return (
  //   <Modal
  //     isOpen={isOpen}
  //     onRequestClose={onRequestClose}
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
  //         boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  //       },
  //       overlay: {
  //         backgroundColor: 'rgba(0, 0, 0, 0.4)',
  //       },
  //     }}
  //   >
  //     <div className="relative">
  //       <button
  //         onClick={onRequestClose}
  //         className="absolute top-4 right-0 text-2xl font-semibold text-gray-500 hover:text-gray-800 transition duration-200"
  //       >
  //         &times;
  //       </button>
  //     </div>
  //     <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit User</h2>
  //     <form onSubmit={handleSubmit} className="space-y-6">
  //       {formData && (
  //         <>
  //           <div className="modal-field">
  //             <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-2">
  //               Level
  //             </label>
  //             <select
  //               id="level"
  //               name="level"
  //               value={formData.level}
  //               onChange={handleChange}
  //               className="border border-gray-300 rounded-md p-2 w-full"
  //             >
  //               <option value="1">1</option>
  //               <option value="2">2</option>
  //               <option value="3">3</option>
  //             </select>
  //           </div>

  //           <div className="modal-field">
  //             <label htmlFor="instructor" className="block text-sm font-medium text-gray-700 mb-2">
  //               Instructor
  //             </label>
  //             <select
  //               id="instructor"
  //               name="instructor"
  //               value={formData.instructor}
  //               onChange={handleChange}
  //               className="border border-gray-300 rounded-md p-2 w-full"
  //             >
  //               <option value="Y">Yes</option>
  //               <option value="N">No</option>
  //             </select>
  //           </div>

  //           <div className="modal-field">
  //             <label htmlFor="override" className="block text-sm font-medium text-gray-700 mb-2">
  //               Override
  //             </label>
  //             <select
  //               id="override"
  //               name="override"
  //               value={formData.override}
  //               onChange={handleChange}
  //               className="border border-gray-300 rounded-md p-2 w-full"
  //             >
  //               <option value="Y">Yes</option>
  //               <option value="N">No</option>
  //             </select>
  //           </div>

  //           <div className="modal-field">
  //             <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
  //               Status
  //             </label>
  //             <select
  //               id="status"
  //               name="status"
  //               value={formData.status}
  //               onChange={handleChange}
  //               className="border border-gray-300 rounded-md p-2 w-full"
  //             >
  //               <option value="active">Active</option>
  //               <option value="inactive">Inactive</option>
  //             </select>
  //           </div>

  //           <div className="modal-field">
  //             <label htmlFor="level3date" className="block text-sm font-medium text-gray-700 mb-2">
  //               Level 3 Date
  //             </label>
  //             <input
  //               type="date"
  //               id="level3date"
  //               name="level3date"
  //               value={formData.level3date}
  //               onChange={handleChange}
  //               className="border border-gray-300 rounded-md p-2 w-full"
  //             />
  //           </div>
  //         </>
  //       )}

  //       <button
  //         type="submit"
  //         className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 mb-4"
  //       >
  //         Save
  //       </button>

  //       <button
  //         type="button"
  //         onClick={onRequestClose}
  //         className="mt-2 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
  //       >
  //         Cancel
  //       </button>
  //     </form>
  //   </Modal>
  // );

  // return (
  //   <Modal
  //     isOpen={isOpen}
  //     onRequestClose={onRequestClose}
  //     style={{
  //       content: {
  //         top: '50%',
  //         left: '50%',
  //         right: 'auto',
  //         bottom: 'auto',
  //         transform: 'translate(-50%, -50%)',
  //         maxWidth: '400px',
  //         width: '90%',
  //         maxHeight: '80vh',  // Ensures the modal doesn't take up the entire height
  //         padding: '16px',
  //         borderRadius: '12px',
  //         boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  //         overflow: 'hidden', // Necessary to manage overflow inside the modal
  //         fontFamily: 'Arial, sans-serif',
  //       },
  //       overlay: {
  //         backgroundColor: 'rgba(0, 0, 0, 0.5)',
  //       },
  //     }}
  //   >
  //     <div className="relative">
  //       <button
  //         onClick={onRequestClose}
  //         className="absolute top-0 right-0 text-2xl font-semibold text-red-500 hover:text-red-700 transition duration-200"
  //       >
  //         &times;
  //       </button>
  //       <h2 className="text-xl font-bold mb-4 text-gray-800 pr-8">Edit User</h2>
  //     </div>
  
  //     {/* Scrollable form */}
  //     <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 64px)' }}>
  //       <form onSubmit={handleSubmit} className="space-y-6">
  //         {formData && (
  //           <>
  //             <div className="modal-field">
  //               <label htmlFor="level" className="block text-sm font-semibold text-gray-700 mb-1">
  //                 Level
  //               </label>
  //               <select
  //                 id="level"
  //                 name="level"
  //                 value={formData.level}
  //                 onChange={handleChange}
  //                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
  //               >
  //                 <option value="1">1</option>
  //                 <option value="2">2</option>
  //                 <option value="3">3</option>
  //               </select>
  //             </div>
  
  //             <div className="modal-field">
  //               <label htmlFor="instructor" className="block text-sm font-semibold text-gray-700 mb-1">
  //                 Instructor
  //               </label>
  //               <select
  //                 id="instructor"
  //                 name="instructor"
  //                 value={formData.instructor}
  //                 onChange={handleChange}
  //                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
  //               >
  //                 <option value="Y">Yes</option>
  //                 <option value="N">No</option>
  //               </select>
  //             </div>
  
  //             <div className="modal-field">
  //               <label htmlFor="override" className="block text-sm font-semibold text-gray-700 mb-1">
  //                 Override
  //               </label>
  //               <select
  //                 id="override"
  //                 name="override"
  //                 value={formData.override}
  //                 onChange={handleChange}
  //                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
  //               >
  //                 <option value="Y">Yes</option>
  //                 <option value="N">No</option>
  //               </select>
  //             </div>
  
  //             <div className="modal-field">
  //               <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-1">
  //                 Status
  //               </label>
  //               <select
  //                 id="status"
  //                 name="status"
  //                 value={formData.status}
  //                 onChange={handleChange}
  //                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
  //               >
  //                 <option value="active">Active</option>
  //                 <option value="inactive">Inactive</option>
  //               </select>
  //             </div>
  
  //             <div className="modal-field">
  //               <label htmlFor="level3date" className="block text-sm font-semibold text-gray-700 mb-1">
  //                 Level 3 Date
  //               </label>
  //               <input
  //                 type="date"
  //                 id="level3date"
  //                 name="level3date"
  //                 value={formData.level3date}
  //                 onChange={handleChange}
  //                 className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
  //               />
  //             </div>
  //           </>
  //         )}
  
  //         <button
  //           type="submit"
  //           className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-sm"
  //         >
  //           Save
  //         </button>
  //       </form>
  //     </div>
  //   </Modal>
  // );
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          maxWidth: '450px',  // Adjusted width for better spacing
          width: '90%',
          maxHeight: '80vh',  // Keeps the modal from expanding too much
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
          fontFamily: 'Arial, sans-serif',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className="relative">
        <button
          onClick={onRequestClose}
          className="absolute top-0 right-0 text-2xl font-semibold text-red-500 hover:text-red-700 transition duration-200"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-6 text-gray-800 pr-8">Edit User</h2>
      </div>
  
      {/* Scrollable form */}
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 80px)' }}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {formData && (
            <>
              <div className="modal-field">
                <label htmlFor="level" className="block text-sm font-semibold text-gray-700 mb-2">
                  Level
                </label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
  
              <div className="modal-field">
                <label htmlFor="instructor" className="block text-sm font-semibold text-gray-700 mb-2">
                  Instructor
                </label>
                <select
                  id="instructor"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                >
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </select>
              </div>
  
              <div className="modal-field">
                <label htmlFor="override" className="block text-sm font-semibold text-gray-700 mb-2">
                  Override
                </label>
                <select
                  id="override"
                  name="override"
                  value={formData.override}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                >
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </select>
              </div>
  
              <div className="modal-field">
                <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
  
              <div className="modal-field">
                <label htmlFor="level3date" className="block text-sm font-semibold text-gray-700 mb-2">
                  Level 3 Date
                </label>
                <input
                  type="date"
                  id="level3date"
                  name="level3date"
                  value={formData.level3date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                />
              </div>
            </>
          )}
  
          {/* Save button with proper spacing */}
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-sm px-4"
            style={{ padding: '12px 16px', marginTop: '16px' }}
          >
            Save
          </button>
        </form>
      </div>
    </Modal>
  );
  
};

export default UserEditRowModal;
