"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import withAuth from "@/modals/withAuth";
import { AiOutlineSearch } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { debounce } from "lodash";

const CandidateSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    debouncedSearch(e.target.value);
  };

  const fetchCandidates = async (query) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/ajax-content/get-candidate`, { parent_id: query });
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query && query.length > 2) {
        fetchCandidates(query);
      }
    }, 300),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchCandidates(searchInput);
  };

  return (
    <div className="candidate-search-container p-6 bg-gray-100 mt-8 rounded-lg shadow-lg ">
      <h1 className="text-3xl font-bold mb-4">Candidate Search</h1>

      <form onSubmit={handleSubmit} className="flex items-center mb-5 mt-8 ">
        <input
          type="text"
          placeholder="Search Candidates..."
          value={searchInput}
          onChange={handleSearchInput}
          className="p-2 w-64 border border-gray-300 rounded-md mr-2"
        />
        <button
          ty    pe="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700">
             <AiOutlineSearch className="mr-2" /> Search
        </button>
      </form>

      <div className="candidate-results">
        {loading ? (
          <div className="flex items-center space-x-2">
            <FaSpinner className="animate-spin text-blue-600" /> <span>Loading...</span>
          </div>
        ) : (
          <div>
            {candidates.length > 0 ? (
              <div className="candidate-list bg-white p-4 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-2">Results:</h2>
                <ul>
                  {candidates.map((candidate) => (
                    <li
                      key={candidate.id}
                      onClick={() => setSelectedCandidate(candidate)}
                      className="p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                    >
                      {candidate.name} - {candidate.email}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No candidates found.</p>
            )}
          </div>
        )}

        {selectedCandidate && (
          <div className="selected-candidate mt-4 bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold">Selected Candidate:</h3>
            <p><strong>ID:</strong> {selectedCandidate.id}</p>
            <p><strong>Name:</strong> {selectedCandidate.name}</p>
            <p><strong>Email:</strong> {selectedCandidate.email}</p>
            <p><strong>Assessment:</strong> {selectedCandidate.assessment}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(CandidateSearch);





// "use client";
// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import withAuth from "@/modals/withAuth";
// import { AiOutlineSearch } from "react-icons/ai";
// import { FaSpinner } from "react-icons/fa";
// import { debounce } from "lodash";

// const CandidateSearch = () => {
//   const [searchInput, setSearchInput] = useState("");
//   const [candidates, setCandidates] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedCandidate, setSelectedCandidate] = useState(null);

//   const API_URL = process.env.NEXT_PUBLIC_API_URL;

//   const handleSearchInput = (e) => {
//     setSearchInput(e.target.value);
//     debouncedSearch(e.target.value);
//   };

//   const fetchCandidates = async (query) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(`${API_URL}/ajax-content/get-candidate`, { parent_id: query });
//       setCandidates(response.data);
//     } catch (error) {
//       console.error("Error fetching candidates:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const debouncedSearch = useCallback(
//     debounce((query) => {
//       if (query && query.length > 2) {
//         fetchCandidates(query);
//       }
//     }, 300),
//     []
//   );

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     fetchCandidates(searchInput);
//   };

//   return (
//     <div className="candidate-search-container p-6 bg-gray-100 rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold mb-4">Candidate Search</h1>

//       <form onSubmit={handleSubmit} className="flex items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search Candidates..."
//           value={searchInput}
//           onChange={handleSearchInput}
//           className="p-2 w-64 border border-gray-300 rounded-md mr-2"
//         />
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 hover:bg-blue-700"
//         >
//           <AiOutlineSearch />
//         </button>
//       </form>

//       <div className="candidate-results">
//         {loading ? (
//           <div className="flex items-center space-x-2">
//             <FaSpinner className="animate-spin text-blue-600" /> <span>Loading...</span>
//           </div>
//         ) : (
//           <div>
//             {candidates.length > 0 ? (
//               <div className="candidate-list bg-white p-4 rounded-lg shadow">
//                 <h2 className="text-2xl font-semibold mb-2">Results:</h2>
//                 <ul>
//                   {candidates.map((candidate) => (
//                     <li
//                       key={candidate.id}
//                       onClick={() => setSelectedCandidate(candidate)}
//                       className="p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
//                     >
//                       {candidate.name} - {candidate.email}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ) : (
//               <p>No candidates found.</p>
//             )}
//           </div>
//         )}

//         {selectedCandidate && (
//           <div className="selected-candidate mt-4 bg-gray-50 p-4 rounded-lg shadow">
//             <h3 className="text-xl font-bold">Selected Candidate:</h3>
//             <p><strong>ID:</strong> {selectedCandidate.id}</p>
//             <p><strong>Name:</strong> {selectedCandidate.name}</p>
//             <p><strong>Email:</strong> {selectedCandidate.email}</p>
//             <p><strong>Assessment:</strong> {selectedCandidate.assessment}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default withAuth(CandidateSearch);
