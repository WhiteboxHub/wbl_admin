// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import AddRowModal from "../../modals/AddRowModal";
// import EditRowModal from "../../modals/EditRowModal";
// import ViewRowModal from "../../modals/ViewRowModal";
// import {
//   AiOutlineEdit,
//   AiOutlineDelete,
//   AiOutlineSearch,
//   AiOutlineReload,
// } from "react-icons/ai";
// import { MdAdd } from "react-icons/md";
// import { Lead } from "../../types/index"; // Adjust the import path accordingly

// const Leads = () => {
//   const [rowData, setRowData] = useState<Lead[]>([]);
//   const [columnDefs, setColumnDefs] = useState<
//     { headerName: string; field: string }[]
//   >([]);
//   const [paginationPageSize] = useState<number>(200); // Increased records per page to 200
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalRows, setTotalRows] = useState<number>(0);
//   const [modalState, setModalState] = useState<{
//     add: boolean;
//     edit: boolean;
//     view: boolean;
//   }>({ add: false, edit: false, view: false });
//   const [selectedRow, setSelectedRow] = useState<Lead | null>(null);
//   const [searchValue, setSearchValue] = useState<string>("");
//   const gridRef = useRef<AgGridReact>(null);

//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   // const fetchData = async () => {
//   //   try {
//   //     const response = await axios.get(`${API_URL}/api/leads`, {
//   //       params: { page: currentPage, pageSize: paginationPageSize },
//   //       headers: { AuthToken: localStorage.getItem("token") },
//   //     });
//   //     const { data, totalRows } = response.data;
//   //     setRowData(data);
//   //     setTotalRows(totalRows);
//   //     setupColumns(data);
//   //   } catch (error) {
//   //     console.error("Error loading data:", error);
//   //   }
//   // };

//   const fetchData = async (searchValue = "") => {
//     try {
//       const response = await axios.get(`${API_URL}/api/leads`, {
//         params: {
//           page: currentPage,
//           pageSize: paginationPageSize,
//           search: searchValue,  // Pass the search term to the API
//         },
//         headers: { AuthToken: localStorage.getItem("token") },
//       });

//       const { data, totalRows } = response.data;
//       setRowData(data);
//       setTotalRows(totalRows);  // Update the total rows if the search term affects pagination
//       setupColumns(data);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     }
//   };

//   //   const fetchData = async (searchTerm: string = '') => {
//   //     try {
//   //         const response = await axios.get(`${API_URL}/api/leads`, {
//   //             params: {
//   //                 page: currentPage,
//   //                 pageSize: paginationPageSize,
//   //                 search: searchTerm // Pass the search term
//   //             },
//   //             headers: { AuthToken: localStorage.getItem('token') }
//   //         });
//   //         const { data, totalRows } = response.data;
//   //         setRowData(data);
//   //         setTotalRows(totalRows);
//   //     } catch (error) {
//   //         console.error('Error loading data:', error);
//   //     }
//   // };

//   const setupColumns = (data: Lead[]) => {
//     if (data.length > 0) {
//       const keys = Object.keys(data[0]);
//       const columns = keys.map((key) => ({
//         headerName: key.charAt(0).toUpperCase() + key.slice(1),
//         field: key,
//       }));
//       setColumnDefs(columns);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [currentPage]);

//   const handleAddRow = () =>
//     setModalState((prevState) => ({ ...prevState, add: true }));
//   const handleEditRow = () => {
//     if (gridRef.current) {
//       const selectedRows = gridRef.current.api.getSelectedRows();
//       if (selectedRows.length > 0) {
//         setSelectedRow(selectedRows[0]);
//         setModalState((prevState) => ({ ...prevState, edit: true }));
//       } else {
//         alert("Please select a row to edit.");
//       }
//     }
//   };

//   const handleSearch = () => {
//     setCurrentPage(1);  // Reset to the first page for new search
//     fetchData(searchValue);  // Fetch data using the search term
//   };

//   const handleViewRow = () => {
//     if (gridRef.current) {
//       const selectedRows = gridRef.current.api.getSelectedRows();
//       if (selectedRows.length > 0) {
//         setSelectedRow(selectedRows[0]);
//         setModalState((prevState) => ({ ...prevState, view: true }));
//       } else {
//         alert("Please select a row to view.");
//       }
//     }
//   };

