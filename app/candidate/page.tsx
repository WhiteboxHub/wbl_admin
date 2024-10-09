// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import AddRowModal from "../../modals/AddRowCandidate";
// import EditRowModal from "../../modals/EditRowCandidate";
// import ViewRowModal from "../../modals/ViewRowCandidate";
// // 
// import {
//   AiOutlineEdit,
 
//   AiOutlineSearch,
//   AiOutlineReload,
//   AiOutlineEye,
//   AiOutlineDownload,
// } from "react-icons/ai";
// import { MdAdd, MdDelete } from "react-icons/md";
// import { Candidate } from "../../types/index"; // Adjust the import path accordingly

// const Candidates = () => {
//   const [rowData, setRowData] = useState<Candidate[]>([]);
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
//   const [selectedRow, setSelectedRow] = useState<Candidate | null>(null);
//   const [searchValue, setSearchValue] = useState<string>("");
//   const gridRef = useRef<AgGridReact>(null);

//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/candidates`, {
//         params: { page: currentPage, pageSize: paginationPageSize },
//         headers: { AuthToken: localStorage.getItem("token") },
//       });
//       const { data, totalRows } = response.data;
//       setRowData(data);
//       setTotalRows(totalRows);
//       setupColumns(data);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     }
//   };



//   const setupColumns = (data: Candidate[]) => {
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



//   const handleDeleteRow = async () => {
//     if (gridRef.current) {
//       const selectedRows = gridRef.current.api.getSelectedRows();
//       if (selectedRows.length > 0) {
//         const candidateId = selectedRows[0].candidateid;
//         await axios.delete(`${API_URL}/candidates/delete/${candidateId}`, {
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

//  return (
//     <div className="p-4 mt-20 bg-gray-100 rounded-lg shadow-md relative">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold text-gray-800"> Candidate Management</h1>
//          <div className="flex space-x-2"> 
//           <button
//             onClick={handleAddRow}
//             className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md transition duration-300 hover:bg-green-700"
//           >
//             <MdAdd className="mr-2" /> Add Candidates
//           </button>
//           <button
//             onClick={handleEditRow}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700"
//           >
//             <AiOutlineEdit className="mr-2" /> Edit
//           </button>
//           {/* <button
//             onClick={handleRefresh}
//             className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md transition duration-300 hover:bg-gray-700"
//           >
//             <AiOutlineReload className="mr-2" /> Refresh
//           </button> */}
//           <button
//             onClick={handleDeleteRow}
//             className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md transition duration-300 hover:bg-red-700"
//           >
//             <MdDelete  className="mr-2" /> Delete
//           </button>
//           <button
//             onClick={handleAddRow}
//             className="flex items-center px-4 py-2 bg-gray-400 text-white rounded-md transition duration-300 hover:bg-gray-700"
//           >
//             <AiOutlineEye className="mr-2" />view
//           </button>

//           <button
//             onClick={handleAddRow}
//             className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md transition duration-300 hover:bg-purple-700"
//           >
//             <AiOutlineDownload className="mr-2" />Download
//           </button>
//         </div>
//       </div>

//       <div
//         className="ag-theme-alpine"
//         style={{ height: "400px", width: "100%", overflowY: "auto" }}
//       >


//        <AgGridReact
//         ref={gridRef}
//         rowData={rowData}
//         columnDefs={columnDefs}
//         pagination={false}
//         domLayout="printLayout"
//         rowSelection="single"
//         defaultColDef={{
//           sortable: true,
//           filter: true,
//           cellStyle: { color: "#333", fontSize: "0.75rem",padding: "1px" },
//           rowStyle: {
//             paddingTop: "5px", // Add padding-top property for rows
//           },
//           minWidth: 60, // Set a minimum width for columns
//           maxWidth: 100, // Set a maximum width for columns
//         }}
//         rowHeight={30}
//         headerHeight={35}
//       />



//         {/* <AgGridReact
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
//         /> */}
//       </div>

//       {
//       }
// <div className="flex justify-between mt-4">
//     <select 
//         className="border rounded-md px-2 py-1 bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-200" 
//         value={currentPage} 
//         onChange={(e) => handlePageChange(Number(e.target.value))}
//     >
//         {pageOptions.map(page => (
//             <option key={page} value={page}>
//                 Page {page}
//             </option>
//         ))}
//     </select>

