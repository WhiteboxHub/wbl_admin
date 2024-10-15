import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';

interface FormData {
  name: string;
  enrolleddate: string;
  email: string;
  course: string;
  phone: string;
  status: string;
  workstatus: string;
  education: string;
  workexperience: string;
  ssn: string;
  agreement: string;
  promissory: string;
  driverslicense: string;
  workpermit: string;
  wpexpirationdate: string;
  offerletter: string;
  secondaryemail: string;
  secondaryphone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  linkedin: string;
  dob: string;
  emergcontactname: string;
  emergcontactemail: string;
  emergcontactphone: string;
  emergcontactaddrs: string;
  guidelines: string;
  ssnvalidated: string;
  bgv: string;
  term: string;
  feepaid: string;
  feedue: string;
  salary0: string;
  salary6: string;
  salary12: string;
  guarantorname: string;
  guarantordesignation: string;
  guarantorcompany: string;
  contracturl: string;
  empagreementurl: string;
  offerletterurl: string;
  dlurl: string;
  workpermiturl: string;
  ssnurl: string;
  referralid: string;
  portalid: string;
  avatarid: string;
  notes: string;
  batchname: string;
  coverletter: string;
  background: string;
  recruiterassesment: string;
  instructorassesment: string;
  processflag: string;
  defaultprocessflag: string;
  originalresume: string;
  lastmoddatetime: string;
  statuschangedate: string;
  diceflag: string;
  batchid: string;
  emaillist: string;
}

interface AddRowCandidateProps {
  isOpen: boolean;
  refreshData: () => void;
  onClose: () => void;
}

