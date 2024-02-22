'use client';
import {useSession} from 'next-auth/react';
import React, {useRef} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import {useGetFormsQuery} from '../../../provider/redux/form/form';
const User = ({params}) => {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const {data, isLoading} = useGetFormsQuery(JSON.stringify(userId));
  const id = params.id;
  const selectForm = (id) => data?.form?.find((form) => form?.id === id);
  const pdfRef = useRef(null);

  const createPdf = () => {
    html2canvas(pdfRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      // A4 size in pt: [595.28, 841.89]
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [595.28, 841.89],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, 595.28, 841.89);
      pdf.save('download.pdf');
    });
  };
  return (
    <div className="mx-auto rounded-md bg-white p-5 text-center">
      <button
        className="btn btn-outline btn-accent mb-8 w-full max-w-xs"
        onClick={createPdf}>
        Download PDF
      </button>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="mt-4 flex min-h-screen items-center justify-center">
          <div
            ref={pdfRef}
            className="h-a4 w-a4 mx-auto block  rounded-lg border p-3 pt-3 shadow-2xl">
            <h1 className="border-b pb-2">CV</h1>
            <p className=" mt-8 py-2">
              <strong>First Name:</strong> {selectForm(id)?.firstName || `-`}{' '}
            </p>
            <p className="py-2">
              <strong>Last Name:</strong> {selectForm(id)?.lastName || `-`}
            </p>
            <p className="py-2">
              <strong>Sex:</strong> {selectForm(id)?.sex || `-`}
            </p>
            <p className="py-2">
              <strong>Age:</strong> {selectForm(id)?.age || `-`}
            </p>
            <p className="py-2">
              <strong>Nationality:</strong> {selectForm(id)?.nationality || `-`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
