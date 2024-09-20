// // app/leads/page.tsx

// 'use client'
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import AddRowModal from '../../modals/AddRowModal';
// import Modal from 'react-modal';
// import EditRowModal from '../../modals/EditRowModal';
// import ViewRowModal from '../../modals/ViewRowModal';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import { useRouter } from 'next/navigation';

// // Initialize react-modal
// Modal.setAppElement('#__next');

// const Leads = () => {
//   const [allData, setAllData] = useState<any[]>([]);
//   const [filteredData, setFilteredData] = useState<any[]>([]);
//   const [rowData, setRowData] = useState<any[]>([]);
//   const [columnDefs, setColumnDefs] = useState<any[]>([]);
//   const [paginationPageSize, setPaginationPageSize] = useState<number>(100);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalRows, setTotalRows] = useState<number>(0);
  
//   const [modalState, setModalState] = useState<{ add: boolean; edit: boolean; view: boolean }>({
//     add: false,
//     edit: false,
//     view: false,
//   });
//   const [selectedRow, setSelectedRow] = useState<any>(null);
//   const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
//   const [searchValue, setSearchValue] = useState<string>('');
//   const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
//   const gridRef = useRef<any>(null);
//   const router = useRouter();
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);  // Ref to store timeout ID


//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   // const handleOpenModal = (rowData: any) => {
//   //   if (rowData && rowData.leadid) {
//   //     setSelectedRow(rowData);
//   //     setModalState(prevState => ({ ...prevState, view: true }));
//   //   } else {
//   //     console.error('Row data does not contain a leadid:', rowData);
//   //   }
//   // };

//   const handleOpenModal = (rowData: Lead) => {
//     if (rowData && rowData.leadid) {
//       setSelectedRow(rowData);
//       setModalState(prevState => ({ ...prevState, view: true }));
//     } else {
//       console.error('Row data does not contain a leadid:', rowData);
//     }
//   };
  
//   const handleCloseModal = () => {
//     setModalState({ add: false, edit: false, view: false });
//     setSelectedRow(null);
//   };

//   const handleUpdateRow = async (formData: Lead) => {
//     try {
//       const { leadid, ...data } = formData;
//       if (!leadid) {
//         throw new Error('leadid is missing from formData');
//       }
//       await axios.put(`${API_URL}/api/leads/${leadid}`, data, {
//         headers: { AuthToken: localStorage.getItem('token') },
//       });
//       fetchData();
//       setMessage({ text: 'Row updated successfully!', type: 'success' });
//     } catch (error) {
//       console.error('Error updating row data:', error);
//       setMessage({ text: 'Error updating row. Please try again.', type: 'error' });
//     }
//   };

// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     if (!token) {
// //       router.push('/login'); // Redirect to login if no token
// //       return;
// //     }
    
// //     fetchData();

// //     const handleKeyDown = (event: KeyboardEvent) => {
// //       if (event.key === 'Escape') {
// //         resetSearch();
// //       }
// //     };
// //     window.addEventListener('keydown', handleKeyDown);
// //     return () => {
// //       window.removeEventListener('keydown', handleKeyDown
// //     };
// //   }, [currentPage, paginationPageSize, router]);

// //   const fetchData = async () => {
// //     try {
// //       const response = await axios.get('`${API_URL}/api/leads', {
// //         params: { page: currentPage, pageSize: paginationPageSize },
// //         headers: { AuthToken: localStorage.getItem('token') },
// //       });
// //       const { data, totalRows } = response.data;
// //       setAllData(data);
// //       setFilteredData(data);
// //       setTotalRows(totalRows);
// //       updateRowData(data);
// //       setupColumns(data);
// //       setMessage({ text: '', type: 'success' });
// //     } catch (error) {
// //       setMessage({ text: 'Error loading data. Please try again.', type: 'error' });
// //     }
// //   };


// interface Lead {
//   leadid: number;
//   // Add other expected fields
//   [key: string]: any; // Allow additional fields
// }


// useEffect(() => {
//     console.log('Fetching data...');
//     fetchData();
//   }, [currentPage, paginationPageSize, router]);
  
