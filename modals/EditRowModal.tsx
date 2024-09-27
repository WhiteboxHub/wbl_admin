// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';

// interface EditRowModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   rowData: { [key: string]: unknown } | null;
//   onSave: () => void;
// }

// const EditRowModal: React.FC<EditRowModalProps> = ({ isOpen, onRequestClose, rowData, onSave }) => {
//   const [formData, setFormData] = useState<{ [key: string]: string }>({});

//   useEffect(() => {
//     if (rowData) {
//       setFormData(rowData as { [key: string]: string });
//     }
//   }, [rowData]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const API_URL = process.env.NEXT_PUBLIC_API_URL;
//       await axios.put(`${API_URL}/api/leads/update/${formData.leadid}`, formData, {
//         headers: { AuthToken: localStorage.getItem('token') },
//       });
//       onSave();
//       onRequestClose();
//     } catch (error) {
//       console.error('Error updating row:', error);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
//       <h2 className="text-xl font-bold mb-4">Edit Lead</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border rounded p-2 mb-4 w-full" required />
//         <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border rounded p-2 mb-4 w-full" required />
//         <div className="flex justify-between">
//           <button type="button" onClick={onRequestClose} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Cancel</button>
//           <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Update</button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default EditRowModal;


// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';

// interface EditRowModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   rowData: { [key: string]: unknown } | null;
//   onSave: () => void;
// }

// const EditRowModal: React.FC<EditRowModalProps> = ({ isOpen, onRequestClose, rowData, onSave }) => {
//   const [formData, setFormData] = useState<{ [key: string]: unknown }>({});

//   useEffect(() => {
//     if (rowData) {
//       setFormData(rowData);
//     }
//   }, [rowData]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/update/${formData.leadid}`, formData, { headers: { AuthToken: localStorage.getItem('token') } });
//       onSave();
//       onRequestClose();
//     } catch (error) {
//       console.error('Error updating row:', error);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
//       <h2 className="text-xl font-bold">Edit Lead</h2>
//       <form onSubmit={handleSubmit} className="mt-4">
//         <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Lead Name" className="border rounded-md p-2 w-full" />
//         {/* Add more fields as needed */}
//         <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">Update Lead</button>
//       </form>
//     </Modal>
//   );
// };

// export default EditRowModal;

// import React, { useEffect, useState } from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';
// import { Lead } from '../types/index'; // Adjust the import path accordingly

// // interface Lead {
// //   leadid: string;
// //   name: string;
// //   email: string;
// //   // Add other fields as necessary
// // }

// interface EditRowModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   rowData: Lead | null;
//   onSave: () => void;
// }

// const EditRowModal: React.FC<EditRowModalProps> = ({ isOpen, onRequestClose, rowData, onSave }) => {
//   const [formData, setFormData] = useState<Lead | null>(null);

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
//         await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/update/${formData.leadid}`, formData, {
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
//     <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="modal-overlay">
//       <h2 className="text-xl font-bold mb-4">Edit Lead</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           value={formData?.name || ''}
//           onChange={handleChange}
//           placeholder="Lead Name"
//           className="border rounded-md p-2 w-full"
//         />
//         <input
//           type="email"
//           name="email"
//           value={formData?.email || ''}
//           onChange={handleChange}
//           placeholder="Email"
//           className="border rounded-md p-2 w-full"
//         />
//         {/* Add more fields as needed */}
//         <div className="flex justify-between mt-4">
//           <button type="button" onClick={onRequestClose} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
//             Cancel
//           </button>
//           <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
//             Update Lead
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default EditRowModal;



import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Lead } from '../types/index'; // Adjust the import path accordingly

interface EditRowModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  rowData: Lead | null;
  onSave: () => void;
}

const EditRowModal: React.FC<EditRowModalProps> = ({ isOpen, onRequestClose, rowData, onSave }) => {
  const [formData, setFormData] = useState<Lead | null>(null);

  useEffect(() => {
    if (rowData) {
      setFormData(rowData);
    }
  }, [rowData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      try {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/update/${formData.leadid}`, formData, {
          headers: { AuthToken: localStorage.getItem('token') },
        });
        onSave();
        onRequestClose();
      } catch (error) {
        console.error('Error updating row:', error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="modal-overlay">
      <h2 className="text-xl font-bold mb-4">Edit Lead</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {formData && Object.keys(formData).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            value={formData[key as keyof Lead]}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="border rounded-md p-2 w-full"
          />
        ))}
        <div className="flex justify-between mt-4">
          <button type="button" onClick={onRequestClose} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Update Lead
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditRowModal;
