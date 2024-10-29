// pages/client-search.js
"use client";
// pages/clientsearch.js
import { useState } from 'react';
import axios from 'axios';

export default function ClientSearch() {
  const [searchInput, setSearchInput] = useState('');
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/getClient', { query: searchInput });
      setClients(response.data.clients);
    } catch (err) {
      setError(`Error fetching vendor data${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (client, newClients) => {
    try {
      await axios.post('/api/updateVendor', { email: client.email, clients: newClients });
      alert('Vendor updated successfully');
    } catch (err) {
      setError(`Error updateing vendor data${err}`);
    }
  };

  return (
    <div className="p-8 mt-20 mb-10 ml-20 mr-20 bg-gray-100 rounded-lg shadow-md relative">
      <h2 className="text-2xl font-semibold mb-4">Vendor Search</h2>
      <form onSubmit={handleSearch} className="flex space-x-4 mb-6">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search vendors..."
          className="px-2 py-2 border rounded-md w-96 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Search
        </button>
      </form>
      {isLoading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div id="show_candidate" className="space-y-4 mt-4">
        {clients.map((client) => (
          <div key={client.id} className="p-4 border rounded-md shadow-sm">
            <p className="font-medium">{client.name}</p>
            <input
              type="text"
              value={client.clients}
              onChange={(e) => handleUpdate(client, e.target.value)}
              placeholder="Update client"
              className="mt-2 px-3 py-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
