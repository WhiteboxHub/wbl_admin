// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { AxiosError } from 'axios';
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import { FaDownload } from "react-icons/fa";
// import AddRowModal from "../../modals/vendor_modals/AddRowVendor";
// import EditRowModal from "../../modals/vendor_modals/EditRowVendor";
// import ViewRowModal from "../../modals/vendor_modals/ViewRowVendor";
// import { MdDelete } from "react-icons/md";
// import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
// import {
//   AiOutlineEdit,
//   AiOutlineEye,
//   AiOutlineSearch,
//   AiOutlineReload,
// } from "react-icons/ai";
// import { MdAdd } from "react-icons/md";

// jsPDF.prototype.autoTable = autoTable;
// const Vendors = () => {
//   const [rowData, setRowData] = useState<Vendor[]>([]);
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
//   const [selectedRow, setSelectedRow] = useState<Vendor | null>(null);
//   const [searchValue, setSearchValue] = useState<string>("");
//   const gridRef = useRef<AgGridReact>(null);

//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${API_URL}/vendor`, {
//         params: {
//           page: currentPage,
//           pageSize: paginationPageSize,
//         },
//         headers: { AuthToken: localStorage.getItem("token") },
//       });

//       const { data, totalRows } = response.data;

//       const dataWithSerials = data.map((item: Vendor) => ({
//         ...item,
//       }));

//       setRowData(dataWithSerials);
//       setTotalRows(totalRows);
//       setupColumns(dataWithSerials);
//     } catch (error) {
//       console.error("Error loading data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchVendors = async (searchQuery = "") => {
//     try {
//       const response = await axios.get(`${API_URL}/vendors/search`, {
//         params: {
//           page: currentPage,
//           pageSize: paginationPageSize,
//           search: searchQuery,
//         },
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

//   const handleSearch = () => {
//     fetchVendors(searchValue);
//   };

//   const setupColumns = (data: Vendor[]) => {
//     if (data.length > 0) {
//       const columns = [
//         ...Object.keys(data[0]).map((key) => ({
//           headerName: key.charAt(0).toUpperCase() + key.slice(1),
//           field: key,
//         })),
//       ];
//       setColumnDefs(columns);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [currentPage]);

//   const handleRefresh = () => {
//     setSearchValue("");
//     fetchData();
//     window.location.reload();
//   };

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
//         const vendorId = selectedRows[0].vendorid || selectedRows[0].id;
//         if (vendorId) {
//           const confirmation = window.confirm(
//             `Are you sure you want to delete vendor ID ${vendorId}?`
//           );
//           if (!confirmation) return;

//           try {
//             await axios.delete(`${API_URL}/vendors/delete/${vendorId}`, {
//               headers: { AuthToken: localStorage.getItem("token") },
//             });
//             alert("Vendor deleted successfully.");
//             fetchData();
//           } catch (error) {
//             const axiosError = error as AxiosError;
//             alert(
//               `Failed to delete vendor: ${
//                 (axiosError.response?.data as ErrorResponse)?.message || axiosError.message
//               }`
//             );
//           }
//         } else {
//           alert("No valid vendor ID found for the selected row.");
//         }
//       } else {
//         alert("Please select a row to delete.");
//       }
//     }
//   };

//   const handlePageChange = (newPage: number) => setCurrentPage(newPage);

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

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Vendor Data", 20, 10);
//     const pdfData = rowData.map((row) => Object.values(row));
//     const headers = columnDefs.map((col) => col.headerName);
//     autoTable(doc, {
//       head: [headers],
//       body: pdfData,
//       theme: 'grid',
//       styles: { fontSize: 5 },
//     });
//     doc.save("vendor_data.pdf");
//   };

