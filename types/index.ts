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
  
<<<<<<< HEAD

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
=======
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
>>>>>>> caab415fddbc1783fee75318a02f810caff2087f
