// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import axios from 'axios';

// interface batch {
//   batchname: string;
//   current: string;
//   orientationdate: string;
//   subject: string;
//   startdate: string;
//   enddate: string;
//   exams: string;
//   instructor1: string;
//   instructor2: string;
//   instructor3: string;
//   topicscovered: string;
//   topicsnotcovered: string;
//   lastmoddatetime: string;
//   batchid: string;
//   courseid: string;
// }

// interface AddRowModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   onSave: () => void;
// }

// const AddRowModal: React.FC<AddRowModalProps> = ({ isOpen, onRequestClose, onSave }) => {
//   const [formData, setFormData] = useState<batch>({
//     batchname: '',
//     current: 'Y',
//     orientationdate: '',
//     subject: 'ML',
//     startdate: '',
//     enddate: '',
//     exams: '',
//     instructor1: '',
//     instructor2: '',
//     instructor3: '',
//     topicscovered: '',
//     topicsnotcovered: '',
//     lastmoddatetime: '',
//     batchid: '',
//     courseid: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/batches/insert`, formData, {
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
//       <h2 className="text-xl font-bold mb-4">Add New Batch</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1">Batch Name</label>
//           <input
//             type="text"
//             name="batchname"
//             onChange={handleChange}
//             placeholder="Batch Name"
//             className="border rounded-md p-2 w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Current</label>
//           <select
//             name="current"
//             onChange={handleChange}
//             className="border rounded-md p-2 w-full"
//             defaultValue="Y"
//           >
//             <option value="Y">Yes</option>
//             <option value="N">No</option>
//           </select>
//         </div>
//         <div>
//           <label className="block mb-1">Orientation Date</label>
//           <input
//             type="date"
//             name="orientationdate"
//             onChange={handleChange}
//             className="border rounded-md p-2 w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Subject</label>
//           <select
//             name="subject"
//             onChange={handleChange}
//             className="border rounded-md p-2 w-full"
//             defaultValue="ML"
//           >
//             <option value="ML">Machine Learning</option>
//             <option value="UI">User Interface</option>
//             <option value="QA">Quality Assurance</option>
//           </select>
//         </div>
//         <div>
//           <label className="block mb-1">Start Date</label>
//           <input
//             type="date"
//             name="startdate"
//             onChange={handleChange}
//             className="border rounded-md p-2 w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1">End Date</label>
//           <input
//             type="date"
//             name="enddate"
//             onChange={handleChange}
//             className="border rounded-md p-2 w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Exams</label>
//           <input
//             type="text"
//             name="exams"
//             onChange={handleChange}
//             placeholder="Exams"
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Instructor 1</label>
//           <input
//             type="text"
//             name="instructor1"
//             onChange={handleChange}
//             placeholder="Instructor 1"
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Instructor 2</label>
//           <input
//             type="text"
//             name="instructor2"
//             onChange={handleChange}
//             placeholder="Instructor 2"
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Instructor 3</label>
//           <input
//             type="text"
//             name="instructor3"
//             onChange={handleChange}
//             placeholder="Instructor 3"
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Topics Covered</label>
//           <input
//             type="text"
//             name="topicscovered"
//             onChange={handleChange}
//             placeholder="Topics Covered"
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Topics Not Covered</label>
//           <input
//             type="text"
//             name="topicsnotcovered"
//             onChange={handleChange}
//             placeholder="Topics Not Covered"
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Last Modified Date Time</label>
//           <input
//             type="datetime-local"
//             name="lastmoddatetime"
//             onChange={handleChange}
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Batch ID</label>
//           <input
//             type="text"
//             name="batchid"
//             onChange={handleChange}
//             placeholder="Batch ID"
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Course ID</label>
//           <input
//             type="text"
//             name="courseid"
//             onChange={handleChange}
//             placeholder="Course ID"
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
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