//   const handleDeleteRow = async () => {
//     if (gridRef.current) {
//       const selectedRows = gridRef.current.api.getSelectedRows();
//       if (selectedRows.length > 0) {
//         const leadId = selectedRows[0].leadid;
//         await axios.delete(`${API_URL}/api/leads/delete/${leadId}`, {
//           headers: { AuthToken: localStorage.getItem("token") },
//         });
//         fetchData(); // Refresh data
//       } else {
//         alert("Please select a row to delete.");
//       }
//     }
//   };

//   const handlePageChange = (newPage: number) => {
//     setCurrentPage(newPage);
//   };

//   const totalPages = Math.ceil(totalRows / paginationPageSize);
//   const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="p-4 mt-20 bg-gray-100 rounded-lg shadow-md relative">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold text-gray-800">Lead Management</h1>
//         <div className="flex space-x-2">
//           <button
//             onClick={handleAddRow}
//             className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md transition duration-300 hover:bg-green-700"
//           >
//             <MdAdd className="mr-2" /> Add Lead
//           </button>
//           <button
//             onClick={handleEditRow}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700"
//           >
//             <AiOutlineEdit className="mr-2" /> Edit
//           </button>
//           <button
//             onClick={handleViewRow}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700"
//           >
//             <AiOutlineEdit className="mr-2" /> View
//           </button>
//           <button
//             onClick={handleDeleteRow}
//             className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md transition duration-300 hover:bg-red-700"
//           >
//             <AiOutlineDelete className="mr-2" /> Delete
//           </button>
//         </div>
//       </div>

//       <div
//         className="ag-theme-alpine"
//         style={{ height: "400px", width: "100%", overflowY: "auto" }}
//       >
//         <AgGridReact
//           ref={gridRef}
//           rowData={rowData}
//           columnDefs={columnDefs}
//           pagination={false} // Set to false for manual pagination
//           domLayout="autoHeight"
//           rowSelection="single"
//           defaultColDef={{
//             sortable: true,
//             filter: true,
//             cellStyle: { color: "#333" },
//           }}
//         />
//       </div>
//       <div className="flex justify-between mt-4">
//         <select
//           className="border rounded-md px-2 py-1 bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-200"
//           value={currentPage}
//           onChange={(e) => handlePageChange(Number(e.target.value))}
//         >
//           {pageOptions.map(page => (
//             <option key={page} value={page}>
//               Page {page}
//             </option>
//           ))}
//         </select>

//         <div className="flex items-center space-x-2">
//           <button
//             onClick={() => fetchData()}
//             className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md transition duration-300 hover:bg-gray-700"
//           >
//             <AiOutlineReload className="mr-1" /> Reload
//           </button>

//           <input
//             type="text"
//             className="border rounded-md px-2 py-1"
//             placeholder="Search"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//           />
//           {/* <button
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700">
//             <AiOutlineSearch className="mr-1" /> Search
//             </button> */}
// <button onClick={handleSearch} // Now calling handleSearch to fetch filtered data
//   className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700"
// >
//   <AiOutlineSearch className="mr-1" /> Search
// </button>
//         </div>
//       </div>
//       {/* Modals */}
//       <AddRowModal
//         isOpen={modalState.add}
//         onRequestClose={() => setModalState({ ...modalState, add: false })}
//         onSave={fetchData}
//       />
//       <EditRowModal
//         isOpen={modalState.edit}
//         onRequestClose={() => setModalState({ ...modalState, edit: false })}
//         rowData={selectedRow}
//         onSave={fetchData}
//       />
//       <ViewRowModal
//         isOpen={modalState.view}
//         onRequestClose={() => setModalState({ ...modalState, view: false })}
//         rowData={selectedRow}
//       />
//     </div>
//   );
// };

// export default Leads;
//**************************************************************************************** */
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import AddRowModal from "../../modals/AddRowModal";
// import EditRowModal from "../../modals/EditRowModal";
// import ViewRowModal from "../../modals/ViewRowModal";
// import {
//   AiOutlineEdit,
//   AiOutlineDelete,
//   AiOutlineSearch,
//   AiOutlineReload,
//   AiOutlineDownload,
//   AiOutlineFundView,
//   AiOutlineFolderView,
//   AiOutlineEye,
// } from "react-icons/ai";
// import { MdAdd } from "react-icons/md";
// import { Lead } from "../../types/index"; // Adjust the import path accordingly

