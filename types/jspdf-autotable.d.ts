import { jsPDF } from 'jspdf';

declare module 'jspdf' {
    interface jsPDF {
        autoTable: typeof import('jspdf-autotable')['default'];
    }
}