//     <div className="flex items-center space-x-2">
//         <button 
//             onClick={fetchData} 
//             className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md transition duration-300 hover:bg-gray-700"
//         >
//             <AiOutlineReload className="mr-1" /> Reload
//         </button>

//         <input
//             type="text"
//             className="border rounded-md px-2 py-1"
//             placeholder="Search"
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//         />

//         {

//         }
//         <button 
//     // onClick={handleSearch} // Call handleSearch when clicked
//     className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700">
//     <AiOutlineSearch className="mr-1" /> Search
// </button>
//     </div>
// </div>
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
//         onClose={() => setModalState((prev) => ({ ...prev, add: false }))}
//         rowData={selectedRow}
//       />
//     </div>
//   );
// };

// export default Candidates;








"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import * as XLSX from "xlsx";
import { AgGridReact } from "ag-grid-react";
import { AxiosError } from 'axios';
import "ag-grid-community/styles/ag-grid.css";
import { FaDownload } from "react-icons/fa";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import "ag-grid-community/styles/ag-theme-alpine.css";
import AddRowModal from "../../modals/AddRowCandidate";
import EditRowModal from "../../modals/EditRowCandidate";
import ViewRowModal from "../../modals/ViewRowCandidate";
import { MdDelete } from "react-icons/md";
import { debounce } from "lodash";

import {
  AiOutlineEdit,
  AiOutlineSearch,
  AiOutlineReload,
  AiOutlineEye,
} from "react-icons/ai";
<<<<<<< HEAD
=======
import { MdDelete } from "react-icons/md";
>>>>>>> 49a35bde45ca8a93376e4a35101e143fbe23d8e9
import { MdAdd } from "react-icons/md";
import { Candidate } from "../../types/index"; // Adjust the import path accordingly