// const Leads = () => {
//   const [rowData, setRowData] = useState<Lead[]>([]);
//   const [columnDefs, setColumnDefs] = useState<
//     { headerName: string; field: string }[]
//   >([]);
//   const [paginationPageSize] = useState<number>(200); // Increased records per page to 200
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalRows, setTotalRows] = useState<number>(0);
//   const [modalState, setModalState] = useState<{
//     add: boolean;
//     edit: boolean;
//     view: boolean;
//   }>({ add: false, edit: false, view: false });
//   const [selectedRow, setSelectedRow] = useState<Lead | null>(null);
//   const [searchValue, setSearchValue] = useState<string>("");
//   const gridRef = useRef<AgGridReact>(null);

//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   // const fetchData = async (searchQuery = "") => {
//   //   try {
//   //     const response = await axios.get(`${API_URL}/api/leads`, {
//   //       params: {
//   //         page: currentPage,
//   //         pageSize: paginationPageSize,
//   //         search: searchQuery, // Pass the search query to the backend
//   //       },
//   //       headers: { AuthToken: localStorage.getItem("token") },
//   //     });
//   //     const { data, totalRows } = response.data;
//   //     setRowData(data);
//   //     setTotalRows(totalRows);
//   //     setupColumns(data);
//   //   } catch (error) {
//   //     console.error("Error loading data:", error);
//   //   }
//   // };
//   // ----------------------------------------------------------
//   // -----------------------------------------------------------
//   // missing dependency need to optimize the searching data

//   const fetchData = async (searchQuery = "") => {
//     try {
//       const response = await axios.get(`${API_URL}/api/leads/search`, {
//         params: {
//           page: currentPage, // Pass current page for pagination
//           pageSize: paginationPageSize, // Pass pageSize for pagination
//           search: searchQuery, // Pass the search query to the backend
//         },
//         headers: { AuthToken: localStorage.getItem("token") },
//       });

//       const { data, totalRows } = response.data;
//       setRowData(data); // Set the table data
//       setTotalRows(totalRows); // Set the total rows for pagination
//       setupColumns(data); // Optional: If needed for dynamic columns
//     } catch (error) {
//       console.error("Error loading data:", error);
//     }
//   };

//   // Call fetchData when currentPage or searchValue changes
//   useEffect(() => {
//     fetchData(searchValue);
//   }, [currentPage, searchValue]);

//   const setupColumns = (data: Lead[]) => {
//     if (data.length > 0) {
//       const keys = Object.keys(data[0]);
//       const columns = keys.map((key) => ({
//         headerName: key.charAt(0).toUpperCase() + key.slice(1),
//         field: key,
//       }));
//       setColumnDefs(columns);
//     }
//   };

//   useEffect(() => {
//     fetchData(searchValue); // Fetch data whenever currentPage or searchValue changes
//   }, [currentPage, searchValue]);

//   const handleAddRow = () =>
//     setModalState((prevState) => ({ ...prevState, add: true }));

//   const handleEditRow = () => {
//     if (gridRef.current) {
//       const selectedRows = gridRef.current.api.getSelectedRows();
//       if (selectedRows.length > 0) {
//         setSelectedRow(selectedRows[0]);
//         setModalState((prevState) => ({ ...prevState, edit: true }));
//       } else {
//         alert("Please select a row to edit.");
//       }
//     }
//   };

//   const handleViewRow = () => {
//     if (gridRef.current) {
//       const selectedRows = gridRef.current.api.getSelectedRows();
//       if (selectedRows.length > 0) {
//         setSelectedRow(selectedRows[0]);
//         setModalState((prevState) => ({ ...prevState, view: true }));
//       } else {
//         alert("Please select a row to view.");
//       }
//     }
//   };

//   // const handleDeleteRow = async () => {
//   //   if (gridRef.current) {
//   //     const selectedRows = gridRef.current.api.getSelectedRows();
//   //     if (selectedRows.length > 0) {
//   //       const leadId = selectedRows[0].leadid;
//   //       await axios.delete(`${API_URL}/api/leads/delete/${leadId}`, {
//   //         headers: { AuthToken: localStorage.getItem("token") },
//   //       });
//   //       fetchData(searchValue); // Refresh data after deletion
//   //     } else {
//   //       alert("Please select a row to delete.");
//   //     }
//   //   }
//   // };