// interface Batch {
//   batchname?: string;
//   current?: string;
//   orientationdate?: string;
//   subject?: string;
//   startdate?: string;
//   enddate?: string;
//   exams?: string;
//   instructor1?: string;
//   instructor2?: string;
//   instructor3?: string;
//   topicscovered?: string;
//   topicsnotcovered?: string;
//   lastmoddatetime?: string;
//   batchid?: string;
//   courseid?: string;
// }

// interface AddRowModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   onSave: () => void;
// }

// const AddRowModal: React.FC<AddRowModalProps> = ({ isOpen, onRequestClose, onSave }) => {
//   const [formData, setFormData] = useState<Batch>({
//     batchname: '',
//     current: 'Y',
//     orientationdate: '',
//     subject: 'ML',
//     startdate: '',
//     enddate: '',
//     exams: '',
//     instructor1: '',
//     instructor2: '',
//     instructor3: '',
//     topicscovered: '',
//     topicsnotcovered: '',
//     lastmoddatetime: '',
//     batchid: '',
//     courseid: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/batches/insert`, formData, {
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
//       <h2 className="text-xl font-bold mb-4">Add New Batch</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1">Batch Name</label>
//           <input
//             type="text"
//             name="batchname"
//             onChange={handleChange}
//             placeholder="Batch Name"
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Current</label>
//           <select
//             name="current"
//             onChange={handleChange}
//             className="border rounded-md p-2 w-full"
//             defaultValue="Y"
//           >
//             <option value="Y">Yes</option>
//             <option value="N">No</option>
//           </select>
//         </div>
//         <div>
//           <label className="block mb-1">Orientation Date</label>
//           <input
//             type="date"
//             name="orientationdate"
//             onChange={handleChange}
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Subject</label>
//           <select
//             name="subject"
//             onChange={handleChange}
//             className="border rounded-md p-2 w-full"
//             defaultValue="ML"
//           >
//             <option value="ML">Machine Learning</option>
//             <option value="UI">User Interface</option>
//             <option value="QA">Quality Assurance</option>
//           </select>
//         </div>
//         <div>
//           <label className="block mb-1">Start Date</label>
//           <input
//             type="date"
//             name="startdate"
//             onChange={handleChange}
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">End Date</label>
//           <input
//             type="date"
//             name="enddate"
//             onChange={handleChange}
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Exams</label>
//           <input
//             type="text"
//             name="exams"
//             onChange={handleChange}
//             placeholder="Exams"
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Instructor 1</label>
//           <input
//             type="text"
//             name="instructor1"
//             onChange={handleChange}
//             placeholder="Instructor 1"
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Instructor 2</label>
//           <input
//             type="text"
//             name="instructor2"
//             onChange={handleChange}
//             placeholder="Instructor 2"
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Instructor 3</label>
//           <input
//             type="text"
//             name="instructor3"
//             onChange={handleChange}
//             placeholder="Instructor 3"
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Topics Covered</label>
//           <input
//             type="text"
//             name="topicscovered"
//             onChange={handleChange}
//             placeholder="Topics Covered"
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Topics Not Covered</label>
//           <input
//             type="text"
//             name="topicsnotcovered"
//             onChange={handleChange}
//             placeholder="Topics Not Covered"
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Last Modified Date Time</label>
//           <input
//             type="datetime-local"
//             name="lastmoddatetime"
//             onChange={handleChange}
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Batch ID</label>
//           <input
//             type="text"
//             name="batchid"
//             onChange={handleChange}
//             placeholder="Batch ID"
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Course ID</label>
//           <input
//             type="text"
//             name="courseid"
//             onChange={handleChange}
//             placeholder="Course ID"
//             className="border rounded-md p-2 w-full"
//           />
//         </div>
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
import { AiOutlineClose } from 'react-icons/ai';

interface Batch {
  batchname?: string;
  current?: string;
  orientationdate?: string;
  subject?: string;
  startdate?: string;
  enddate?: string;
  exams?: string;
  instructor1?: string;
  instructor2?: string;
  instructor3?: string;
  topicscovered?: string;
  topicsnotcovered?: string;
  lastmoddatetime?: string;
  batchid?: string;
  courseid?: string;
}

