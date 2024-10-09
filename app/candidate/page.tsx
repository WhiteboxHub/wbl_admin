"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import AddRowModal from "../../modals/AddRowCandidate";
import EditRowModal from "../../modals/EditRowCandidate";
import ViewRowModal from "../../modals/ViewRowCandidate";
// 
import {
  AiOutlineEdit,
 
  AiOutlineSearch,
  AiOutlineReload,
  AiOutlineEye,
  AiOutlineDownload,
} from "react-icons/ai";
import { MdAdd, MdDelete } from "react-icons/md";
import { Candidate } from "../../types/index"; // Adjust the import path accordingly

const Candidates = () => {
  const [rowData, setRowData] = useState<Candidate[]>([]);
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
  const [selectedRow, setSelectedRow] = useState<Candidate | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const gridRef = useRef<AgGridReact>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/candidates`, {
        params: { page: currentPage, pageSize: paginationPageSize },
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
        const candidateId = selectedRows[0].candidateid;
        await axios.delete(`${API_URL}/candidates/delete/${candidateId}`, {
          headers: { AuthToken: localStorage.getItem("token") },
        });
        fetchData(); // Refresh data
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
    <div className="p-4 mt-20 bg-gray-100 rounded-lg shadow-md relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800"> Candidate Management</h1>
        <div className="flex space-x-2"> 
          <button
            onClick={handleAddRow}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md transition duration-300 hover:bg-green-700"
          >
            <MdAdd className="mr-2" /> Add Candidates
          </button>
          <button
            onClick={handleEditRow}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700"
          >
            <AiOutlineEdit className="mr-2" /> Edit
          </button>
          {/* <button
            onClick={handleRefresh}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md transition duration-300 hover:bg-gray-700"
          >
            <AiOutlineReload className="mr-2" /> Refresh
          </button> */}
          <button
            onClick={handleDeleteRow}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md transition duration-300 hover:bg-red-700"
          >
            <MdDelete  className="mr-2" /> Delete
          </button>
          <button
            onClick={handleAddRow}
            className="flex items-center px-4 py-2 bg-gray-400 text-white rounded-md transition duration-300 hover:bg-gray-700"
          >
            <AiOutlineEye className="mr-2" />view
          </button>

          <button
            onClick={handleAddRow}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md transition duration-300 hover:bg-purple-700"
          >
            <AiOutlineDownload className="mr-2" />Download
          </button>
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
      />



        {/* <AgGridReact
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
        /> */}
      </div>

      {
      }
<div className="flex justify-between mt-4">
    <select 
        className="border rounded-md px-2 py-1 bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-200" 
        value={currentPage} 
        onChange={(e) => handlePageChange(Number(e.target.value))}
    >
        {pageOptions.map(page => (
            <option key={page} value={page}>
                Page {page}
            </option>
        ))}
    </select>

    <div className="flex items-center space-x-2">
        <button 
            onClick={fetchData} 
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md transition duration-300 hover:bg-gray-700"
        >
            <AiOutlineReload className="mr-1" /> Reload
        </button>

        <input
            type="text"
            className="border rounded-md px-2 py-1"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
        />

        {

        }
        <button 
    // onClick={handleSearch} // Call handleSearch when clicked
    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700">
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
        onClose={() => setModalState((prev) => ({ ...prev, add: false }))}
        rowData={selectedRow}
      />
    </div>
  );
};

export default Candidates;

