// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';

// interface AddRowModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   onSave: () => void;
// }

// const AddRowModal: React.FC<AddRowModalProps> = ({ isOpen, onRequestClose, onSave }) => {
//   const [formData, setFormData] = useState<{ [key: string]: string }>({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const API_URL = process.env.NEXT_PUBLIC_API_URL;
//       await axios.post(`${API_URL}/api/leads/insert`, formData, {
//         headers: { AuthToken: localStorage.getItem('token') },
//       });
//       onSave();
//       onRequestClose();
//     } catch (error) {
//       console.error('Error adding row:', error);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
//       <h2 className="text-xl font-bold mb-4">Add New Lead</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Name" onChange={handleChange} className="border rounded p-2 mb-4 w-full" required />
//         <input name="email" placeholder="Email" onChange={handleChange} className="border rounded p-2 mb-4 w-full" required />
//         <div className="flex justify-between">
//           <button type="button" onClick={onRequestClose} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Cancel</button>
//           <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add</button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default AddRowModal;



// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';

// interface AddRowModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   onSave: () => void;
// }

// const AddRowModal: React.FC<AddRowModalProps> = ({ isOpen, onRequestClose, onSave }) => {
//   const [formData, setFormData] = useState<{ [key: string]: unknown }>({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/insert`, formData, { headers: { AuthToken: localStorage.getItem('token') } });
//       onSave();
//       onRequestClose();
//     } catch (error) {
//       console.error('Error adding row:', error);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal">
//       <h2 className="text-xl font-bold">Add New Lead</h2>
//       <form onSubmit={handleSubmit} className="mt-4">
//         <input type="text" name="name" onChange={handleChange} placeholder="Lead Name" className="border rounded-md p-2 w-full" /> 

//         <input name="email" placeholder="Email" onChange={handleChange} className="border rounded p-2 mb-4 w-full" required />
//         <div className="flex justify-between">
//           <button type="button" onClick={onRequestClose} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Cancel</button>
//           <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add</button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default AddRowModal;





// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';
// import { Lead } from '../types/index'; // Adjust the import path accordingly

// // interface Lead {
//   name: string;
//   email: string;
//   // Add other fields as necessary
// }

// interface AddRowModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   onSave: () => void;
// }

// const AddRowModal: React.FC<AddRowModalProps> = ({ isOpen, onRequestClose, onSave }) => {
//   const [formData, setFormData] = useState<Lead>({ name: '', email: '' });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/insert`, formData, {
//         headers: { AuthToken: localStorage.getItem('token') },
//       });
//       onSave();
//       onRequestClose();
//     } catch (error) {
//       console.error('Error adding row:', error);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="modal-overlay">
//       <h2 className="text-xl font-bold mb-4">Add New Lead</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           onChange={handleChange}
//           placeholder="Lead Name"
//           className="border rounded-md p-2 w-full"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           onChange={handleChange}
//           placeholder="Email"
//           className="border rounded-md p-2 w-full"
//           required
//         />
//         {/* Add more fields as needed */}
//         <div className="flex justify-between mt-4">
//           <button type="button" onClick={onRequestClose} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
//             Cancel
//           </button>
//           <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
//             Add
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default AddRowModal;

// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';


// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';
// import { Lead } from '../types/index'; // Adjust the import path accordingly
// interface AddRowModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   onSave: () => void;
// }

// interface Candidate {
//   name: string;
//   email: string;
//   phone?: string;
//   address?: string;
//   // Add more fields as needed
// }

// const AddRowModal: React.FC<AddRowModalProps> = ({ isOpen, onRequestClose, onSave }) => {
//   const [formData, setFormData] = useState<Candidate>({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     // Initialize more fields here
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/candidates/insert`, formData, {
//         headers: { AuthToken: localStorage.getItem('token') },
//       });
//       onSave();
//       onRequestClose();
//     } catch (error) {
//       console.error('Error adding row:', error);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="modal-overlay">
//       <h2 className="text-xl font-bold mb-4">Add New Candidate</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="name"
//           onChange={handleChange}
//           placeholder="Candidate Name"
//           className="border rounded-md p-2 w-full"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           onChange={handleChange}
//           placeholder="Email"
//           className="border rounded-md p-2 w-full"
//           required
//         />
//         <input
//           type="text"
//           name="phone"
//           onChange={handleChange}
//           placeholder="Phone"
//           className="border rounded-md p-2 w-full"
//         />
//         <input
//           type="text"
//           name="address"
//           onChange={handleChange}
//           placeholder="Address"
//           className="border rounded-md p-2 w-full"
//         />
//         {/* Add more fields as needed */}
//         <div className="flex justify-between mt-4">
//           <button type="button" onClick={onRequestClose} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
//             Cancel
//           </button>
//           <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
//             Add
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default AddRowModal;


import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

interface AddRowModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: () => void;
}

interface Candidate {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  position: string;
  experience: number;
  education: string;
  skills: string;
  status: string;
  // Add more fields as per your table schema
}

const AddRowModal: React.FC<AddRowModalProps> = ({ isOpen, onRequestClose, onSave }) => {
  const [formData, setFormData] = useState<Candidate>({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    position: '',
    experience: 0,
    education: '',
    skills: '',
    status: '',
    // Initialize more fields here
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/candidates/insert`, formData, {
        headers: { AuthToken: localStorage.getItem('token') },
      });
      onSave();
      onRequestClose();
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="modal-overlay">
      <h2 className="text-xl font-bold mb-4">Add New Candidate</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Candidate Name"
          className="border rounded-md p-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
          className="border rounded-md p-2 w-full"
          required
        />
        <input
          type="text"
          name="phone"
          onChange={handleChange}
          placeholder="Phone"
          className="border rounded-md p-2 w-full"
        />
        <input
          type="text"
          name="address"
          onChange={handleChange}
          placeholder="Address"
          className="border rounded-md p-2 w-full"
        />
        <input
          type="date"
          name="dateOfBirth"
          onChange={handleChange}
          placeholder="Date of Birth"
          className="border rounded-md p-2 w-full"
        />
        <input
          type="text"
          name="position"
          onChange={handleChange}
          placeholder="Position"
          className="border rounded-md p-2 w-full"
        />
        <input
          type="number"
          name="experience"
          onChange={handleChange}
          placeholder="Experience (years)"
          className="border rounded-md p-2 w-full"
        />
        <input
          type="text"
          name="education"
          onChange={handleChange}
          placeholder="Education"
          className="border rounded-md p-2 w-full"
        />
        <input
          type="text"
          name="skills"
          onChange={handleChange}
          placeholder="Skills"
          className="border rounded-md p-2 w-full"
        />
        <input
          type="text"
          name="status"
          onChange={handleChange}
          placeholder="Status"
          className="border rounded-md p-2 w-full"
        />
        {/* Add more fields as needed */}
        <div className="flex justify-between mt-4">
          <button type="button" onClick={onRequestClose} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddRowModal;
