// import React, { useState, useEffect, ChangeEvent } from 'react';

// // Define the types for props
// interface EditRowModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   rowData: Record<string, any> | null; // Use Record<string, any> to allow for dynamic keys
//   onSave: (data: Record<string, any>) => void;
// }

// // Define the type for form data
// type FormData = Record<string, any>;

// const EditRowModal: React.FC<EditRowModalProps> = ({ isOpen, onRequestClose, rowData, onSave }) => {
//   const [formData, setFormData] = useState<FormData>({});

//   useEffect(() => {
//     if (rowData) {
//       setFormData({ ...rowData });
//     }
//   }, [rowData]);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSave = () => {
//     console.log('FormData on save:', formData); // Debugging line
//     if (formData.leadid) { // Check if formData contains the leadid
//       onSave(formData); // Pass the entire formData which includes leadid
//       onRequestClose();
//     } else {
//       console.error('No leadid found in formData');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       {/* Background overlay */}
//       <div className="fixed inset-0 bg-gray-800 opacity-50"></div>

//       {/* Modal content with scrollable container */}
//       <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-10 max-h-full overflow-y-auto">
//         <h2 className="text-2xl font-bold mb-4">Edit Row</h2>
        
//         {/* Scrollable form */}
//         <div className="space-y-4 max-h-96 overflow-y-auto">
//           {Object.keys(formData).map((key) => (
//             <div key={key}>
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
//                 {key.charAt(0).toUpperCase() + key.slice(1)}
//               </label>
//               <input
//                 type="text"
//                 name={key}
//                 value={formData[key] || ''}
//                 onChange={handleChange}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-end mt-4">
//           <button
//             onClick={onRequestClose}
//             className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditRowModal;





import React, { useState, useEffect, ChangeEvent } from 'react';

// Define the types for props
interface EditRowModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  rowData: Record<string, any> | null; // Use Record<string, any> to allow for dynamic keys
  onSave: (data: Record<string, any>) => void;
}

// Define the type for form data
type FormData = Record<string, any>;

const EditRowModal: React.FC<EditRowModalProps> = ({ isOpen, onRequestClose, rowData, onSave }) => {
  const [formData, setFormData] = useState<FormData>({});

  useEffect(() => {
    if (rowData) {
      setFormData({ ...rowData });
    }
  }, [rowData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    console.log('FormData on save:', formData); // Debugging line
    if (formData.leadid) { // Check if formData contains the leadid
      onSave(formData); // Pass the entire formData which includes leadid
      onRequestClose();
    } else {
      console.error('No leadid found in formData');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-gray-800 opacity-50"></div>

      {/* Modal content with scrollable container */}
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-10 max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-black">Edit Row</h2>
        
        {/* Scrollable form */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="text"
                name={key}
                value={formData[key] || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onRequestClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRowModal;
