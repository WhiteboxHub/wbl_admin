"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { MdDelete } from "react-icons/md";
import { debounce } from "lodash";
import { faFilePdf, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import withAuth from "@/modals/withAuth";
import { AiOutlineEdit, AiOutlineSearch, AiOutlineReload, AiOutlineEye } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import  {Employee}  from "@/types/index"; // Adjust the import path accordingly
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dropdown, { Option } from "react-dropdown";
import "react-dropdown/style.css";
import AddRowModal from "@/modals/employee_modals/AddEmployee";
import EditRowModal from "@/modals/employee_modals/EditEmployee";
import ViewRowModal from "@/modals/employee_modals/ViewEmployee";

interface OptionType {
  value: string;
  label: JSX.Element | string;
}
const Employees = () => {
  const [rowData, setRowData] = useState<Employee[]>([]);
  const [columnDefs, setColumnDefs] = useState<
    { headerName: string; field: string }[]
  >([]);
  const [paginationPageSize] = useState<number>(200);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [modalState, setModalState] = useState<{
    add: boolean;
    edit: boolean;
    view: boolean;
  }>({ add: false, edit: false, view: false });
  const [selectedRow, setSelectedRow] = useState<Employee | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const gridRef = useRef<AgGridReact>(null);


  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = useCallback(
    async (searchQuery = "", page = 1) => {
      try {
        const response = await axios.get(`${API_URL}/employees/search`, {
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
    },
    [paginationPageSize, API_URL]
  );

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

  const setupColumns = (data: Employee[]) => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      const columns = keys.map((key) => ({
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        field: key,
      }));
      setColumnDefs(columns);
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
        const employeeId = selectedRows[0].id;
        if (employeeId) {
          const confirmation = window.confirm(
            `Are you sure you want to delete employee ID ${employeeId}?`
          );
          if (!confirmation) return;

          try {
            await axios.delete(`${API_URL}/employees/delete/${employeeId}`, {
              headers: { AuthToken: localStorage.getItem("token") },
            });
            alert("Employee deleted successfully.");
            fetchData(searchValue);
          } catch (error) {
            console.error("Error deleting employee:", error);
            alert(
              `Failed to delete employee: ${
                (error as Error).message || "Unknown error occurred"
              }`
            );
          }
        } else {
          alert("No valid employee ID found for the selected row.");
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
        const doc = new jsPDF({ orientation: "landscape" });

        // Add Title
        doc.text("Selected Employee Data", 15, 10);

        // Prepare the data for the table
        const pdfData = selectedRows.map((row) => [
          row.name,
          row.email,
          row.phone,
          row.address,
          row.city,
          row.state,
          row.country,
          row.zip,
          row.salary,
          row.type,
          row.status,
          // Add more fields as needed
        ]);

        // Add autoTable with adjusted styling
        (doc as unknown as { autoTable: (options: unknown) => void }).autoTable(
          {
            head: [
              [
                "Name",
                "Email",
                "Phone",
                "Address",
                "City",
                "State",
                "Country",
                "Zip",
                "Salary",
                "Type",
                "Status",
                // Add more headers as needed
              ],
            ],
            body: pdfData,
            styles: {
              fontSize: 8,
              cellPadding: 4,
            },
            columnStyles: {
              // Adjust column widths as needed
            },
            margin: { top: 15, left: 15, right: 15 },
            pageBreak: "auto",
            didDrawPage: function (data: { settings: { margin: { left: number; right: number; top: number; bottom: number; } } }) {
              doc.setFontSize(10);
              doc.text(
                "Page " + doc.internal.pages.length,
                data.settings.margin.left,
                doc.internal.pageSize.height - 10
              );
            },
          }
        );

        // Save the PDF
        doc.save("Selected_Employee_data.pdf");
      } else {
        alert("Please select a row to download.");
      }
    }
  };

  const handleExportToExcel = () => {
    if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows() as Employee[];
      if (selectedRows.length > 0) {
        const ws = XLSX.utils.json_to_sheet(selectedRows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Selected Employee Data");
        XLSX.writeFile(wb, "Selected_Employee_data.xlsx");
      } else {
        alert("Please select a row to export.");
      }
    }
  };

  const options: OptionType[] = [
    {
      value: "Export to PDF",
      label: (
        <div className="flex items-center">
          <FontAwesomeIcon icon={faFilePdf} className="mr-2" /> Export to PDF
        </div>
      ),
    },
    {
      value: "Export to Excel",
      label: (
        <div className="flex items-center">
          <FontAwesomeIcon icon={faFileExcel} className="mr-2" /> Export to
          Excel
        </div>
      ),
    },
  ];

  const defaultOption = "Download";

  const totalPages = Math.ceil(totalRows / paginationPageSize);
  const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="relative">
      <div className="p-4 mt-20 mb-10 ml-20 mr-20 bg-gray-100 rounded-lg shadow-md relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Employee List </h1>

          <div className="flex space-x-2">
            <button
              onClick={handleAddRow}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md transition duration-300 hover:bg-green-700"
            >
              <MdAdd className="mr-2" /> Add Employee
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
            <Dropdown
              options={options as Option[]} // Cast options as Option[] since label is JSX now
              value={defaultOption} // Set default option
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
              resizable: true, // Enable column resizing
              cellStyle: { color: "#333", fontSize: "0.75rem", padding: "1px" },
              minWidth: 80,
              maxWidth: 150,
            }}
            rowHeight={30}
            headerHeight={35}
          />
        </div>
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

export default withAuth(Employees);
