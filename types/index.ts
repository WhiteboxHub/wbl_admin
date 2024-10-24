// types.ts
export interface Lead {
    leadid?: string; // make leadid optional if it's not always present
    name: string;
    email: string;
    // Add other fields as necessary
  }
  
  export interface Batch {
    batchid: string; // Assuming batchid is a string, adjust as necessary
    title: string; // Example property, change to match your actual data
    description?: string; // Optional property, add more fields as necessary
    createdAt: string; // Assuming this is a timestamp or date string
    updatedAt: string; // Assuming this is a timestamp or date string
    [key: string]: any; // Allows additional properties that may not be explicitly defined
  }
  
// types/index.ts
export interface Candidate {
  batchname?: any;
  name?: string;
  enrolleddate?: string;
  email?: string;
  course?: string;
  phone?: string;
  status?: string; // Allows additional properties that may not be explicitly defined
  // Add any additional properties you need here
  candidateid?: string; // Optional if it can be undefined
  workstatus?: string;
  education?: string;
  workexperience?: string;
  ssn?: string;
  agreement?: string;
  promissory?: boolean;
  driverslicense?: string;
  workpermit?: string;
  wpexpirationdate?: string; // Adjust type if necessary
  offerletter?: string;
  secondaryemail?: string;
  secondaryphone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  linkedin?: string;
  dob?: string; // Adjust type if necessary
  emergcontactphone?: string;
  ssnvalidated?: boolean;
  bgv?: boolean;
  term?: string;
  feepaid?: boolean;
  feedue?: number;
  salary0?: number;
  salary6?: number;
  salary12?: number;
  guarantorname?: string;
  guarantordesignation?: string;
  guarantorcompany?: string;
  contracturl?: string;
  empagreementurl?: string;
  offerletterurl?: string;
  workpermiturl?: string;
  referralid?: string;
  portalid?: string;
  avatarid?: string;
  notes?: string;
}


  export type User = {
    id: number;
    uname: string;
    passwd: string;
    dailypwd: string;
    team: string;
    level: string;
    instructor: string;
    override: string;
    status: string;
    lastlogin: string;
    logincount: number;
    fullname: string;
    address: string;
    phone: string;
    state: string;
    zip: string;
    city: string;
    country: string;
    message: string;
    registereddate: string;
    level3date: string;
    lastmoddatetime: string;
    demo: string;
    enddate: string;
    googleId: string;
    reset_token: string;
    token_expiry: string;
  };
  

  // types.ts
  export interface Po {
    id: string;
    PlacementID: string;
    StartDate: string;
    EndDate: string;
    Rate: string;
    OvertimeRate: string;
    FreqType: string;
    InvoiceFrequency: string;
    InvoiceStartDate: string;
    InvoiceNet: string;
    POUrl: string;
    Notes: string;
    PlacementDetails: string;
  }


  
  
  export interface Placement {
    id?: string;
    candidateid?: string;
    mmid?: string;
    recruiterid?: string;
    vendorid?: string;
    masteragreementid?: string;
    otheragreementsids?: string;
    vendor2id?: string;
    vendor3id?: string;
    clientid?: string;
    startdate?: string;
    enddate?: string;
    status?: string;
    paperwork?: string;
    insurance?: string;
    wrklocation?: string;
    wrkdesignation?: string;
    wrkemail?: string;
    wrkphone?: string;
    mgrname?: string;
    mgremail?: string;
    mgrphone?: string;
    hiringmgrname?: string;
    hiringmgremail?: string;
    hiringmgrphone?: string;
    reference?: string;
    ipemailclear?: string;
    feedbackid?: string;
    projectdocs?: string;
    notes?: string;
  }

  
  interface Vendor {
    id: string;
    companyName: string;
    status: string;
    accountNumber: string;
    tier: string;
    email: string;
    phone: string;
    fax?: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    url: string;
    solicited: boolean;
    hireBeforeTerm: boolean;
    hireAfterTerm: boolean;
    minRate: number;
    latePayments: number;
    totalNetTerm: number;
    defaultedPayment: boolean;
    culture: string;
    hrName: string;
    hrEmail: string;
    hrPhone: string;
    managerName: string;
    twitter?: string;
    facebook?: string;
    linkedIn?: string;
    managerEmail: string;
    managerPhone: string;
    secondaryName?: string;
    secondaryEmail?: string;
    secondaryPhone?: string;
    timeSheetEmail: string;
    agreementStatus: string;
    agreementName: string;
    agreementLink: string;
    subcontractorLink?: string;
    nonSolicitationLink?: string;
    nonHireLink?: string;
    clients: string[];
    notes?: string;
    crawlDate: string;
    lastModDateTime: string;
  }
  

  interface Client {
    id: string;
    companyName: string;
    tier: string;
    status: string;
    email: string;
    phone: string;
    fax?: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    url: string;
    manager1Name: string;
    twitter?: string;
    facebook?: string;
    linkedIn?: string;
    manager1Email: string;
    manager1Phone: string;
    hmName: string; // Hiring manager name
    hmEmail: string;
    hmPhone: string;
    hrName: string;
    hrEmail: string;
    hrPhone: string;
    notes?: string;
    lastModDateTime: string;
    client?: string; // Assuming 'clicent' is a typo for 'client'
  }
  
  export type Employee ={
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    startdate: string;
    mgrid: string;
    designationid: string;
    personalemail: string;
    personalphone: string;
    dob: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    skypeid: string;
    salary: string;
    commission: string;
    commissionrate: string;
    type: string;
    empagreementurl: string;
    offerletterurl: string;
    dlurl: string;
    workpermiturl: string;
    contracturl: string;
    enddate: string;
    loginid: string;
    responsibilities: string;
    notes: string;
  
  };