//   const totalPages = Math.ceil(totalRows / paginationPageSize);
//   const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="p-4 mt-20 mb-10 ml-20 mr-20 bg-gray-100 rounded-lg shadow-md relative">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl font-bold text-gray-800">Vendor Management</h1>
//         <div className="flex space-x-2">
//           <button
//             onClick={handleAddRow}
//             className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md transition duration-300 hover:bg-green-700"
//           >
//             <MdAdd className="mr-2" /> Add Vendor
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
//             <MdDelete className="mr-2" /> Delete
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
//       <div className="flex mb-4">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchValue}
//           onChange={(e) => setSearchValue(e.target.value)}
//           className="border border-gray-300 rounded-md p-2 w-64"
//         />
//         <button
//           onClick={handleSearch}
//           className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md ml-2 transition duration-300 hover:bg-blue-900"
//         >
//           <AiOutlineSearch className="mr-2" /> Search
//         </button>
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
//             pagination={false}
//             domLayout="normal"
//             rowSelection="multiple"
//             defaultColDef={{
//               sortable: true,
//               filter: true,
//               cellStyle: { color: "#333", fontSize: "0.75rem", padding: "1px" },
//               minWidth: 60,
//               maxWidth: 100,
//             }}
//             rowHeight={30}
//             headerHeight={35}
//           />
//         </div>
//       )}
//       <div className="flex justify-between mt-4">
//         <div className="flex items-center">
//           <button
//             onClick={() => handlePageChange(1)}
//             disabled={currentPage === 1}
//             className="p-2 disabled:opacity-50"
//           >
//             <FaAngleDoubleLeft />
//           </button>
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="p-2 disabled:opacity-50"
//           >
//             <FaChevronLeft />
//           </button>
//           {pageOptions.map((page) => (
//             <button
//               key={page}
//               onClick={() => handlePageChange(page)}
//               className={`px-2 py-1 rounded-md ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
//             >
//               {page}
//             </button>
//           ))}
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="p-2 disabled:opacity-50"
//           >
//             <FaChevronRight />
//           </button>
//           <button
//             onClick={() => handlePageChange(totalPages)}
//             disabled={currentPage === totalPages}
//             className="p-2 disabled:opacity-50"
//           >
//             <FaAngleDoubleRight />
//           </button>
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
//           onRequestClose={() => setModalState((prev) => ({ ...prev, edit: false }))}
//           rowData={selectedRow}
//           onSave={fetchData}
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

// export default Vendors;






"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AxiosError } from 'axios';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FaDownload } from "react-icons/fa";
import AddRowModal from "../../modals/vendor_modals/AddRowVendor";
import EditRowModal from "../../modals/vendor_modals/EditRowVendor";
import ViewRowModal from "../../modals/vendor_modals/ViewRowVendor";
import { MdDelete } from "react-icons/md";
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import {
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineSearch,
  AiOutlineReload,
} from "react-icons/ai";
import { MdAdd } from "react-icons/md";

jsPDF.prototype.autoTable = autoTable;

