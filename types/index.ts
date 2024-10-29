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
    POID?: string;
    PlacementDetails?: string;
    StartDate?: string;
    EndDate?: string;
    Rate?: string;
    OvertimeRate?: string;
    FreqType?: string;
    InvoiceFrequency?: string;
    InvoiceStartDate?: string;
    InvoiceNet?: string;
    POUrl?: string;
    Notes?: string;
  }


  
  export interface Placement {
    id?: string;
    Candidate_Name?: string;
    Manager?: string;
    Recruiter?: string;
    Vendor1?: string;
    MSA_ID?: string;
    Other_AgrID?: string;
    Vendor2?: string;
    Vendor3?: string;
    Client?: string;
    Start_Date?: string;
    End_Date?: string;
    Status?: string;
    Paperwork?: string;
    Insurance?: string;
    Wrk_Location?: string;
    Wrk_Designation?: string;
    Wrk_Email?: string;
    Wrk_Phone?: string;
    Mgr_Name?: string;
    Mgr_Email?: string;
    Mgr_Phone?: string;
    Hiring_Mgr_Name?: string;
    Hiring_Mgr_Email?: string;
    Hiring_Mgr_Phone?: string;
    Reference?: string;
    IPEmail_Clear?: string;
    Feedback_ID?: string;
    Project_Docs?: string;
    Notes?: string;
  }

  export interface Vendor {
    id?: string;
    companyname?: string;
    status?: string;
    tier?: string;
    culture?: string;
    solicited?: string;
    minrate?: number;
    hirebeforeterm?: string;
    hireafterterm?: string;
    latepayments?: string;
    totalnetterm?: number;
    defaultedpayment?: string;
    agreementstatus?: string;
    url?: string;
    email?: string;
    phone?: string;
    fax?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: string;
    hrname?: string;
    hremail?: string;
    hrphone?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    accountnumber?: string;
    managername?: string;
    manageremail?: string;
    managerphone?: string;
    secondaryname?: string;
    secondaryemail?: string;
    secondaryphone?: string;
    timsheetemail?: string;
    agreementname?: string;
    agreementlink?: string;
    subcontractorlink?: string;
    nonsolicitationlink?: string;
    nonhirelink?: string;
    clients?: string;
    notes?: string;
  }
  

  export  interface Client {
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


  export interface Overdue {
    id?: string;
    poid?: string;
    invoicenumber?: string;
    invoicedate?: string;
    quantity?: string;
    rate?: string;
    expecteddate?: string;
    amountexpected?: string;
    startdate?: string;
    enddate?: string;
    status?: string;
    remindertype?: string;
    amountreceived?: string;
    receiveddate?: string;
    releaseddate?: string;
    checknumber?: string;
    invoiceurl?: string;
    checkurl?: string;
    companyname?: string;
    vendorfax?: string;
    vendorphone?: string;
    vendoremail?: string;
    timsheetemail?: string;
    hrname?: string;
    hremail?: string;
    hrphone?: string;
    managername?: string;
    manageremail?: string;
    managerphone?: string;
    secondaryname?: string;
    secondaryemail?: string;
    secondaryphone?: string;
    candidatename?: string;
    candidatephone?: string;
    candidateemail?: string;
    wrkemail?: string;
    wrkphone?: string;
    recruitername?: string;
    recruiterphone?: string;
    recruiteremail?: string;
    notes?: string;
  }
