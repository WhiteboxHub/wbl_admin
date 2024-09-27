

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import { FaDownload } from "react-icons/fa";
// import AddRowModal from "../../modals/AddRowBatch";
// import EditRowModal from "../../modals/EditRowBatch";
// import ViewRowModal from "../../modals/ViewRowBatch";
// import {
//   AiOutlineEdit,
//   AiOutlineDelete,
//   AiOutlineEye,
//   AiOutlineSearch,
//   AiOutlineReload,
// } from "react-icons/ai";
// import { MdAdd } from "react-icons/md";
// import { Batch } from "../../types/index";

// const Batches = () => {
//   const [rowData, setRowData] = useState<Batch[]>([]);
//   const [columnDefs, setColumnDefs] = useState<
//     { headerName: string; field: string }[]
//   >([]);
//   const [paginationPageSize] = useState<number>(100);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalRows, setTotalRows] = useState<number>(0);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [modalState, setModalState] = useState<{
//     add: boolean;
//     edit: boolean;
//     view: boolean;
//   }>({ add: false, edit: false, view: false });
//   const [selectedRow, setSelectedRow] = useState<Batch | null>(null);
//   const [searchValue, setSearchValue] = useState<string>("");
//   const gridRef = useRef<AgGridReact>(null);

//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   const fetchData = async (searchTerm: string = "") => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${API_URL}/api/batches`, {
//         params: {
//           page: currentPage,
//           pageSize: paginationPageSize,
//           search: searchTerm,
//         },
//         headers: { AuthToken: localStorage.getItem("token") },
//       });
//       const { data, totalRows } = response.data;
//       setRowData(data);
//       setTotalRows(totalRows);
//       setupColumns(data);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const setupColumns = (data: Batch[]) => {
//     if (data.length > 0) {
//       const keys = Object.keys(data[0]).filter(
//         (key) =>
//           ![
//             "exam",
//             "instructors",
//             "topicscovered",
//             "topicsnotcovered",
//             "lastmoddetime",
//           ].includes(key)
//       );
//       const columns = keys.map((key) => ({
//         headerName: key.charAt(0).toUpperCase() + key.slice(1),
//         field: key,
//       }));

//       columns.unshift({
//         headerName: "Serial No",
//         valueGetter: (params: any) =>
//           (currentPage - 1) * paginationPageSize + (params.node.rowIndex + 1),
//         width: 100,
//       });

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
//     fetchData(searchValue); // Fetch data using the search term
//   };
//   const handleDeleteRow = async () => {
//     if (gridRef.current) {
//       const selectedRows = gridRef.current.api.getSelectedRows();
//       if (selectedRows.length > 0) {
//         const batchId = selectedRows[0].batchid || selectedRows[0].id;
//         if (batchId) {
//           const confirmation = window.confirm(
//             `Are you sure you want to delete batch ID ${batchId}?`
//           );
//           if (!confirmation) return;

//           try {
//             await axios.delete(`${API_URL}/api/batches/delete/${batchId}`, {
//               headers: { AuthToken: localStorage.getItem("token") },
//             });
//             alert("Batch deleted successfully.");
//             fetchData(); // Refresh data after delete
//           } catch (error) {
//             console.error("Error deleting batch:", error);
//             alert(
//               `Failed to delete batch: ${
//                 error.response?.data?.message || error.message
//               }`
//             );
//           }
//         } else {
//           alert("No valid batch ID found for the selected row.");
//         }
//       } else {
//         alert("Please select a row to delete.");
//       }
//     }
//   };

//   const handlePageChange = (newPage: number) => setCurrentPage(newPage);

//   const handleViewRow = () => {
//     // Logic for viewing row details
//   };

//   const handleRefresh = () => fetchData();

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Batch Data", 20, 10);

//     // Prepare data for PDF
//     const pdfData = rowData.map((row) => Object.values(row));
//     doc.autoTable({
//       head: [["Column 1", "Column 2", "Column 3"]], // Replace with actual headers
//       body: pdfData,
//     });

//     doc.save("batch_data.pdf");
//   };