const Vendors = () => {
  const [rowData, setRowData] = useState<Vendor[]>([]);
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
  const [selectedRow, setSelectedRow] = useState<Vendor | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const gridRef = useRef<AgGridReact>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/vendor`, {
        params: {
          page: currentPage,
          pageSize: paginationPageSize,
        },
        headers: { AuthToken: localStorage.getItem("token") },
      });

      const { data, totalRows } = response.data;

      const dataWithSerials = data.map((item: Vendor) => ({
        ...item,
      }));

      setRowData(dataWithSerials);
      setTotalRows(totalRows);
      setupColumns(dataWithSerials);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVendors = async (searchQuery = "") => {
    try {
      const response = await axios.get(`${API_URL}/vendors/search`, {
        params: {
          page: currentPage,
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
  };

  const handleSearch = () => {
    fetchVendors(searchValue);
  };

  const setupColumns = () => {
    const columns = [
      { headerName: "ID", field: "id", width: 40, editable: false, fixed: true },
      { headerName: "Company Name", field: "companyname", width: 250, editable: true, frozen: true, editoptions: { size: 75, maxlength: 250, style: "text-transform: uppercase" }, fixed: true },
      { headerName: "Status", field: "status", width: 90, editable: true, fixed: true, edittype: "select", editoptions: { value: "Current:Current;Past:Past" } },
      { headerName: "Tier", field: "tier", width: 50, editable: true, fixed: true, edittype: "select", editoptions: { value: "1:1;2:2;3:3" } },
      { headerName: "Culture", field: "culture", width: 50, editable: true, fixed: true, edittype: "select", editoptions: { value: "A:A;B:B;C:C;D:D" } },
      { headerName: "Solicited", field: "solicited", width: 50, editable: true, fixed: true, edittype: "select", editoptions: { value: "Y:Yes;N:No" } },
      {
        headerName: "Rate",
        field: "minrate",
        width: 50,
        editable: true,
        formatter: "currency",
        editoptions: { defaultValue: 62.0 },
        formatoptions: { decimalPlaces: 2, thousandsSeparator: ",", prefix: "\$" },
        sorttype: "currency",
        fixed: true,
        valueFormatter: (params: { value: string; }) => `$${params.value}` // Add this line to format the value with a dollar sign
      },
      { headerName: "HBT", field: "hirebeforeterm", width: 50, editable: true, fixed: true, edittype: "select", editoptions: { value: "Y:Yes;N:No" } },
      { headerName: "HAT", field: "hireafterterm", width: 50, editable: true, fixed: true, edittype: "select", editoptions: { value: "Y:Yes;N:No" } },
      { headerName: "Late Pay", field: "latepayments", width: 50, editable: true, fixed: true, edittype: "select", editoptions: { value: "Y:Yes;N:No" } },
      { headerName: "Net", field: "totalnetterm", width: 70, editable: true, fixed: true, editoptions: { defaultValue: 45 }, editrules: { minValue: 0, maxValue: 80 } },
      { headerName: "Defaulted", field: "defaultedpayment", width: 50, editable: true, fixed: true, edittype: "select", editoptions: { value: "Y:Yes;N:No" } },
      { headerName: "Agr Status", field: "agreementstatus", width: 90, editable: true, fixed: true, edittype: "select", editoptions: { value: "Not Available:Not Available;Not Complete:Not Complete;Complete:Complete" } },
      { headerName: "Url", field: "url", width: 200, editable: true, frozen: true, editoptions: { size: 75, maxlength: 200, style: "text-transform: lowercase" }, formatter: "link", formatoptions: { target: "_blank" }, fixed: true, editrules: { url: true, required: false } },
      { headerName: "Email", field: "email", width: 200, editable: true, editoptions: { size: 75, maxlength: 250, style: "text-transform: lowercase" }, formatter: "email", editrules: { email: true, required: true } },
      { headerName: "Phone", field: "phone", width: 150, editable: true, editoptions: { size: 75, maxlength: 250 } },
      { headerName: "Fax", field: "fax", width: 150, editable: true, editoptions: { size: 75, maxlength: 250 } },
      { headerName: "Address", field: "address", width: 150, editable: true, editoptions: { size: 75, maxlength: 250 } },
      { headerName: "City", field: "city", width: 120, editable: true, editoptions: { size: 75, maxlength: 250 } },
      { headerName: "State", field: "state", width: 120, editable: true, editoptions: { size: 75, maxlength: 250 } },
      { headerName: "Country", field: "country", width: 120, editable: true, editoptions: { size: 75, maxlength: 250 } },
      { headerName: "Zip", field: "zip", width: 120, editable: true, editoptions: { size: 75, maxlength: 250 } },
      { headerName: "HR Name", field: "hrname", width: 200, editable: true, editoptions: { size: 75, maxlength: 200 } },
      { headerName: "HR Email", field: "hremail", width: 150, editable: true, editoptions: { size: 75, maxlength: 200 }, formatter: "email", editrules: { email: true, required: false } },
      { headerName: "HR Phone", field: "hrphone", width: 90, editable: true, editoptions: { size: 75, maxlength: 200 } },
      { headerName: "Twitter", field: "twitter", width: 200, editable: true },
      { headerName: "Facebook", field: "facebook", width: 200, editable: true },
      { headerName: "Linkedin", field: "linkedin", width: 200, editable: true },
      { headerName: "Acct. No", field: "accountnumber", width: 90, editable: true, editoptions: { size: 75, maxlength: 200 } },
      { headerName: "Mgr Name", field: "managername", width: 200, editable: true, editoptions: { size: 75, maxlength: 200 } },
      { headerName: "Mgr Email", field: "manageremail", width: 150, editable: true, editoptions: { size: 75, maxlength: 200 }, formatter: "email", editrules: { email: true, required: false } },
      { headerName: "Mgr Phone", field: "managerphone", width: 90, editable: true, editoptions: { size: 75, maxlength: 200 } },
      { headerName: "Sec Name", field: "secondaryname", width: 200, editable: true, editoptions: { size: 75, maxlength: 200 } },
      { headerName: "Sec Email", field: "secondaryemail", width: 150, editable: true, editoptions: { size: 75, maxlength: 200 }, formatter: "email", editrules: { email: true, required: false } },
      { headerName: "Secondary Phone", field: "secondaryphone", width: 90, editable: true, editoptions: { size: 75, maxlength: 200 } },
      { headerName: "Time Sheet Email", field: "timsheetemail", width: 150, editable: true, editoptions: { size: 75, maxlength: 200 }, formatter: "email", editrules: { email: true, required: false } },
      { headerName: "Agreement Name", field: "agreementname", width: 200, editable: true, editoptions: { size: 75, maxlength: 200 } },
      { headerName: "Agreement Url", field: "agreementlink", width: 200, editable: true, formatter: "link", formatoptions: { target: "_blank" }, editrules: { url: true, required: false } },
      { headerName: "Sub Contractor Url", field: "subcontractorlink", width: 200, editable: true, formatter: "link", formatoptions: { target: "_blank" }, editrules: { url: true, required: false } },
      { headerName: "NSA Url", field: "nonsolicitationlink", width: 200, editable: true, formatter: "link", formatoptions: { target: "_blank" }, editrules: { url: true, required: false } },
      { headerName: "Non Hire Url", field: "nonhirelink", width: 200, editable: true, formatter: "link", formatoptions: { target: "_blank" }, editrules: { url: true, required: false } },
      { headerName: "Clients", field: "clients", width: 400, editable: true, edittype: "textarea", editoptions: { rows: 6, cols: 60 } },
      { headerName: "Notes", field: "notes", width: 400, editable: true, edittype: "textarea", editoptions: { rows: 6, cols: 60 } },
    ];
    setColumnDefs(columns);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleRefresh = () => {
    setSearchValue("");
    fetchData();
    window.location.reload();
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

  const handleDeleteRow = async () => {
    if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      if (selectedRows.length > 0) {
        const vendorId = selectedRows[0].vendorid || selectedRows[0].id;
        if (vendorId) {
          const confirmation = window.confirm(
            `Are you sure you want to delete vendor ID ${vendorId}?`
          );
          if (!confirmation) return;

          try {
            await axios.delete(`${API_URL}/vendors/delete/${vendorId}`, {
              headers: { AuthToken: localStorage.getItem("token") },
            });
            alert("Vendor deleted successfully.");
            fetchData();
          } catch (error) {
            const axiosError = error as AxiosError;
            alert(
              `Failed to delete vendor: ${
                (axiosError.response?.data as ErrorResponse)?.message || axiosError.message
              }`
            );
          }
        } else {
          alert("No valid vendor ID found for the selected row.");
        }
      } else {
        alert("Please select a row to delete.");
      }
    }
  };

  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

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

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Vendor Data", 20, 10);
    const pdfData = rowData.map((row) => Object.values(row));
    const headers = columnDefs.map((col) => col.headerName);
    autoTable(doc, {
      head: [headers],
      body: pdfData,
      theme: 'grid',
      styles: { fontSize: 5 },
    });
    doc.save("vendor_data.pdf");
  };

  const totalPages = Math.ceil(totalRows / paginationPageSize);
  const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="p-4 mt-20 mb-10 ml-20 mr-20 bg-gray-100 rounded-lg shadow-md relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Vendor Management</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleAddRow}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md transition duration-300 hover:bg-green-700"
          >
            <MdAdd className="mr-2" /> Add Vendor
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
            <MdDelete className="mr-2" /> Delete
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
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            pagination={false}
            domLayout="normal"
            rowSelection="multiple"
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable:true,
              cellStyle: { color: "#333", fontSize: "0.75rem", padding: "1px" },
              minWidth: 80,
              maxWidth: 150,
            }}
            rowHeight={30}
            headerHeight={35}
          />
        </div>
      )}
      <div className="flex justify-between mt-4">
        <div className="flex items-center">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="p-2 disabled:opacity-50"
          >
            <FaAngleDoubleLeft />
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
          {pageOptions.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-2 py-1 rounded-md ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 disabled:opacity-50"
          >
            <FaAngleDoubleRight />
          </button>
        </div>
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
          onRequestClose={() => setModalState((prev) => ({ ...prev, edit: false }))}
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
    </div>
  );
};

export default Vendors;