//   const handleDeleteRow = async () => {
//     if (gridRef.current) {
//       const selectedRows = gridRef.current.api.getSelectedRows();
//       if (selectedRows.length > 0) {
//         const leadId = selectedRows[0].leadid;
//         if (leadId) {
//           const confirmation = window.confirm(
//             `Are you sure you want to delete lead ID ${leadId}?`
//           );
//           if (!confirmation) return;

//           try {
//             await axios.delete(`${API_URL}/api/leads/delete/${leadId}`, {
//               headers: { AuthToken: localStorage.getItem("token") },
//             });
//             alert("Lead deleted successfully.");
//             fetchData(searchValue); // Refresh data after deletion
//           } catch (error) {
//             console.error("Error deleting lead:", error);
//             alert(
//               `Failed to delete lead: ${
//                 // error.response?.data?.message || error.message
//                 (error as any).response?.data?.message || (error as any).message
//               }`
//             );
//           }
//         } else {
//           alert("No valid lead ID found for the selected row.");
//         }
//       } else {
//         alert("Please select a row to delete.");
//       }
//     }
//   };


//   const handleRefresh = () => {
//     setSearchValue(""); // Clear search value before refreshing
//     fetchData(); // Re-fetch data
//     window.location.reload(); // Trigger page reload
//   };
  


//   const handlePageChange = (newPage: number) => {
//     setCurrentPage(newPage);
//   };



//   const handleSearch = () => {
//     fetchData(searchValue); // Fetch data using the search term
//   };



//   const handleDownloadPDF = () => {
//     if (gridRef.current) {
//       const selectedRows = gridRef.current.api.getSelectedRows();
//       if (selectedRows.length > 0) {
//         const doc = new jsPDF();
//         doc.text("Selected Lead Data", 20, 10);
//         // Prepare data for PDF
//         const pdfData = selectedRows.map((row) => Object.values(row));
//         doc.autoTable({
//           head: [["Column 1", "Column 2", "Column 3"]], // Replace with actual headers
//           body: pdfData,
//         });
  
//         doc.save("Selected_Lead_data.pdf");
//       } else {
//         alert("Please select a row to download.");
//       }
//     }
//   };



//   const totalPages = Math.ceil(totalRows / paginationPageSize);
//   const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="relative">
//       <div className="p-4 mt-20 bg-gray-100 rounded-lg shadow-md relative">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-3xl font-bold text-gray-800">Lead Management</h1>
//           <div className="flex space-x-2">
//             <button
//               onClick={handleAddRow}
//               className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md transition duration-300 hover:bg-green-700"
//             >
//               <MdAdd className="mr-2" /> Add Lead
//             </button>
//             <button
//               onClick={handleEditRow}
//               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700"
//             >
//               <AiOutlineEdit className="mr-2" /> Edit
//             </button>
//             <button
//               onClick={handleViewRow}
//               className="flex items-center px-4 py-2 bg-gray-400 text-white rounded-md transition duration-300 hover:bg-gray-700"
//             >
//               <AiOutlineEye className="mr-2" /> View
//             </button>
//             <button
//               onClick={handleDeleteRow}
//               className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md transition duration-300 hover:bg-red-700"
//             >
//               <AiOutlineDelete className="mr-2" /> Delete
//             </button><button
//               onClick={ handleRefresh} // Refresh data with current search
//               className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md transition duration-300 hover:bg-gray-700"
//             >
//               <AiOutlineReload className="mr-2" /> Refresh
//             </button>
//             <button
//             onClick={handleDownloadPDF}
//             className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md transition duration-300 hover:bg-purple-700"
//           >
//             <AiOutlineDownload className="mr-2" /> Download
//           </button>
//           </div>
//         </div>