//   const fetchData = async () => {
//     console.log('Fetching data from API...')
//     try {
//       const response = await axios.get(`${API_URL}/api/leads`, {
//         params: { page: currentPage, pageSize: paginationPageSize },
//         headers: { AuthToken: localStorage.getItem('token') },
//       });
//       console.log('Data fetched:', response.data);
//       const { data, totalRows } = response.data;
//       setAllData(data);
//       setFilteredData(data);
//       setTotalRows(totalRows);
//       updateRowData(data);
//       setupColumns(data);
//       setMessage({ text: '', type: 'success' });
//     } catch (error) {
//       console.error('Error loading data:', error);
//       setMessage({ text: 'Error loading data. Please try again.', type: 'error' });
//     }
//   };
  

//   const setupColumns = (data: Lead[]) => {
//     if (data.length > 0) {
//       const keys = Object.keys(data[0]);
//       const columns = keys.map(key => ({
//         headerName: key.charAt(0).toUpperCase() + key.slice(1),
//         field: key,
//       }));
//       setColumnDefs(columns);
//     }
//   };

//   const updateRowData = (data: any[]) => {
//     setRowData(data);
//   };

//   const handleAddRow = () => setModalState(prevState => ({ ...prevState, add: true }));

//   const handleSaveRow = async (newRow: any) => {
//     try {
//       await axios.post(`${API_URL}/api/insert/leads`, newRow, {
//         headers: { AuthToken: localStorage.getItem('token') },
//       });
//       fetchData();
//       handleCloseModal();
//       setMessage({ text: 'Row added successfully!', type: 'success' });
//     } catch (error) {
//       console.error('Error saving row data:', error);
//       setMessage({ text: 'Error adding row. Please try again.', type: 'error' });
//     }
//   };

//   const handleEditUpdatedRow = async (newRow: any) => {
//     try {
//       await axios.put(`${API_URL}/api/leads/update/${newRow.leadid}`, newRow, {
//         headers: { AuthToken: localStorage.getItem('token') },
//       });
//       fetchData();
//       handleCloseModal();
//       setMessage({ text: 'Row updated successfully!', type: 'success' });
//     } catch (error) {
//       console.error('Error updating row data:', error);
//       setMessage({ text: 'Error updating row. Please try again.', type: 'error' });
//     }
//   };

//   const handleEditRow = () => {
//     if (gridRef.current) {
//       const selectedRows = gridRef.current.api.getSelectedRows();
//       if (selectedRows.length > 0) {
//         setSelectedRow(selectedRows[0]);
//         setModalState(prevState => ({ ...prevState, edit: true }));
//       } else {
//         alert('Please select a row to edit.');
//       }
//     }
//   };

//   const handleExportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(rowData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Leads');
//     XLSX.writeFile(wb, 'leads.xlsx');
//   };

//   const handleExportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Leads Data', 10, 10);
//     rowData.forEach((row, index) => {
//       doc.text(Object.values(row).join(', '), 10, 20 + index * 10);
//     });
//     doc.save('leads.pdf');
//   };

//   const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const newPage = Number(event.target.value);
//     setCurrentPage(newPage);
//     const startIndex = (newPage - 1) * paginationPageSize;
//     updateRowData(filteredData.slice(startIndex, startIndex + paginationPageSize));
//   };

//   const handleSearchToggle = () => setIsSearchVisible(prevState => !prevState);

//   const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchValue(event.target.value);

//     // Clear the previous timeout
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }

//     // Set a new timeout
//     timeoutRef.current = setTimeout(() => handleSearch(), 2000);
//   };

//   const handleSearch = async () => {
//     if (!searchValue.trim()) {
//       resetSearch();
//       return;
//     }
//     try {
//       const response = await axios.get(`${API_URL}/api/leads/search/${searchValue}`, {
//         headers: { AuthToken: localStorage.getItem('token') },
//       });
//       const filtered = response.data;
//       setFilteredData(filtered);
//       setTotalRows(filtered.length);
//       setCurrentPage(1);
//       const startIndex = 0;
//       updateRowData(filtered.slice(startIndex, paginationPageSize));
//     } catch (error) {
//       setMessage({ text: 'Error fetching search results. Please try again.', type: 'error' });
//     }
//   };

//   const resetSearch = () => {
//     setSearchValue('');
//     fetchData();
//     setIsSearchVisible(false);
//   };

//   const handleReloadGrid = () => {
//     fetchData();
//   };

