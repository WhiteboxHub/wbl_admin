import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Vendor } from '../../types/index';

interface AddRowModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshData: () => void;
}

const AddRowVendor: React.FC<AddRowModalProps> = ({ isOpen, onClose, refreshData }) => {
  const [formData, setFormData] = useState<Vendor>({
    companyname: '',
    status: 'Not Available',
    tier: '',
    culture: '',
    solicited: '',
    minrate: 0,
    hirebeforeterm: '',
    hireafterterm: '',
    latepayments: '',
    totalnetterm: 0,
    defaultedpayment: '',
    agreementstatus: '',
    url: '',
    email: '',
    phone: '',
    fax: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    hrname: '',
    hremail: '',
    hrphone: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    accountnumber: '',
    managername: '',
    manageremail: '',
    managerphone: '',
    secondaryname: '',
    secondaryemail: '',
    secondaryphone: '',
    timsheetemail: '',
    agreementname: '',
    agreementlink: '',
    subcontractorlink: '',
    nonsolicitationlink: '',
    nonhirelink: '',
    clients: '',
    notes: '',
  });

  const statusOptions = {
    "Not Available": "Not Available",
    "Not Complete": "Not Complete",
    "Complete": "Complete"
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/vendors/insert`, formData, {
        headers: { AuthToken: localStorage.getItem('token') },
      });

      // Here, use the newly created vendor data for the refreshData
      const newVendor = response.data; // assuming the API returns the new vendor
      refreshData(); // Pass the new vendor to be added
      onClose();
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          top: '55%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          maxWidth: '400px',
          width: '90%',
          maxHeight: '80vh',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          overflowY: 'auto',
          fontFamily: 'Arial, sans-serif',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className="relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-2xl font-semibold text-red-500 hover:text-red-700 transition duration-200"
        >
          &times;
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 pr-8">Add New Vendor</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            name="companyname"
            value={formData.companyname}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter company name"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          >
            {Object.entries(statusOptions).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </div>

        {/* Tier */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Tier</label>
          <input
            type="text"
            name="tier"
            value={formData.tier}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter tier"
          />
        </div>

        {/* Culture */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Culture</label>
          <input
            type="text"
            name="culture"
            value={formData.culture}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter culture"
          />
        </div>

        {/* Solicited */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Solicited</label>
          <input
            type="text"
            name="solicited"
            value={formData.solicited}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter solicited"
          />
        </div>

        {/* Min Rate */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Min Rate</label>
          <input
            type="number"
            name="minrate"
            value={formData.minrate}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter min rate"
          />
        </div>

        {/* Hire Before Term */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Hire Before Term</label>
          <input
            type="text"
            name="hirebeforeterm"
            value={formData.hirebeforeterm}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter hire before term"
          />
        </div>

        {/* Hire After Term */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Hire After Term</label>
          <input
            type="text"
            name="hireafterterm"
            value={formData.hireafterterm}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter hire after term"
          />
        </div>

        {/* Late Payments */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Late Payments</label>
          <input
            type="text"
            name="latepayments"
            value={formData.latepayments}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter late payments"
          />
        </div>

        {/* Total Net Term */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Total Net Term</label>
          <input
            type="number"
            name="totalnetterm"
            value={formData.totalnetterm}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter total net term"
          />
        </div>

        {/* Defaulted Payment */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Defaulted Payment</label>
          <input
            type="text"
            name="defaultedpayment"
            value={formData.defaultedpayment}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter defaulted payment"
          />
        </div>

        {/* Agreement Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Agreement Status</label>
          <input
            type="text"
            name="agreementstatus"
            value={formData.agreementstatus}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter agreement status"
          />
        </div>

        {/* URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">URL</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter URL"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter email"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter phone"
          />
        </div>

        {/* Fax */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Fax</label>
          <input
            type="text"
            name="fax"
            value={formData.fax}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter fax"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter address"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter city"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter state"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter country"
          />
        </div>

        {/* Zip */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Zip</label>
          <input
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter zip"
          />
        </div>

        {/* HR Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">HR Name</label>
          <input
            type="text"
            name="hrname"
            value={formData.hrname}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter HR name"
          />
        </div>

        {/* HR Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">HR Email</label>
          <input
            type="email"
            name="hremail"
            value={formData.hremail}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter HR email"
          />
        </div>

        {/* HR Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">HR Phone</label>
          <input
            type="text"
            name="hrphone"
            value={formData.hrphone}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter HR phone"
          />
        </div>

        {/* Twitter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Twitter</label>
          <input
            type="text"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter Twitter"
          />
        </div>

        {/* Facebook */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Facebook</label>
          <input
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter Facebook"
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter LinkedIn"
          />
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Account Number</label>
          <input
            type="text"
            name="accountnumber"
            value={formData.accountnumber}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter account number"
          />
        </div>

        {/* Manager Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Manager Name</label>
          <input
            type="text"
            name="managername"
            value={formData.managername}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter manager name"
          />
        </div>

        {/* Manager Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Manager Email</label>
          <input
            type="email"
            name="manageremail"
            value={formData.manageremail}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter manager email"
          />
        </div>

        {/* Manager Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Manager Phone</label>
          <input
            type="text"
            name="managerphone"
            value={formData.managerphone}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter manager phone"
          />
        </div>

        {/* Secondary Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Secondary Name</label>
          <input
            type="text"
            name="secondaryname"
            value={formData.secondaryname}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter secondary name"
          />
        </div>

        {/* Secondary Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Secondary Email</label>
          <input
            type="email"
            name="secondaryemail"
            value={formData.secondaryemail}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter secondary email"
          />
        </div>

        {/* Secondary Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Secondary Phone</label>
          <input
            type="text"
            name="secondaryphone"
            value={formData.secondaryphone}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter secondary phone"
          />
        </div>

        {/* Timesheet Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Timesheet Email</label>
          <input
            type="email"
            name="timsheetemail"
            value={formData.timsheetemail}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter timesheet email"
          />
        </div>

        {/* Agreement Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Agreement Name</label>
          <input
            type="text"
            name="agreementname"
            value={formData.agreementname}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter agreement name"
          />
        </div>

        {/* Agreement Link */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Agreement Link</label>
          <input
            type="text"
            name="agreementlink"
            value={formData.agreementlink}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter agreement link"
          />
        </div>

        {/* Subcontractor Link */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Subcontractor Link</label>
          <input
            type="text"
            name="subcontractorlink"
            value={formData.subcontractorlink}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter subcontractor link"
          />
        </div>

        {/* Nonsolicitation Link */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nonsolicitation Link</label>
          <input
            type="text"
            name="nonsolicitationlink"
            value={formData.nonsolicitationlink}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter nonsolicitation link"
          />
        </div>

        {/* Nonhire Link */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nonhire Link</label>
          <input
            type="text"
            name="nonhirelink"
            value={formData.nonhirelink}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter nonhire link"
          />
        </div>

        {/* Clients */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Clients</label>
          <textarea
            name="clients"
            value={formData.clients}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter clients"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            placeholder="Enter notes"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-sm"
        >
          Save Vendor
        </button>
      </form>
    </Modal>
  );
};

export default AddRowVendor;