interface AddRowModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshData: () => void;
}

const AddRowModal: React.FC<AddRowModalProps> = ({ isOpen, onClose, refreshData }) => {
  const [formData, setFormData] = useState<Batch>({
    batchname: '',
    current: 'Y',
    orientationdate: '',
    subject: 'ML',
    startdate: '',
    enddate: '',
    exams: '',
    instructor1: '',
    instructor2: '',
    instructor3: '',
    topicscovered: '',
    topicsnotcovered: '',
    lastmoddatetime: '',
    batchid: '',
    courseid: '',
  });

  const customStyles = {
    content: {
      top: '15%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, 0)',
      overflowY: 'auto',
      maxHeight: '80vh',
      width: '40%', // Set a max height for the modal
    },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/batches/insert`, formData, {
        headers: { AuthToken: localStorage.getItem('token') },
      });
      refreshData();
      onClose();
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Add Batch Modal"
    >
      <div className="">
      <div className="relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-0 text-gray-500 hover:text-gray-800 transition duration-200"
      >
        <AiOutlineClose size={24} />
      </button>
    </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Batch</h2>
   
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Batch Name */}
          <div>
            <label className="block text-gray-700">Batch Name</label>
            <input
              type="text"
              name="batchname"
              value={formData.batchname}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter batch name"
            />
          </div>

          {/* Current */}
          <div>
            <label className="block text-gray-700">Current</label>
            <input
              type="text"
              name="current"
              value={formData.current}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter current status"
            />
          </div>

          {/* Orientation Date */}
          <div>
            <label className="block text-gray-700">Orientation Date</label>
            <input
              type="date"
              name="orientationdate"
              value={formData.orientationdate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter subject"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              name="startdate"
              value={formData.startdate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              name="enddate"
              value={formData.enddate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Exams */}
          <div>
            <label className="block text-gray-700">Exams</label>
            <input
              type="text"
              name="exams"
              value={formData.exams}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter exams info"
            />
          </div>

          {/* Instructor 1 */}
          <div>
            <label className="block text-gray-700">Instructor 1</label>
            <input
              type="text"
              name="instructor1"
              value={formData.instructor1}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter instructor 1 name"
            />
          </div>

          {/* Instructor 2 */}
          <div>
            <label className="block text-gray-700">Instructor 2</label>
            <input
              type="text"
              name="instructor2"
              value={formData.instructor2}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter instructor 2 name"
            />
          </div>

          {/* Instructor 3 */}
          <div>
            <label className="block text-gray-700">Instructor 3</label>
            <input
              type="text"
              name="instructor3"
              value={formData.instructor3}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter instructor 3 name"
            />
          </div>

          {/* Topics Covered */}
          <div>
            <label className="block text-gray-700">Topics Covered</label>
            <input
              type="text"
              name="topicscovered"
              value={formData.topicscovered}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter topics covered"
            />
          </div>

          {/* Topics Not Covered */}
          <div>
            <label className="block text-gray-700">Topics Not Covered</label>
            <input
              type="text"
              name="topicsnotcovered"
              value={formData.topicsnotcovered}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter topics not covered"
            />
          </div>

          {/* Last Modification Date */}
          <div>
            <label className="block text-gray-700">Last Modification Date</label>
            <input
              type="date"
              name="lastmoddatetime"
              value={formData.lastmoddatetime}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Batch ID */}
          <div>
            <label className="block text-gray-700">Batch ID</label>
            <input
              type="text"
              name="batchid"
              value={formData.batchid}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter batch ID"
            />
          </div>

          {/* Course ID */}
          <div>
            <label className="block text-gray-700">Course ID</label>
            <input
              type="text"
              name="courseid"
              value={formData.courseid}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter course ID"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Save Batch
          </button>

          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddRowModal;