//   const handleViewRow = () => {
//     if (gridRef.current) {
//       const selectedRows = gridRef.current.api.getSelectedRows();
//       if (selectedRows.length > 0) {
//         setSelectedRow(selectedRows[0]);
//         setModalState(prevState => ({ ...prevState, view: true }));
//       } else {
//         alert('Please select a row to view.');
//       }
//     }
//   };

//   const handleLogoutAction = () => {
//     localStorage.clear();
//     router.push('/login');
//   };

//   const totalPages = Math.ceil(totalRows / paginationPageSize);
//   const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

//   const gridOptions = {
//     rowSelection: 'single',
//     onRowClicked: (event: any) => event.node.setSelected(true),
//     getRowStyle: (params: any) => (params.node.isSelected() ? { backgroundColor: 'lightyellow' } : null),
//   };

//   return (
//     <div className="custom-grid-container">
//       <div className="header-box">
//         <h1 className="header-title text-red-500">Lead Management</h1>
//         <div className="header-controls">
//           <select
//             className="page-dropdown text-black"
//             value={currentPage}
//             onChange={handlePageChange}
//           >
//             {pageOptions.map(page => (
//               <option key={page} value={page}>
//                 {page}
//               </option>
//             ))}
//           </select>
//           <button
//             onClick={handleLogoutAction}
//             type="button"
//             className="w-full ml-3 px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//       <div className="ag-theme-alpine">
//         <AgGridReact
//           ref={gridRef}
//           gridOptions={gridOptions}
//           rowData={rowData}
//           columnDefs={columnDefs}
//           pagination={true}
//           paginationPageSize={paginationPageSize}
//         />
//       </div>
//       {isSearchVisible && (
//         <div className="search-container">
//           <input
//             type="text"
//             className="search-input text-black"
//             placeholder="Enter name to search"
//             value={searchValue}
//             onChange={handleSearchInputChange}
//           />
//           <button onClick={handleSearch}>Search</button>
//         </div>
//       )}
//       {!modalState.view && (
//         <div className="action-buttons">
//           <button className="action-button" title="Add New Row" onClick={handleAddRow}>+</button>
//           <button className="action-button" title="Edit Selected Row" onClick={handleEditRow}>✏️</button>
//           <button className="action-button" title="View Selected Row" onClick={handleViewRow}>📄</button>
//           <button className="action-button" title="Find Records" onClick={handleSearchToggle}>🔍</button>
//           <button className="action-button" title="Reload Grid" onClick={handleReloadGrid}>🔄</button>
//           <button className="action-button" title="Export to Excel" onClick={handleExportToExcel}>📊</button>
//           <button className="action-button" title="Export to PDF" onClick={handleExportToPDF}>📄</button>
//         </div>
//       )}
//       {message && (
//         <div className={`message ${message.type}`}>
//           {message.text}
//         </div>
//       )}
//       <AddRowModal
//         isOpen={modalState.add}
//         onRequestClose={handleCloseModal}
//         onSave={handleSaveRow}
//       />
//       <EditRowModal
//         isOpen={modalState.edit}
//         onRequestClose={handleCloseModal}
//         rowData={selectedRow}
//         onSave={handleEditUpdatedRow}
//       />
//       <ViewRowModal
//         isOpen={modalState.view}
//         onRequestClose={handleCloseModal}
//         rowData={selectedRow}
//       />
//     </div>
//   );
// };

// export default Leads;



// app/leads/page.tsx

'use client'
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AddRowModal from '../../modals/AddRowModal';
import Modal from 'react-modal';
import EditRowModal from '../../modals/EditRowModal';
import ViewRowModal from '../../modals/ViewRowModal';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { useRouter } from 'next/navigation';

// Initialize react-modal
Modal.setAppElement('#__next');