//   const totalPages = Math.ceil(totalRows / paginationPageSize);
//   const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="p-4 mt-20 mb-10 ml-20 mr-20 bg-gray-100 rounded-lg shadow-md relative">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold text-gray-800">Batch Management</h1>
//         <div className="flex space-x-2">
//           <button
//             onClick={handleAddRow}
//             className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md transition duration-300 hover:bg-green-700"
//           >
//             <MdAdd className="mr-2" /> Add Batch
//           </button>
//           <button
//             onClick={handleEditRow}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700"
//           >
//             <AiOutlineEdit className="mr-2" /> Edit
//           </button>
//           <button
//             onClick={handleDeleteRow}
//             className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md transition duration-300 hover:bg-red-700"
//           >
//             <AiOutlineDelete className="mr-2" /> Delete
//           </button>
//           <button
//             onClick={handleViewRow}
//             className="flex items-center px-4 py-2 bg-gray-400 text-white rounded-md transition duration-300 hover:bg-gray-700"
//           >
//             <AiOutlineEye className="mr-2" /> View
//           </button>
//           <button
//             onClick={handleRefresh}
//             className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-md transition duration-300 hover:bg-gray-900"
//           >
//             <AiOutlineReload className="mr-2" /> Refresh
//           </button>
//           <button
//             onClick={handleDownloadPDF}
//             className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md transition duration-300 hover:bg-purple-700"
//           >
//             <FaDownload className="mr-2" /> Download PDF
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-48">
//           <span className="text-xl">Loading...</span>
//         </div>
//       ) : (
//         <div
//           className="ag-theme-alpine"
//           style={{ height: "400px", width: "100%", overflowY: "auto" }}
//         >
//           <AgGridReact
//             ref={gridRef}
//             rowData={rowData}
//             columnDefs={columnDefs}
//             pagination={true}
//             paginationPageSize={paginationPageSize}
//             domLayout="autoHeight"
//             rowSelection="single"
//             defaultColDef={{
//               sortable: true,
//               filter: true,
//               cellStyle: { color: "#333" },
//             }}
//           />
//         </div>
//       )}

//       <div className="flex justify-between mt-4">
//         <select
//           className="border rounded-md px-2 py-1 bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-200"
//           value={currentPage}
//           onChange={(e) => handlePageChange(Number(e.target.value))}
//         >
//           {pageOptions.map((page) => (
//             <option key={page} value={page}>
//               Page {page}
//             </option>
//           ))}
//         </select>

//         <div className="flex items-center space-x-2">
//         <button 
//         onClick={handleSearch} // Call handleSearch when clicked
//         className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700"
//       >
//         <AiOutlineSearch className="mr-1" /> Search
//       </button>
//           <input
//             type="text"
//             className="border rounded-md px-2 py-1"
//             placeholder="Search..."
//             value={searchValue}
//             onChange={(e) => setSearchValue(e.target.value)}
//           />
//         </div>
//       </div>

//       {modalState.add && (
//         <AddRowModal
//           isOpen={modalState.add}
//           onClose={() => setModalState((prev) => ({ ...prev, add: false }))}
//           refreshData={fetchData}
//         />
//       )}
//       {modalState.edit && selectedRow && (
//         <EditRowModal
//           isOpen={modalState.edit}
//           onClose={() => setModalState((prev) => ({ ...prev, edit: false }))}
//           rowData={selectedRow}
//           refreshData={fetchData}
//         />
//       )}
//       {modalState.view && selectedRow && (
//         <ViewRowModal
//           isOpen={modalState.view}
//           onClose={() => setModalState((prev) => ({ ...prev, view: false }))}
//           rowData={selectedRow}
//         />
//       )}
//     </div>
//   );
// };

// export default Batches;


"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FaDownload } from "react-icons/fa";
import AddRowModal from "../../modals/AddRowBatch";
import EditRowModal from "../../modals/EditRowBatch";
import ViewRowModal from "../../modals/ViewRowBatch";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineSearch,
  AiOutlineReload,
} from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { Batch } from "../../types/index";