//         <div
//           className="ag-theme-alpine"
//           style={{ height: "400px", width: "100%", overflowY: "auto" }}
//         >
//           <AgGridReact
//             ref={gridRef}
//             rowData={rowData}
//             columnDefs={columnDefs}
//             pagination={false} // Set to false for manual pagination
//             domLayout="autoHeight"
//             rowSelection="single"
//             defaultColDef={{
//               sortable: true,
//               filter: true,
//               cellStyle: { color: "#333" },
//             }}
//           />
//         </div>
//         <div className="flex justify-between mt-4">
//           <select
//             className="border rounded-md px-2 py-1 bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-200"
//             value={currentPage}
//             onChange={(e) => handlePageChange(Number(e.target.value))}
//           >
//             {pageOptions.map((page) => (
//               <option key={page} value={page}>
//                 Page {page}
//               </option>
//             ))}
//           </select>

//           <div className="flex items-center space-x-2">
            
//             <input
//               type="text"
//               className="border rounded-md px-2 py-1"
//               placeholder="Search"
//               value={searchValue}
//               onChange={(e) => setSearchValue(e.target.value)} // Update search value on input change
//             />
//             <button
//               onClick={handleSearch} // Call handleSearch when clicked
//               className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700"
//             >
//               <AiOutlineSearch className="mr-1" /> Search
//             </button>
//           </div>
//         </div>
//         {/* Modals */}
//         <AddRowModal
//           isOpen={modalState.add}
//           onRequestClose={() => setModalState({ ...modalState, add: false })}
//           onSave={fetchData}
//         />
//         <EditRowModal
//           isOpen={modalState.edit}
//           onRequestClose={() => setModalState({ ...modalState, edit: false })}
//           rowData={selectedRow}
//           onSave={fetchData}
//         />
//         <ViewRowModal
//           isOpen={modalState.view}
//           onRequestClose={() => setModalState({ ...modalState, view: false })}
//           rowData={selectedRow}
//         />
//       </div>
//     </div>
//   );
// };

// export default Leads;




"use client";
import React, { useState, useEffect, useRef ,useCallback} from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import * as XLSX from "xlsx";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AddRowModal from "../../modals/AddRowModal";
import EditRowModal from "../../modals/EditRowModal";
import ViewRowModal from "../../modals/ViewRowModal";
// import debounce from "lodash.debounce";
import {debounce} from "lodash";

import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineSearch,
  AiOutlineReload,
  AiOutlineEye,
} from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { Lead } from "../../types/index"; // Adjust the import path accordingly