const Leads = () => {
  const [allData, setAllData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [rowData, setRowData] = useState<any[]>([]);
  const [columnDefs, setColumnDefs] = useState<any[]>([]);
  const [paginationPageSize, setPaginationPageSize] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  
  const [modalState, setModalState] = useState<{ add: boolean; edit: boolean; view: boolean }>({
    add: false,
    edit: false,
    view: false,
  });
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const gridRef = useRef<any>(null);
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);  // Ref to store timeout ID


  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // const handleOpenModal = (rowData: any) => {
  //   if (rowData && rowData.leadid) {
  //     setSelectedRow(rowData);
  //     setModalState(prevState => ({ ...prevState, view: true }));
  //   } else {
  //     console.error('Row data does not contain a leadid:', rowData);
  //   }
  // };

  const handleOpenModal = (rowData: Lead) => {
    if (rowData && rowData.leadid) {
      setSelectedRow(rowData);
      setModalState(prevState => ({ ...prevState, view: true }));
    } else {
      console.error('Row data does not contain a leadid:', rowData);
    }
  };
  
  const handleCloseModal = () => {
    setModalState({ add: false, edit: false, view: false });
    setSelectedRow(null);
  };

  const handleUpdateRow = async (formData: Lead) => {
    try {
      const { leadid, ...data } = formData;
      if (!leadid) {
        throw new Error('leadid is missing from formData');
      }
      await axios.put(`${API_URL}/api/leads/${leadid}`, data, {
        headers: { AuthToken: localStorage.getItem('token') },
      });
      fetchData();
      setMessage({ text: 'Row updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error updating row data:', error);
      setMessage({ text: 'Error updating row. Please try again.', type: 'error' });
    }
  };

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login'); // Redirect to login if no token
//       return;
//     }
    
//     fetchData();

//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         resetSearch();
//       }
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown
//     };
//   }, [currentPage, paginationPageSize, router]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('`${API_URL}/api/leads', {
//         params: { page: currentPage, pageSize: paginationPageSize },
//         headers: { AuthToken: localStorage.getItem('token') },
//       });
//       const { data, totalRows } = response.data;
//       setAllData(data);
//       setFilteredData(data);
//       setTotalRows(totalRows);
//       updateRowData(data);
//       setupColumns(data);
//       setMessage({ text: '', type: 'success' });
//     } catch (error) {
//       setMessage({ text: 'Error loading data. Please try again.', type: 'error' });
//     }
//   };


interface Lead {
  leadid: number;
  // Add other expected fields
  [key: string]: any; // Allow additional fields
}


useEffect(() => {
    console.log('Fetching data...');
    fetchData();
  }, [currentPage, paginationPageSize, router]);
  
  const fetchData = async () => {
    console.log('Fetching data from API...')
    try {
      const response = await axios.get(`${API_URL}/api/leads`, {
        params: { page: currentPage, pageSize: paginationPageSize },
        headers: { AuthToken: localStorage.getItem('token') },
      });
      console.log('Data fetched:', response.data);
      const { data, totalRows } = response.data;
      setAllData(data);
      setFilteredData(data);
      setTotalRows(totalRows);
      updateRowData(data);
      setupColumns(data);
      setMessage({ text: '', type: 'success' });
    } catch (error) {
      console.error('Error loading data:', error);
      setMessage({ text: 'Error loading data. Please try again.', type: 'error' });
    }
  };
  

  const setupColumns = (data: Lead[]) => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      const columns = keys.map(key => ({
        headerName: key.charAt(0).toUpperCase() + key.slice(1),
        field: key,
      }));
      setColumnDefs(columns);
    }
  };

  const updateRowData = (data: any[]) => {
    setRowData(data);
  };

  const handleAddRow = () => setModalState(prevState => ({ ...prevState, add: true }));

  const handleSaveRow = async (newRow: any) => {
    try {
      await axios.post(`${API_URL}/api/insert/leads`, newRow, {
        headers: { AuthToken: localStorage.getItem('token') },
      });
      fetchData();
      handleCloseModal();
      setMessage({ text: 'Row added successfully!', type: 'success' });
    } catch (error) {
      console.error('Error saving row data:', error);
      setMessage({ text: 'Error adding row. Please try again.', type: 'error' });
    }
  };

  const handleEditUpdatedRow = async (newRow: any) => {
    try {
      await axios.put(`${API_URL}/api/leads/update/${newRow.leadid}`, newRow, {
        headers: { AuthToken: localStorage.getItem('token') },
      });
      fetchData();
      handleCloseModal();
      setMessage({ text: 'Row updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error updating row data:', error);
      setMessage({ text: 'Error updating row. Please try again.', type: 'error' });
    }
  };

  const handleEditRow = () => {
    if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      if (selectedRows.length > 0) {
        setSelectedRow(selectedRows[0]);
        setModalState(prevState => ({ ...prevState, edit: true }));
      } else {
        alert('Please select a row to edit.');
      }
    }
  };

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rowData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Leads');
    XLSX.writeFile(wb, 'leads.xlsx');
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Leads Data', 10, 10);
    rowData.forEach((row, index) => {
      doc.text(Object.values(row).join(', '), 10, 20 + index * 10);
    });
    doc.save('leads.pdf');
  };

  const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPage = Number(event.target.value);
    setCurrentPage(newPage);
    const startIndex = (newPage - 1) * paginationPageSize;
    updateRowData(filteredData.slice(startIndex, startIndex + paginationPageSize));
  };

  const handleSearchToggle = () => setIsSearchVisible(prevState => !prevState);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);

    // Clear the previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout
    timeoutRef.current = setTimeout(() => handleSearch(), 2000);
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      resetSearch();
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/api/leads/search/${searchValue}`, {
        headers: { AuthToken: localStorage.getItem('token') },
      });
      const filtered = response.data;
      setFilteredData(filtered);
      setTotalRows(filtered.length);
      setCurrentPage(1);
      const startIndex = 0;
      updateRowData(filtered.slice(startIndex, paginationPageSize));
    } catch (error) {
      setMessage({ text: 'Error fetching search results. Please try again.', type: 'error' });
    }
  };

  const resetSearch = () => {
    setSearchValue('');
    fetchData();
    setIsSearchVisible(false);
  };

  const handleReloadGrid = () => {
    fetchData();
  };

  const handleViewRow = () => {
    if (gridRef.current) {
      const selectedRows = gridRef.current.api.getSelectedRows();
      if (selectedRows.length > 0) {
        setSelectedRow(selectedRows[0]);
        setModalState(prevState => ({ ...prevState, view: true }));
      } else {
        alert('Please select a row to view.');
      }
    }
  };

  const handleLogoutAction = () => {
    localStorage.clear();
    router.push('/login');
  };

  const totalPages = Math.ceil(totalRows / paginationPageSize);
  const pageOptions = Array.from({ length: totalPages }, (_, i) => i + 1);

  const gridOptions = {
    rowSelection: 'single',
    onRowClicked: (event: { node: { setSelected: (selected: boolean) => void } }) =>
      event.node.setSelected(true),
    getRowStyle: (params: { node: { isSelected: () => boolean } }) =>
      params.node.isSelected() ? { backgroundColor: 'lightyellow' } : null,
  };
  
  return (
    <div className="custom-grid-container">
      <div className="header-box">
        <h1 className="header-title text-red-500">Lead Management</h1>
        <div className="header-controls">
          <select
            className="page-dropdown text-black"
            value={currentPage}
            onChange={handlePageChange}
          >
            {pageOptions.map(page => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
          <button
            onClick={handleLogoutAction}
            type="button"
            className="w-full ml-3 px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          gridOptions={gridOptions}
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={paginationPageSize}
        />
      </div>
      {isSearchVisible && (
        <div className="search-container">
          <input
            type="text"
            className="search-input text-black"
            placeholder="Enter name to search"
            value={searchValue}
            onChange={handleSearchInputChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
      {!modalState.view && (
        <div className="action-buttons">
          <button className="action-button" title="Add New Row" onClick={handleAddRow}>+</button>
          <button className="action-button" title="Edit Selected Row" onClick={handleEditRow}>✏️</button>
          <button className="action-button" title="View Selected Row" onClick={handleViewRow}>📄</button>
          <button className="action-button" title="Find Records" onClick={handleSearchToggle}>🔍</button>
          <button className="action-button" title="Reload Grid" onClick={handleReloadGrid}>🔄</button>
          <button className="action-button" title="Export to Excel" onClick={handleExportToExcel}>📊</button>
          <button className="action-button" title="Export to PDF" onClick={handleExportToPDF}>📄</button>
        </div>
      )}
      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      <AddRowModal
        isOpen={modalState.add}
        onRequestClose={handleCloseModal}
        onSave={handleSaveRow}
      />
      <EditRowModal
        isOpen={modalState.edit}
        onRequestClose={handleCloseModal}
        rowData={selectedRow}
        onSave={handleEditUpdatedRow}
      />
      <ViewRowModal
        isOpen={modalState.view}
        onRequestClose={handleCloseModal}
        rowData={selectedRow}
      />
    </div>
  );
};

export default Leads;
