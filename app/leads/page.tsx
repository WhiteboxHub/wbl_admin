"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

import "jspdf-autotable";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import * as XLSX from "xlsx";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FaDownload } from "react-icons/fa";
import AddRowModal from "../../modals/AddRowModal";
import EditRowModal from "../../modals/EditRowModal";
import ViewRowModal from "../../modals/ViewRowModal";
import { MdDelete } from "react-icons/md";
import { debounce } from "lodash";
import jsPDF from "jspdf";
import "jspdf-autotable";


import {
  AiOutlineEdit,

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
  const [paginationPageSize] = useState<number>(200);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [modalState, setModalState] = useState<{
    add: boolean;
    edit: boolean;
    view: boolean;
  }>({ add: false, edit: false, view: false });
  const [selectedRow, setSelectedRow] = useState<Lead | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const gridRef = useRef<AgGridReact>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = useCallback(async (searchQuery = "", page = 1) => {
    try {
      const response = await axios.get(`${API_URL}/leads/search`, {
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
            await axios.delete(`${API_URL}/leads/delete/${leadId}`, {
              headers: { AuthToken: localStorage.getItem("token") },
            });
            alert("Lead deleted successfully.");
            fetchData(searchValue);
          } catch (error) {
            console.error("Error deleting lead:", error);
            alert(
              `Failed to delete lead: ${
                (error as Error).message || "Unknown error occurred"
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

  // const handleDownloadPDF = () => {
  //   if (gridRef.current) {
  //     const selectedRows = gridRef.current.api.getSelectedRows();
  //     if (selectedRows.length > 0) {
  //       const doc = new jsPDF();
  //       doc.text("Selected Lead Data", 20, 10);
  
  //       const pdfData = selectedRows.map((row) => [
  //         row.name,
  //         row.email,
  //         row.phone,
  //         row.address,
  //         row.city,
  //         row.state,
  //         row.country,
  //         row.zip,
  //         row.spousename,
  //         row.spouseemail,
  //         row.spousephone,
  //         row.address,
  //         row.spouseoccupationinfo,
  //         row.state,
  //         row.country,
  //         row.zip,
  //         row.faq,
  //         row.callsmade,
  //         row.closedate,
  //         row.notes,
  //       ]);
  
  //       (doc as unknown as { autoTable: (options: unknown) => void }).autoTable({
  //         head: [["Name", "Email", "Phone", "Address", "City", "State", "Country", "Zip", "Spouse Name", "Spouse Email", "Spouse Phone","address","spouseoccupationinfo","state","country","faq","zip","callsmade","closedate","notes"]],
  //         body: pdfData,
  //       });
  
  //       doc.save("Selected_Lead_data.pdf");
  //     } else {
  //       alert("Please select a row to download.");
  //     }
  //   }
  // };


//   const handleDownloadPDF = () => {
//     if (gridRef.current) {
//         const selectedRows = gridRef.current.api.getSelectedRows();
//         if (selectedRows.length > 0) {
//             const doc = new jsPDF({ orientation: "landscape" }); // Landscape mode for more horizontal space
//             doc.text("Selected Lead Data", 14, 10);
  
//             const pdfData = selectedRows.map((row) => [
//                 row.name,
//                 row.email,
//                 row.phone,
//                 row.address,
//                 row.city,
//                 row.state,
//                 row.country,
//                 row.zip,
//                 row.course,
//                 row.status,
//                 row.spousename,
//                 row.spouseemail,
//                 row.spousephone,
//                 row.faq,
//                 row.callsmade,
//                 row.closedate,
//                 row.notes,
//             ]);

//             (doc as unknown as { autoTable: (options: unknown) => void }).autoTable({
//                 head: [["Name", "Email", "Phone", "Address", "City", "State", "Country","Course","Status", "Spouse Name", "Spouse Email", "Spouse Phone", "Spouse Occupation", "FAQ", "Calls Made", "Close Date", "Notes"]],
//                 body: pdfData,
//                 styles: {
//                     fontSize: 10, // Adjust font size to fit more content
//                     cellPadding: 5, // Add padding for better readability
//                 },
//                 columnStyles: {
//                     0: { cellWidth: 30 }, // Adjust column widths
//                     1: { cellWidth: 30 }, 
//                     2: { cellWidth: 30 },
//                     3: { cellWidth: 30 },
//                     4: { cellWidth: 30 },
//                     5: { cellWidth: 35 },
//                     6: { cellWidth: 30 },
//                     7: { cellWidth: 35 },
//                     8: { cellWidth: 30 },
//                     9: { cellWidth: 30 },
//                     10: { cellWidth: 35 },
//                     11: { cellWidth: 30 },
//                     12: { cellWidth: 35 },
//                     13: { cellWidth: 30 },
//                     14: { cellWidth: 30 },
//                     15: { cellWidth: 40 },
//                 },
//                 margin: { top: 10 }, // Adjust margin to fit header
//             });

//             doc.save("Selected_Lead_data.pdf");
//         } else {
//             alert("Please select a row to download.");
//         }
//     }
// };




const handleDownloadPDF = () => {
  if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      if (selectedRows.length > 0) {
          const doc = new jsPDF({ orientation: "landscape" });

          // Add Title
          doc.text("Selected Lead Data", 15, 10);

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
              row.course,
              row.status,
              row.spousename,
              row.spouseemail,
              row.spousephone,
              row.faq,
              row.callsmade,
              row.closedate,
              row.notes,
          ]);

          // Add autoTable with adjusted styling
          (doc as unknown as { autoTable: (options: unknown) => void }).autoTable({
              head: [[
                  "Name", "Email", "Phone", "Address", "City", "State", "Country", "Zip", 
                  "Course", "Status", "Spouse Name", "Spouse Email", "Spouse Phone", 
                  "FAQ", "Calls Made", "Close Date", "Notes"
              ]],
              body: pdfData,
              styles: {
                  fontSize: 8, // Slightly smaller font
                  cellPadding: 4, // Add padding for readability
              },
              columnStyles: {
                  0: { cellWidth: 20 }, // Adjust column widths based on content
                  1: { cellWidth: 20 },
                  2: { cellWidth: 20 },
                  3: { cellWidth: 20 },
                  4: { cellWidth: 20 },
                  5: { cellWidth: 20 },
                  6: { cellWidth: 20 },
                  7: { cellWidth: 20 },
                  8: { cellWidth: 20 },
                  9: { cellWidth: 20 },
                  10: { cellWidth: 20 },
                  11: { cellWidth: 20 },
                  12: { cellWidth: 20 },
                  13: { cellWidth: 20 },
                  14: { cellWidth: 20 },
                  15: { cellWidth: 20 },
                  16: { cellWidth: 20 }, // Adjust based on importance of content
              },
              margin: { top: 15, left: 15, right: 15 }, // Adjust margins for better fit
              pageBreak: 'auto', // Automatically break table rows if too long
              didDrawPage: function (data) {
                  // Draw custom header/footer if needed
                  doc.setFontSize(10);
                  doc.text('Page ' + doc.internal.getNumberOfPages(), data.settings.margin.left, doc.internal.pageSize.height - 10);
              },
          });

          // Save the PDF
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
            <MdDelete className="mr-2" /> Delete
          </button>
          <button
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
            domLayout="normal"
            rowSelection="single"
            defaultColDef={{
              sortable: true,
              filter: true,
              cellStyle: { color: "#333", fontSize: "0.75rem", padding: "1px" },
              minWidth: 60,
              maxWidth: 100,
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