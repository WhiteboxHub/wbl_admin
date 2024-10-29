"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { AxiosError } from 'axios';
import "ag-grid-community/styles/ag-grid.css";
import { FaDownload } from "react-icons/fa";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import "ag-grid-community/styles/ag-theme-alpine.css";
import AddRowModal from "../../modals/list_vendor_modals/AddRowListVendor";
import EditRowModal from "../../modals/list_vendor_modals/EditRowListVendor";
import ViewRowModal from "../../modals/list_vendor_modals/ViewRowListVendor";
import withAuth from "@/modals/withAuth";

import {
  AiOutlineEdit,
  AiOutlineSearch,
  AiOutlineReload,
  AiOutlineEye,
} from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { Po, Vendor } from "../../types/index"; // Adjust the import path accordingly


const AllListVendor = () => {
  const [rowData, setRowData] = useState<Vendor[]>([]);

  const [columnDefs, setColumnDefs] = useState<
    { headerName: string; field: string }[]
  >([]);
  const [paginationPageSize] = useState<number>(200); // Increased records per page to 200
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  // const [loading,] = useState<boolean>(false);
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
      const response = await axios.get(`${API_URL}/allvendors`, {
        params: {
          page: currentPage,
          pageSize: paginationPageSize,
        },
        headers: { AuthToken: localStorage.getItem("token") },
      });
  
      const { data, totalRows } = response.data;
  
      // Add serial numbers to each row
      const dataWithSerials = data.map((item: Po) => ({
        ...item,
        // serialNo: (currentPage - 1) * paginationPageSize + index + 1,
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

  interface ErrorResponse {
    message: string;
    // Add other properties if needed
  }

  const fetchBatches = async (searchQuery = "") => {
    try {
      const response = await axios.get(`${API_URL}/allvendors/search`, {
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

  // interface BatchNameRendererProps {
  //   data: {
  //     isBatch: boolean; // Adjust the type if necessary
  //     batchname: string | number | null | undefined; // Adjust the type if necessary
  //   };
  // }

  // const BatchNameRenderer: React.FC<BatchNameRendererProps> = (props) => {
  //   return (
  //     <div style={{ height: '100%', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
  //       {props.data.isBatch ? (
  //         <span className='font-bold'>{props.data.batchname}</span> // Bold batchname
  //       ) : (
  //         ''
  //       )}
  //     </div>
  //   );
  // };
  const setupColumns = (data: Overdue[]) => {
    if (data.length > 0) {
      const columns = [
        ...Object.keys(data[0]).map((key) => ({
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          field: key,
        })),
      ];
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
    doc.text("Vendor Data", 10, 10);

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
    doc.save("vendor_data.pdf");
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

  const handleDeleteRow = async () => {
    if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      if (selectedRows.length > 0) {
        const vendorName = selectedRows[0].name; // Assuming 'name' is the property for the vendor's name

        if (vendorName) {
          const confirmation = window.confirm(
            `Are you sure you want to delete vendor ${vendorName}?`
          );
          if (!confirmation) return;

          try {
            await axios.delete(`${API_URL}/allvendors/delete/${vendorName}`, {
              headers: { AuthToken: localStorage.getItem("token") },
            });
            alert(`Vendor ${vendorName} deleted successfully.`);
            fetchData(); // Refresh data after delete
          } catch (error) {
            const axiosError = error as AxiosError;
            alert(
              `Failed to delete vendor: ${
                (axiosError.response?.data as ErrorResponse)?.message || axiosError.message
              }`
            );
          }
        } else {
          alert("No valid vendor name found for the selected row.");
        }
      } else {
        alert("Please select a row to delete.");
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalRows / paginationPageSize);
  const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="p-4 mt-20 mb-10 ml-20 mr-20 bg-gray-100 rounded-lg shadow-md relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Recruiters Management</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleAddRow}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md transition duration-300 hover:bg-green-700"
          >
            <MdAdd className="mr-2" /> Add
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
            domLayout="normal"
            rowSelection="multiple"
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true,
              cellStyle: { color: "#333", fontSize: "0.75rem", padding: "1px" },
              minWidth: 80,
              maxWidth: 150,
            }}
            rowHeight={30}
            headerHeight={35}
            getRowHeight={(params) => (params.data.isBatch ? 40 : 30)} // Set a taller height for batch rows
            getRowStyle={(params) => ({
              paddingTop: "5px",
              backgroundColor: params.data.isBatch ? '#f0f0f0' : '#ffffff', // Different background for batch rows
              fontWeight: params.data.isBatch ? 'bold' : 'normal', // Bold text for batch rows
            })} // Set a taller height for batch rows
            // components={{
            //   batchNameRenderer: BatchNameRenderer, // Custom component for rendering batch names
            // }}
          />
          }
        </div>
      )}
      <div className="flex justify-between mt-4">
        <div className="flex items-center">
          {/* Double Left Icon */}
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="p-2 disabled:opacity-50"
          >
            <FaAngleDoubleLeft />
          </button>
          {/* Left Icon */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
          {/* Page Numbers */}
          {pageOptions.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-2 py-1 rounded-md ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {page}
            </button>
          ))}
          {/* Right Icon */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
          {/* Double Right Icon */}
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
          onRequestClose={() => setModalState({ ...modalState, edit: false })}
          rowData={selectedRow}
          onSave={fetchData}
        />
      )}
      {modalState.view && selectedRow && (
        <ViewRowModal
          isOpen={modalState.view}
          onClose={() => setModalState((prev) => ({ ...prev, view: false }))}
          onRequestClose={() => setModalState((prev) => ({ ...prev, view: false }))}  // Pass the missing prop
          rowData={selectedRow}
        />
      )}
    </div>
  );
};

export default withAuth(AllListVendor);