const Batches = () => {
  const [rowData, setRowData] = useState<Batch[]>([]);
  const [columnDefs, setColumnDefs] = useState<
    { headerName: string; field: string }[]
  >([]);
  const [paginationPageSize] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalState, setModalState] = useState<{
    add: boolean;
    edit: boolean;
    view: boolean;
  }>({ add: false, edit: false, view: false });
  const [selectedRow, setSelectedRow] = useState<Batch | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const gridRef = useRef<AgGridReact>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = async (searchTerm: string = "") => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/batches`, {
        params: {
          page: currentPage,
          pageSize: paginationPageSize,
          search: searchTerm,
        },
        headers: { AuthToken: localStorage.getItem("token") },
      });
      const { data, totalRows } = response.data;
      setRowData(data);
      setTotalRows(totalRows);
      setupColumns(data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const setupColumns = (data: Batch[]) => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]).filter(
        (key) =>
          ![
            "exam",
            "instructors",
            "topicscovered",
            "topicsnotcovered",
            "lastmoddetime",
          ].includes(key)
      );
      const columns = keys.map((key) => ({
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        field: key,
      }));

      columns.unshift({
        headerName: "Serial No",
        valueGetter: (params: any) =>
          (currentPage - 1) * paginationPageSize + (params.node.rowIndex + 1),
        width: 100,
      });

      setColumnDefs(columns);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

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

  const handleSearch = () => {
    fetchData(searchValue); // Fetch data using the search term
  };

  const handleDeleteRow = async () => {
    if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      if (selectedRows.length > 0) {
        const batchId = selectedRows[0].batchid || selectedRows[0].id;
        if (batchId) {
          const confirmation = window.confirm(
            `Are you sure you want to delete batch ID ${batchId}?`
          );
          if (!confirmation) return;

          try {
            await axios.delete(`${API_URL}/api/batches/delete/${batchId}`, {
              headers: { AuthToken: localStorage.getItem("token") },
            });
            alert("Batch deleted successfully.");
            fetchData(); // Refresh data after delete
          } catch (error) {
            console.error("Error deleting batch:", error);
            alert(
              `Failed to delete batch: ${
                error.response?.data?.message || error.message
              }`
            );
          }
        } else {
          alert("No valid batch ID found for the selected row.");
        }
      } else {
        alert("Please select a row to delete.");
      }
    }
  };

  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  const handleRefresh = () => {
    setSearchValue(""); // Clear search value before refreshing
    fetchData(); // Re-fetch data
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Batch Data", 20, 10);

    // Prepare data for PDF
    const pdfData = rowData.map((row) => Object.values(row));
    doc.autoTable({
      head: [["Column 1", "Column 2", "Column 3"]], // Replace with actual headers
      body: pdfData,
    });

    doc.save("batch_data.pdf");
  };

  const totalPages = Math.ceil(totalRows / paginationPageSize);
  const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="p-4 mt-20 mb-10 ml-20 mr-20 bg-gray-100 rounded-lg shadow-md relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Batch Management</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleAddRow}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md transition duration-300 hover:bg-green-700"
          >
            <MdAdd className="mr-2" /> Add Batch
          </button>
          <button
            onClick={handleEditRow}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700"
          >
            <AiOutlineEdit className="mr-2" /> Edit
          </button>
          <button
            onClick={handleDeleteRow}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md transition duration-300 hover:bg-red-700"
          >
            <AiOutlineDelete className="mr-2" /> Delete
          </button>
          <button
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

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <span className="text-xl">Loading...</span>
        </div>
      ) : (
        <div
          className="ag-theme-alpine"
          style={{ height: "400px", width: "100%", overflowY: "auto" }}
        >
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            paginationPageSize={paginationPageSize}
            pagination={true}
            onPageChanged={(event) => handlePageChange(event.api.paginationGetCurrentPage())}
            suppressPaginationPanel={true}
            domLayout="autoHeight"
            rowSelection="single"
          />
        </div>
      )}

      <div className="flex justify-end space-x-2 mt-4">
        <span>Total Rows: {totalRows}</span>
        <label>
          Page:{" "}
          <select
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
          >
            {pageOptions.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </label>
      </div>

      <AddRowModal
        isOpen={modalState.add}
        onClose={() => setModalState((prevState) => ({ ...prevState, add: false }))}
      />
      {selectedRow && (
        <>
          <EditRowModal
            isOpen={modalState.edit}
            onClose={() => setModalState((prevState) => ({ ...prevState, edit: false }))}
            rowData={selectedRow}
          />
          <ViewRowModal
            isOpen={modalState.view}
            onClose={() => setModalState((prevState) => ({ ...prevState, view: false }))}
            rowData={selectedRow}
          />
        </>
      )}
    </div>
  );
};

export default Batches;