const Leads = () => {
  const [rowData, setRowData] = useState<Lead[]>([]);
  const [columnDefs, setColumnDefs] = useState<
    { headerName: string; field: string }[]
  >([]);
  const [paginationPageSize] = useState<number>(200); // Increased records per page to 200
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [modalState, setModalState] = useState<{
    add: boolean;
    edit: boolean;
    view: boolean;
  }>({ add: false, edit: false, view: false });
  const [selectedRow, setSelectedRow] = useState<Lead | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  // const [searchValue, setSearchValue] = useState("");
  // const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);
  const gridRef = useRef<AgGridReact>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // const fetchData = useCallback (async (searchQuery = "") => {
  //   try {
  //     const response = await axios.get(`${API_URL}/api/leads/search`, {
  //       params: {
  //         page: currentPage, // Pass current page for pagination
  //         pageSize: paginationPageSize, // Pass pageSize for pagination
  //         search: searchQuery, // Pass the search query to the backend
  //       },
  //       headers: { AuthToken: localStorage.getItem("token") },
  //     });

  //     const { data, totalRows } = response.data;
  //     setRowData(data); // Set the table data
  //     setTotalRows(totalRows); // Set the total rows for pagination
  //     setupColumns(data); // Optional: If needed for dynamic columns
  //   } catch (error) {
  //     console.error("Error loading data:", error);
  //   }
  // },[currentPage, paginationPageSize]);

  
// Fetch data function, now doesn't need to be debounced directly
const fetchData = useCallback(async (searchQuery = "", page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/api/leads/search`, {
      params: {
        page: page, // Pass current page for pagination
        pageSize: paginationPageSize, // Pass pageSize for pagination
        search: searchQuery, // Pass the search query to the backend
      },
      headers: { AuthToken: localStorage.getItem("token") },
    });

    const { data, totalRows } = response.data;
    setRowData(data); // Set the table data
    setTotalRows(totalRows); // Set the total rows for pagination
    setupColumns(data); // Optional: If needed for dynamic columns
  } catch (error) {
    console.error("Error loading data:", error);
  }
}, [paginationPageSize]);
  // // Call fetchData when currentPage or searchValue changes
  // useEffect(() => {
  //   fetchData(searchValue);
  // }, [currentPage, searchValue,fetchData])
   // Debounce searchValue with a 300ms delay
  //  useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedSearchValue(searchValue);
  //   }, 300); // 300ms debounce delay

  //   // Cleanup function: Clear the timeout if the user keeps typing
  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [searchValue]);

  //  // Fetch data whenever debouncedSearchValue or currentPage changes
  //  useEffect(() => {
  //   if (debouncedSearchValue || currentPage) {
  //     fetchData(debouncedSearchValue);
  //   }
  // }, [debouncedSearchValue, currentPage, fetchData]);
 // Debounce the fetchData function using lodash.debounce
 // Debounce the fetchData function using lodash debounce, only for search query changes
 const debouncedFetchData = useCallback(
  debounce((query) => {
    fetchData(query, currentPage); // Fetch data using debounced query
  }, 300), // 300ms debounce
  [fetchData, currentPage] // Dependencies: fetchData and currentPage
);

// Handle input change and trigger debounced fetch
useEffect(() => {
  if (searchValue) {
    debouncedFetchData(searchValue);
  }
  // Cleanup debounced function on unmount
  return () => {
    debouncedFetchData.cancel();
  };
}, [searchValue, debouncedFetchData]);


//  // Handle pagination (trigger immediately, no debouncing)
//  useEffect(() => {
//   if (!searchValue) {
//     fetchData("", currentPage); // Fetch data immediately on page change without search
//   }
// }, [currentPage, fetchData, searchValue]);

 // Handle pagination (trigger immediately, no debouncing)
 useEffect(() => {
  if (!searchValue) {
    fetchData("", currentPage); // Fetch data immediately on page change without search
  }
}, [currentPage, fetchData, searchValue]);

  const setupColumns = (data: Lead[]) => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      const columns = keys.map((key) => ({
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        field: key,
      }));
      setColumnDefs(columns);
    }
  };

  // useEffect(() => {
  //   fetchData(searchValue); // Fetch data whenever currentPage or searchValue changes
  // }, [currentPage, searchValue]);

  const handleAddRow = () =>
    setModalState((prevState) => ({ ...prevState, add: true }));

  const handleEditRow = () => {
    if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      if (selectedRows.length > 0) {
        setSelectedRow(selectedRows[0]);
        setModalState((prevState) => ({ ...prevState, edit: true }));
      } else {
        alert("Please select a row to edit.");
      }
    }
  };

  const handleViewRow = () => {
    if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      if (selectedRows.length > 0) {
        setSelectedRow(selectedRows[0]);
        setModalState((prevState) => ({ ...prevState, view: true }));
      } else {
        alert("Please select a row to view.");
      }
    }
  };

  const handleDeleteRow = async () => {
    if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      if (selectedRows.length > 0) {
        const leadId = selectedRows[0].leadid;
        if (leadId) {
          const confirmation = window.confirm(
            `Are you sure you want to delete lead ID ${leadId}?`
          );
          if (!confirmation) return;

          try {
            await axios.delete(`${API_URL}/api/leads/delete/${leadId}`, {
              headers: { AuthToken: localStorage.getItem("token") },
            });
            alert("Lead deleted successfully.");
            fetchData(searchValue); // Refresh data after deletion
          } catch (error) {
            console.error("Error deleting lead:", error);
            alert(
              `Failed to delete lead: ${
                // error.response?.data?.message || error.message
                (error as any).response?.data?.message || (error as any).message
              }`
            );
          }
        } else {
          alert("No valid lead ID found for the selected row.");
        }
      } else {
        alert("Please select a row to delete.");
      }
    }
  };

  const handleRefresh = () => {
    setSearchValue(""); // Clear search value before refreshing
    fetchData(); // Re-fetch data
    window.location.reload(); // Trigger page reload
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch = () => {
    fetchData(searchValue); // Fetch data using the search term
  };

  const handleDownloadPDF = () => {
    if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      if (selectedRows.length > 0) {
        const doc = new jsPDF();
        doc.text("Selected Lead Data", 20, 10);
        // Prepare data for PDF
        const pdfData = selectedRows.map((row) => Object.values(row));
        doc.autoTable({
          head: [["Column 1", "Column 2", "Column 3"]], // Replace with actual headers
          body: pdfData,
        });

        doc.save("Selected_Lead_data.pdf");
      } else {
        alert("Please select a row to download.");
      }
    }
  };

  const handleExportToExcel = () => {
    if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows() as Lead[];
      if (selectedRows.length > 0) {
        const ws = XLSX.utils.json_to_sheet(selectedRows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Selected Lead Data");
        XLSX.writeFile(wb, "Selected_Lead_data.xlsx");
      } else {
        alert("Please select a row to export.");
      }
    }
  };

  const options = ["Export to PDF", "Export to Excel"];
  const defaultOption = "Download";

  const totalPages = Math.ceil(totalRows / paginationPageSize);
  const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="relative">
      <div className="p-4 mt-20 mb-10 ml-20 mr-20 bg-gray-100 rounded-lg shadow-md relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Lead Management</h1>
          <div className="flex space-x-2">
            <button
              onClick={handleAddRow}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md transition duration-300 hover:bg-green-700"
            >
              <MdAdd className="mr-2" /> Add Lead
            </button>
            <button
              onClick={handleEditRow}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700"
            >
              <AiOutlineEdit className="mr-2" /> Edit
            </button>
            <button
              onClick={handleViewRow}
              className="flex items-center px-4 py-2 bg-gray-400 text-white rounded-md transition duration-300 hover:bg-gray-700"
            >
              <AiOutlineEye className="mr-2" /> View
            </button>
            <button
              onClick={handleDeleteRow}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md transition duration-300 hover:bg-red-700"
            >
              <AiOutlineDelete className="mr-2" /> Delete
            </button>
            <button
              onClick={handleRefresh}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md transition duration-300 hover:bg-gray-700"
            >
              <AiOutlineReload className="mr-2" /> Refresh
            </button>
            {/* <div className="rounded-2xl  border-4 bg-black"> */}
            <Dropdown
            options={options}
            value={defaultOption}
            onChange={(selectedOption) => {
              if (selectedOption.value === "Export to PDF") {
                handleDownloadPDF();
              } else if (selectedOption.value === "Export to Excel") {
                handleExportToExcel();
              }
            }}
              placeholder="Select an option"
              className="bg-purple-600 text-black rounded-lg transition duration-300 hover:bg-purple-700"
              controlClassName="bg-purple-600 text-black rounded-lg transition duration-300 hover:bg-purple-700 border-none"
              menuClassName="bg-purple-600 text-black rounded-lg transition duration-300"
              arrowClassName="text-black"  /* Arrow styling, no need for border-radius */
              placeholderClassName="text-black"  /* Placeholder styling */
            />
        {/* </div> */}

          </div>
        </div>

        <div
          className="ag-theme-alpine"
          style={{ height: "400px", width: "100%", overflowY: "auto" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={false} // Set to false for manual pagination
            domLayout="autoHeight"
            rowSelection="single"
            defaultColDef={{
              sortable: true,
              filter: true,
              cellStyle: { color: "#333" },
            }}
          />
        </div>
        <div className="flex justify-between mt-4">
          <select
            className="border rounded-md px-2 py-1 bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-200"
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
          >
            {pageOptions.map((page) => (
              <option key={page} value={page}>
                Page {page}
              </option>
            ))}
          </select>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              className="border rounded-md px-2 py-1"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)} // Update search value on input change
            />
            <button
              onClick={handleSearch} // Call handleSearch when clicked
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700"
            >
              <AiOutlineSearch className="mr-1" /> Search
            </button>
          </div>
        </div>
        {/* Modals */}
        <AddRowModal
          isOpen={modalState.add}
          onRequestClose={() => setModalState({ ...modalState, add: false })}
          onSave={fetchData}
        />
        <EditRowModal
          isOpen={modalState.edit}
          onRequestClose={() => setModalState({ ...modalState, edit: false })}
          rowData={selectedRow}
          onSave={fetchData}
        />
        <ViewRowModal
          isOpen={modalState.view}
          onRequestClose={() => setModalState({ ...modalState, view: false })}
          rowData={selectedRow}
        />
      </div>
    </div>
  );
};

export default Leads;