const CandidatePage = () => {
  const [rowData, setRowData] = useState<Candidate[]>([]);
  const [columnDefs, setColumnDefs] = useState<
    { headerName: string; field: string }[]
  >([]);
  const [paginationPageSize] = useState<number>(200);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [loading,] = useState<boolean>(false);
  const [modalState, setModalState] = useState<{
    add: boolean;
    edit: boolean;
    view: boolean;
  }>({ add: false, edit: false, view: false });
  const [selectedRow, setSelectedRow] = useState<Candidate | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const gridRef = useRef<AgGridReact>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = useCallback(async (searchQuery = "", page = 1) => {
    try {
      const response = await axios.get(`${API_URL}/candidates/search`, {
        params: {
          page: page,
          pageSize: paginationPageSize,
          search: searchQuery,
        },
        headers: { AuthToken: localStorage.getItem("token") },
      });

      const { data, totalRows } = response.data;
      setRowData(data);
      setTotalRows(totalRows);
      setupColumns(data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
<<<<<<< HEAD
  }, [paginationPageSize, API_URL]);

  const debouncedFetchData = useCallback(
    debounce((query: string) => {
      fetchData(query, currentPage);
    }, 300),
    [fetchData, currentPage]
  );

  useEffect(() => {
    if (searchValue) {
      debouncedFetchData(searchValue);
    }
    return () => {
      debouncedFetchData.cancel();
    };
  }, [searchValue, debouncedFetchData]);

  useEffect(() => {
    if (!searchValue) {
      fetchData("", currentPage);
    }
  }, [currentPage, fetchData, searchValue]);
=======
  };
  interface ErrorResponse {
    message: string;
    // Add other properties if needed
}
  const fetchBatches = async (searchQuery = "") => {
    try {
      const response = await axios.get(`${API_URL}/candidates/search`, {
        params: {
          page: currentPage, // Pass current page for pagination
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
  };
>>>>>>> 49a35bde45ca8a93376e4a35101e143fbe23d8e9

  const setupColumns = (data: Candidate[]) => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      const columns = keys.map((key) => ({
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        field: key,
      }));
      setColumnDefs(columns);
    }
  };
  const handleSearch = () => {
    fetchBatches(searchValue); // Fetch data using the search term
  };
  const handleDownloadPDF = () => {
    // Create a new instance of jsPDF
    const doc = new jsPDF();
  
    // Add title text
    doc.text("Candidate Data", 10, 10);
  
    // Prepare data for PDF
    const pdfData = rowData.map((row) => Object.values(row));
    const headers = columnDefs.map((col) => col.headerName);
  
    // Create the autoTable
    autoTable(doc, {
        head: [headers],
        body: pdfData,
        theme: 'grid', // Optional: set the theme for the table
        styles: { fontSize: 5 }, // Optional: adjust font size
    });
  
    // Save the PDF
    doc.save("candidate_data.pdf");
  };

  const handleRefresh = () => {
    setSearchValue(""); // Clear search value before refreshing
    fetchData(); // Re-fetch data
    window.location.reload(); // Trigger page reload
  };

  const handleViewRow = () => {
    if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      if (selectedRows.length > 0) {
        setSelectedRow(selectedRows[0]); // Set the selected row data
        setModalState((prevState) => ({ ...prevState, view: true })); // Open the view modal
      } else {
        alert("Please select a row to view.");
      }
    }
  };

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
<<<<<<< HEAD
        const candidateId = selectedRows[0].candidateid;
        if (candidateId) {
          const confirmation = window.confirm(
            `Are you sure you want to delete candidate ID ${candidateId}?`
          );
          if (!confirmation) return;

          try {
            await axios.delete(`${API_URL}/candidates/delete/${candidateId}`, {
              headers: { AuthToken: localStorage.getItem("token") },
            });
            alert("Candidate deleted successfully.");
            fetchData(searchValue);
          } catch (error) {
            console.error("Error deleting candidate:", error);
            alert(
              `Failed to delete candidate: ${
                (error as Error).message || "Unknown error occurred"
=======
        const candidateName = selectedRows[0].name; // Assuming 'name' is the property for the candidate's name
  
        if (candidateName) {
          const confirmation = window.confirm(
            `Are you sure you want to delete candidate ${candidateName}?`
          );
          if (!confirmation) return;
  
          try {
            await axios.delete(`${API_URL}/candidates/delete/${candidateName}`, {
              headers: { AuthToken: localStorage.getItem("token") },
            });
            alert(`Candidate ${candidateName} deleted successfully.`);
            fetchData(); // Refresh data after delete
          } catch (error) {
            const axiosError = error as AxiosError;
            alert(
              `Failed to delete candidate: ${
                (axiosError.response?.data as ErrorResponse)?.message || axiosError.message
>>>>>>> 49a35bde45ca8a93376e4a35101e143fbe23d8e9
              }`
            );
          }
        } else {
<<<<<<< HEAD
          alert("No valid candidate ID found for the selected row.");
=======
          alert("No valid candidate name found for the selected row.");
>>>>>>> 49a35bde45ca8a93376e4a35101e143fbe23d8e9
        }
      } else {
        alert("Please select a row to delete.");
      }
    }
  };
  

  const handleRefresh = () => {
    setSearchValue("");
    fetchData();
    window.location.reload();
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearch = () => {
    fetchData(searchValue);
  };

  const handleDownloadPDF = () => {
    if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      if (selectedRows.length > 0) {
        const doc = new jsPDF();
        doc.text("Selected Candidate Data", 20, 10);
        const pdfData = selectedRows.map((row) => [
          row.name,
          row.enrolleddate,
          row.email,
          row.course,
          row.phone,
          row.status,
          row.workstatus,
          row.education,
          row.workexperience,
          row.ssn,
          row.agreement,
          row.promissory,
          row.driverslicense,
          row.workpermit,
          row.wpexpirationdate,
          row.offerletter,
          row.secondaryemail,
          row.secondaryphone,
          row.address,
          row.city,
          row.state,
          row.country,
          row.zip,
          row.linkedin,
          row.dob,
          row.emergcontactname,
          row.emergcontactemail,
          row.emergcontactphone,
          row.emergcontactaddrs,
          row.guidelines,
          row.ssnvalidated,
          row.bgv,
          row.term,
          row.feepaid,
          row.feedue,
          row.salary0,
          row.salary6,
          row.salary12,
          row.guarantorname,
          row.guarantordesignation,
          row.guarantorcompany,
          row.contracturl,
          row.empagreementurl,
          row.offerletterurl,
          row.dlurl,
          row.workpermiturl,
          row.ssnurl,
          row.referralid,
          row.portalid,
          row.avatarid,
          row.notes,
          row.batchname,
          row.coverletter,
          row.background,
          row.recruiterassesment,
          row.instructorassesment,
          row.processflag,
          row.defaultprocessflag,
          row.originalresume,
          row.lastmoddatetime,
          row.statuschangedate,
          row.diceflag,
          row.batchid,
          row.emaillist,
        ]);
        (doc as unknown as { autoTable: (options: unknown) => void }).autoTable({
          head: [
            "Name",
            "Enrolled Date",
            "Email",
            "Course",
            "Phone",
            "Status",
            "Work Status",
            "Education",
            "Work Experience",
            "SSN",
            "Agreement",
            "Promissory",
            "Driver's License",
            "Work Permit",
            "Work Permit Expiration Date",
            "Offer Letter",
            "Secondary Email",
            "Secondary Phone",
            "Address",
            "City",
            "State",
            "Country",
            "Zip",
            "LinkedIn",
            "Date of Birth",
            "Emergency Contact Name",
            "Emergency Contact Email",
            "Emergency Contact Phone",
            "Emergency Contact Address",
            "Guidelines",
            "SSN Validated",
            "Background Check",
            "Term",
            "Fee Paid",
            "Fee Due",
            "Salary (0)",
            "Salary (6)",
            "Salary (12)",
            "Guarantor Name",
            "Guarantor Designation",
            "Guarantor Company",
            "Contract URL",
            "Employee Agreement URL",
            "Offer Letter URL",
            "DL URL",
            "Work Permit URL",
            "SSN URL",
            "Referral ID",
            "Portal ID",
            "Avatar ID",
            "Notes",
            "Batch Name",
            "Cover Letter",
            "Background",
            "Recruiter Assessment",
            "Instructor Assessment",
            "Process Flag",
            "Default Process Flag",
            "Original Resume",
            "Last Modified DateTime",
            "Status Changed Date",
            "Dice Flag",
            "Batch ID",
            "Email List",
          ],
          body: pdfData,
        });

        doc.save("Selected_Candidate_data.pdf");
      } else {
        alert("Please select a row to download.");
      }
    }
  };

  const handleExportToExcel = () => {
    if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows() as Candidate[];
      if (selectedRows.length > 0) {
        const ws = XLSX.utils.json_to_sheet(selectedRows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Selected Candidate Data");
        XLSX.writeFile(wb, "Selected_Candidate_data.xlsx");
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
<<<<<<< HEAD
    <div className="relative">
      <div className="p-4 mt-20 mb-10 ml-20 mr-20 bg-gray-100 rounded-lg shadow-md relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Candidate Management</h1>
        </div>

        <div className="flex flex-wrap mb-4 items-center gap-4">
          <input
            type="text"
            className="border rounded-md px-3 py-2 w-64"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700"
          >
            <AiOutlineSearch className="mr-2" /> Search
          </button>

=======
    <div className="p-4 mt-20 mb-10 ml-20 mr-20 bg-gray-100 rounded-lg shadow-md relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Candidate Management</h1>
        <div className="flex space-x-2">
>>>>>>> 49a35bde45ca8a93376e4a35101e143fbe23d8e9
          <button
            onClick={handleAddRow}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md transition duration-300 hover:bg-green-700"
          >
<<<<<<< HEAD
            <MdAdd className="mr-2" /> Add Candidate
=======
            <MdAdd className="mr-2" /> Add 
>>>>>>> 49a35bde45ca8a93376e4a35101e143fbe23d8e9
          </button>
          <button
            onClick={handleEditRow}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700"
          >
            <AiOutlineEdit className="mr-2" /> Edit
          </button>
<<<<<<< HEAD
          <button
            onClick={handleViewRow}
            className="flex items-center px-4 py-2 bg-gray-400 text-white rounded-md transition duration-300 hover:bg-gray-700"
          >
            <AiOutlineEye className="mr-2" /> View
          </button>
=======
>>>>>>> 49a35bde45ca8a93376e4a35101e143fbe23d8e9
          <button
            onClick={handleDeleteRow}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md transition duration-300 hover:bg-red-700"
          >
            <MdDelete className="mr-2" /> Delete
          </button>
          <button
<<<<<<< HEAD
            onClick={handleRefresh}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md transition duration-300 hover:bg-gray-700"
          >
            <AiOutlineReload className="mr-2" /> Refresh
          </button>
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
            controlClassName="bg-purple-600 text-black rounded-lg transition duration-300 hover:bg-purple-700 border-none px-4 py-2"
            menuClassName="bg-purple-600 text-black rounded-lg transition duration-300"
            arrowClassName="text-black"
            placeholderClassName="text-black"
          />
        </div>

        <div
          className="ag-theme-alpine"
          style={{ height: "400px", width: "100%", overflowY: "auto" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={false}
            domLayout="printLayout"
            rowSelection="single"
            defaultColDef={{
              sortable: true,
              filter: true,
              cellStyle: { color: "#333", fontSize: "0.75rem", padding: "1px" },
              rowStyle: {
                paddingTop: "5px", // Add padding-top property for rows
              },
              minWidth: 60, // Set a minimum width for columns
              maxWidth: 100, // Set a maximum width for columns
            }}
            rowHeight={30}
            headerHeight={35}
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
        </div>
        <AddRowModal
          isOpen={modalState.add}
          onRequestClose={() => setModalState({ ...modalState, add: false })}
          onSave={fetchData}
          tableName="candidate"
        />
        <EditRowModal
          isOpen={modalState.edit}
          onRequestClose={() => setModalState({ ...modalState, edit: false })}
          rowData={selectedRow}
          onSave={fetchData}
          tableName="candidate"
        />
        <ViewRowModal
          isOpen={modalState.view}
          onRequestClose={() => setModalState({ ...modalState, view: false })}
          rowData={selectedRow}
        />
      </div>
=======
            onClick={handleViewRow}
            className="flex items-center px-4 py-2 bg-gray-400 text-white rounded-md transition duration-300 hover:bg-gray-700"
          >
            <AiOutlineEye className="mr-2" /> View
          </button>
          <button
            onClick={handleRefresh}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md transition duration-300 hover:bg-gray-900"
          >
            <AiOutlineReload className="mr-2" /> Refresh
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md transition duration-300 hover:bg-purple-700"
          >
            <FaDownload className="mr-2" /> Download PDF
          </button>
        </div>
      </div>
          {/* Search Functionality */}
          <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
           onChange={(e) => setSearchValue(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-64"
          />
          <button
            onClick={handleSearch}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md ml-2 transition duration-300 hover:bg-blue-900"
          >
            <AiOutlineSearch className="mr-2" /> Search
          </button>
        </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <span className="text-xl">Loading...</span>
        </div>
      ) : (
        <div
        className="ag-theme-alpine"
        style={{ height: "400px", width: "100%", overflowY: "auto" }}
      >
        {<AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={false}
          domLayout="printLayout"
          rowSelection="single"
          defaultColDef={{
            sortable: true,
            filter: true,
            cellStyle: { color: "#333", fontSize: "0.75rem",padding: "1px" },
            rowStyle: {
              paddingTop: "5px", // Add padding-top property for rows
            },
            minWidth: 60, // Set a minimum width for columns
            maxWidth: 100, // Set a maximum width for columns
          }}
          rowHeight={30}
          headerHeight={35}
        /> }

           




      </div>







        
      )}

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

      
      </div>

      {modalState.add && (
        <AddRowModal
          isOpen={modalState.add}
          onClose={() => setModalState((prev) => ({ ...prev, add: false }))}
          refreshData={fetchData}
        />
      )}
      {modalState.edit && selectedRow && (
        <EditRowModal
        isOpen={modalState.edit}
        onRequestClose={() => setModalState({ ...modalState, edit: false })}
        rowData={selectedRow}
        onSave={fetchData}
    
      />
      )}
      {modalState.view && selectedRow && (
        <ViewRowModal
          isOpen={modalState.view}
          onClose={() => setModalState((prev) => ({ ...prev, view: false }))}
          rowData={selectedRow}
        />
      )}
>>>>>>> 49a35bde45ca8a93376e4a35101e143fbe23d8e9
    </div>
  );
};

<<<<<<< HEAD
export default CandidatePage;
=======




export default Candidates;

>>>>>>> 49a35bde45ca8a93376e4a35101e143fbe23d8e9
