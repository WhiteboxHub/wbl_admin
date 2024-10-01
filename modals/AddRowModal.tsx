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
``
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
import { Lead } from '../types/index'; // Adjust the import path accordingly

interface FormData {
  name: string;
  startdate: string;
  phone: string;
  email: string;
  priority: string;
  workstatus: string;
  source: string;
  workexperience: string;
  sourcename: string;
  course: string;
  intent: string;
  attendedclass: string;
  siteaccess: string;
  assignedto: string;
  status: string;
  secondaryemail: string;
  secondaryphone: string;
  address: string;
  spousename: string;
  spouseemail: string;
  spousephone: string;
  spouseoccupationinfo: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  faq: string;
  callsmade: string;
  closedate: string;
  notes: string;
}

interface AddRowModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: () => void;
}

const AddRowModal: React.FC<AddRowModalProps> = ({ isOpen, onRequestClose, onSave }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    startdate: '',
    phone: '',
    email: '',
    priority: '',
    workstatus: '',
    source: '',
    workexperience: '',
    sourcename: '',
    course: '',
    intent: '',
    attendedclass: '',
    siteaccess: '',
    assignedto: '',
    status: '',
    secondaryemail: '',
    secondaryphone: '',
    address: '',
    spousename: '',
    spouseemail: '',
    spousephone: '',
    spouseoccupationinfo: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    faq: '',
    callsmade: '',
    closedate: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/leads/insert`, formData, {
        headers: { AuthToken: localStorage.getItem('token') },
      });
      onSave();
      onRequestClose();
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };



  const customStyles: ReactModal.Styles = {
    content: {
      top: '13%',  // Position the modal at the top of the page
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, 0)',  // Center the modal horizontally
      overflowY: 'auto',  // Enable vertical scrolling
      maxHeight: '80vh',  // Set a max height for the modal
      width: '20%',  // Increase the horizontal size of the modal
      padding: '20px',  // Add padding to the modal content
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      // className="modal-content"
      // overlayClassName="modal-overlay"
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
        },
      }}

    >
      <div className="modal-header">
        <h2 className="text-xl font-bold mb-4" >Add New Lead</h2>
        {/* <button className="modal-close-button" onClick={onRequestClose}>&times;</button> */}
      </div>
      <form onSubmit={handleSubmit} className="modal-body">
        {Object.keys(formData).map((key) => (
          <div key={key} className="modal-field">
            <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              id={key}
              name={key}
              value={formData[key as keyof FormData]}
              onChange={handleChange}
              className="border rounded-md p-2 "
            />
          </div>
        ))}
      <div className="modal-actions flex justify-between">
  <button type="button" className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md transition duration-300 hover:bg-red-500" onClick={onRequestClose}>Cancel</button>
  <button type="submit" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-500">Add Lead</button>
</div>
      </form>
    </Modal>
  );
};

export default AddRowModal;