const AddRowCandidate: React.FC<AddRowCandidateProps> = ({ isOpen, refreshData, onClose }) => {
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  const [formData, setFormData] = useState<FormData>({
    name: '',
    enrolleddate: '',
    email: '',
    course: '',
    phone: '',
    status: '',
    workstatus: '',
    education: '',
    workexperience: '',
    ssn: '',
    agreement: '',
    promissory: '',
    driverslicense: '',
    workpermit: '',
    wpexpirationdate: '',
    offerletter: '',
    secondaryemail: '',
    secondaryphone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    linkedin: '',
    dob: '',
    emergcontactname: '',
    emergcontactemail: '',
    emergcontactphone: '',
    emergcontactaddrs: '',
    guidelines: '',
    ssnvalidated: '',
    bgv: '',
    term: '',
    feepaid: '',
    feedue: '',
    salary0: '',
    salary6: '',
    salary12: '',
    guarantorname: '',
    guarantordesignation: '',
    guarantorcompany: '',
    contracturl: '',
    empagreementurl: '',
    offerletterurl: '',
    dlurl: '',
    workpermiturl: '',
    ssnurl: '',
    referralid: '',
    portalid: '',
    avatarid: '',
    notes: '',
    batchname: '',
    coverletter: '',
    background: '',
    recruiterassesment: '',
    instructorassesment: '',
    processflag: '',
    defaultprocessflag: '',
    originalresume: '',
    lastmoddatetime: '',
    statuschangedate: '',
    diceflag: '',
    batchid: '',
    emaillist: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/candidates/insert`, formData, {
        headers: { AuthToken: localStorage.getItem('token') },
      });

      // Here, use the newly created batch data for the refreshData
      const newBatch = response.data; // assuming the API returns the new batch
      refreshData(); // Pass the new batch to be added
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
          top: '15%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, 0)',
          overflowY: 'auto',
          maxHeight: '80vh',
          width: '40%',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className="">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-0 text-gray-500 hover:text-gray-800 transition duration-200"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Candidate</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter name"
              required
            />
          </div>

          {/* Enrolled Date */}
          <div>
            <label className="block text-gray-700">Enrolled Date</label>
            <input
              type="date"
              name="enrolleddate"
              value={formData.enrolleddate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Course */}
          <div>
            <label className="block text-gray-700">Course</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter course"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter phone"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter status"
            />
          </div>

          {/* Work Status */}
          <div>
            <label className="block text-gray-700">Work Status</label>
            <input
              type="text"
              name="workstatus"
              value={formData.workstatus}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter work status"
            />
          </div>

          {/* Education */}
          <div>
            <label className="block text-gray-700">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter education"
            />
          </div>

          {/* Work Experience */}
          <div>
            <label className="block text-gray-700">Work Experience</label>
            <input
              type="text"
              name="workexperience"
              value={formData.workexperience}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter work experience"
            />
          </div>

          {/* SSN */}
          <div>
            <label className="block text-gray-700">SSN</label>
            <input
              type="text"
              name="ssn"
              value={formData.ssn}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter SSN"
            />
          </div>

          {/* Agreement */}
          <div>
            <label className="block text-gray-700">Agreement</label>
            <input
              type="text"
              name="agreement"
              value={formData.agreement}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter agreement"
            />
          </div>

          {/* Promissory */}
          <div>
            <label className="block text-gray-700">Promissory</label>
            <input
              type="text"
              name="promissory"
              value={formData.promissory}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter promissory"
            />
          </div>

          {/* Driver's License */}
          <div>
            <label className="block text-gray-700">Driver's License</label>
            <input
              type="text"
              name="driverslicense"
              value={formData.driverslicense}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter driver's license"
            />
          </div>

          {/* Work Permit */}
          <div>
            <label className="block text-gray-700">Work Permit</label>
            <input
              type="text"
              name="workpermit"
              value={formData.workpermit}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter work permit"
            />
          </div>

          {/* Work Permit Expiration Date */}
          <div>
            <label className="block text-gray-700">Work Permit Expiration Date</label>
            <input
              type="date"
              name="wpexpirationdate"
              value={formData.wpexpirationdate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Offer Letter */}
          <div>
            <label className="block text-gray-700">Offer Letter</label>
            <input
              type="text"
              name="offerletter"
              value={formData.offerletter}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter offer letter"
            />
          </div>

          {/* Secondary Email */}
          <div>
            <label className="block text-gray-700">Secondary Email</label>
            <input
              type="email"
              name="secondaryemail"
              value={formData.secondaryemail}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter secondary email"
            />
          </div>

          {/* Secondary Phone */}
          <div>
            <label className="block text-gray-700">Secondary Phone</label>
            <input
              type="text"
              name="secondaryphone"
              value={formData.secondaryphone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter secondary phone"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter address"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter city"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter state"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter country"
            />
          </div>

          {/* Zip */}
          <div>
            <label className="block text-gray-700">Zip</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter zip"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-gray-700">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter LinkedIn"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Emergency Contact Name */}
          <div>
            <label className="block text-gray-700">Emergency Contact Name</label>
            <input
              type="text"
              name="emergcontactname"
              value={formData.emergcontactname}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter emergency contact name"
            />
          </div>

          {/* Emergency Contact Email */}
          <div>
            <label className="block text-gray-700">Emergency Contact Email</label>
            <input
              type="email"
              name="emergcontactemail"
              value={formData.emergcontactemail}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter emergency contact email"
            />
          </div>

          {/* Emergency Contact Phone */}
          <div>
            <label className="block text-gray-700">Emergency Contact Phone</label>
            <input
              type="text"
              name="emergcontactphone"
              value={formData.emergcontactphone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter emergency contact phone"
            />
          </div>

          {/* Emergency Contact Address */}
          <div>
            <label className="block text-gray-700">Emergency Contact Address</label>
            <input
              type="text"
              name="emergcontactaddrs"
              value={formData.emergcontactaddrs}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter emergency contact address"
            />
          </div>

          {/* Guidelines */}
          <div>
            <label className="block text-gray-700">Guidelines</label>
            <input
              type="text"
              name="guidelines"
              value={formData.guidelines}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter guidelines"
            />
          </div>

          {/* SSN Validated */}
          <div>
            <label className="block text-gray-700">SSN Validated</label>
            <input
              type="text"
              name="ssnvalidated"
              value={formData.ssnvalidated}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter SSN validated"
            />
          </div>

          {/* BGV */}
          <div>
            <label className="block text-gray-700">BGV</label>
            <input
              type="text"
              name="bgv"
              value={formData.bgv}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter BGV"
            />
          </div>

          {/* Term */}
          <div>
            <label className="block text-gray-700">Term</label>
            <input
              type="text"
              name="term"
              value={formData.term}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter term"
            />
          </div>

          {/* Fee Paid */}
          <div>
            <label className="block text-gray-700">Fee Paid</label>
            <input
              type="text"
              name="feepaid"
              value={formData.feepaid}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter fee paid"
            />
          </div>

          {/* Fee Due */}
          <div>
            <label className="block text-gray-700">Fee Due</label>
            <input
              type="text"
              name="feedue"
              value={formData.feedue}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter fee due"
            />
          </div>

          {/* Salary 0 */}
          <div>
            <label className="block text-gray-700">Salary 0</label>
            <input
              type="text"
              name="salary0"
              value={formData.salary0}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter salary 0"
            />
          </div>

          {/* Salary 6 */}
          <div>
            <label className="block text-gray-700">Salary 6</label>
            <input
              type="text"
              name="salary6"
              value={formData.salary6}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter salary 6"
            />
          </div>

          {/* Salary 12 */}
          <div>
            <label className="block text-gray-700">Salary 12</label>
            <input
              type="text"
              name="salary12"
              value={formData.salary12}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter salary 12"
            />
          </div>

          {/* Guarantor Name */}
          <div>
            <label className="block text-gray-700">Guarantor Name</label>
            <input
              type="text"
              name="guarantorname"
              value={formData.guarantorname}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter guarantor name"
            />
          </div>

          {/* Guarantor Designation */}
          <div>
            <label className="block text-gray-700">Guarantor Designation</label>
            <input
              type="text"
              name="guarantordesignation"
              value={formData.guarantordesignation}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter guarantor designation"
            />
          </div>

          {/* Guarantor Company */}
          <div>
            <label className="block text-gray-700">Guarantor Company</label>
            <input
              type="text"
              name="guarantorcompany"
              value={formData.guarantorcompany}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter guarantor company"
            />
          </div>

          {/* Contract URL */}
          <div>
            <label className="block text-gray-700">Contract URL</label>
            <input
              type="text"
              name="contracturl"
              value={formData.contracturl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter contract URL"
            />
          </div>

          {/* Employment Agreement URL */}
          <div>
            <label className="block text-gray-700">Employment Agreement URL</label>
            <input
              type="text"
              name="empagreementurl"
              value={formData.empagreementurl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter employment agreement URL"
            />
          </div>

          {/* Offer Letter URL */}
          <div>
            <label className="block text-gray-700">Offer Letter URL</label>
            <input
              type="text"
              name="offerletterurl"
              value={formData.offerletterurl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter offer letter URL"
            />
          </div>

          {/* Driver's License URL */}
          <div>
            <label className="block text-gray-700">Driver's License URL</label>
            <input
              type="text"
              name="dlurl"
              value={formData.dlurl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter driver's license URL"
            />
          </div>

          {/* Work Permit URL */}
          <div>
            <label className="block text-gray-700">Work Permit URL</label>
            <input
              type="text"
              name="workpermiturl"
              value={formData.workpermiturl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter work permit URL"
            />
          </div>

          {/* SSN URL */}
          <div>
            <label className="block text-gray-700">SSN URL</label>
            <input
              type="text"
              name="ssnurl"
              value={formData.ssnurl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter SSN URL"
            />
          </div>

          {/* Referral ID */}
          <div>
            <label className="block text-gray-700">Referral ID</label>
            <input
              type="text"
              name="referralid"
              value={formData.referralid}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter referral ID"
            />
          </div>

          {/* Portal ID */}
          <div>
            <label className="block text-gray-700">Portal ID</label>
            <input
              type="text"
              name="portalid"
              value={formData.portalid}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter portal ID"
            />
          </div>

          {/* Avatar ID */}
          <div>
            <label className="block text-gray-700">Avatar ID</label>
            <input
              type="text"
              name="avatarid"
              value={formData.avatarid}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter avatar ID"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700">Notes</label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter notes"
            />
          </div>

          {/* Batch Name */}
          <div>
            <label className="block text-gray-700">Batch Name</label>
            <input
              type="text"
              name="batchname"
              value={formData.batchname}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter batch name"
              required
            />
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-gray-700">Cover Letter</label>
            <input
              type="text"
              name="coverletter"
              value={formData.coverletter}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter cover letter"
            />
          </div>

          {/* Background */}
          <div>
            <label className="block text-gray-700">Background</label>
            <input
              type="text"
              name="background"
              value={formData.background}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter background"
            />
          </div>

          {/* Recruiter Assessment */}
          <div>
            <label className="block text-gray-700">Recruiter Assessment</label>
            <input
              type="text"
              name="recruiterassesment"
              value={formData.recruiterassesment}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter recruiter assessment"
            />
          </div>

          {/* Instructor Assessment */}
          <div>
            <label className="block text-gray-700">Instructor Assessment</label>
            <input
              type="text"
              name="instructorassesment"
              value={formData.instructorassesment}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter instructor assessment"
            />
          </div>

          {/* Process Flag */}
          <div>
            <label className="block text-gray-700">Process Flag</label>
            <input
              type="text"
              name="processflag"
              value={formData.processflag}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter process flag"
            />
          </div>

          {/* Default Process Flag */}
          <div>
            <label className="block text-gray-700">Default Process Flag</label>
            <input
              type="text"
              name="defaultprocessflag"
              value={formData.defaultprocessflag}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter default process flag"
            />
          </div>

          {/* Original Resume */}
          <div>
            <label className="block text-gray-700">Original Resume</label>
            <input
              type="text"
              name="originalresume"
              value={formData.originalresume}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter original resume"
            />
          </div>

          {/* Last Modification Date */}
          <div>
            <label className="block text-gray-700">Last Modification Date</label>
            <input
              type="date"
              name="lastmoddatetime"
              value={formData.lastmoddatetime}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Status Change Date */}
          <div>
            <label className="block text-gray-700">Status Change Date</label>
            <input
              type="date"
              name="statuschangedate"
              value={formData.statuschangedate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Dice Flag */}
          <div>
            <label className="block text-gray-700">Dice Flag</label>
            <input
              type="text"
              name="diceflag"
              value={formData.diceflag}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter dice flag"
            />
          </div>

          {/* Batch ID */}
          <div>
            <label className="block text-gray-700">Batch ID</label>
            <input
              type="text"
              name="batchid"
              value={formData.batchid}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter batch ID"
            />
          </div>

          {/* Email List */}
          <div>
            <label className="block text-gray-700">Email List</label>
            <input
              type="text"
              name="emaillist"
              value={formData.emaillist}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter email list"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Save Candidate
          </button>

          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Cancel
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddRowCandidate;
