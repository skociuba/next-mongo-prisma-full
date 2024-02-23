// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
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
  const selectForm = (formId) =>
    data?.form?.find((form) => form?.id === formId);
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
      {/* prettier-ignore */}
      <button
        className="btn btn-outline btn-accent mb-8 w-full max-w-xs"
        onClick={createPdf}>
        Download PDF
      </button>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="mt-4 flex min-h-screen items-center justify-center">
          {/* prettier-ignore */}
          <div
            ref={pdfRef}
            className="mx-auto block h-a4 w-a4  rounded-lg border shadow-2xl">
            <div className="grid h-full grid-cols-3">
              <div className="col-span-2 pl-6 text-left">
                <h1 className="py-4 text-3xl font-bold">
                  {' '}
                  {selectForm(id)?.firstName || `-`}{' '}
                  {selectForm(id)?.lastName || `-`}
                </h1>
                <p className=" mb-8 py-2">webdeveloper</p>
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
                  <strong>Nationality:</strong>{' '}
                  {selectForm(id)?.nationality || `-`}
                </p>
              </div>
              <div className="col-span-1 bg-accent py-4 pl-6 text-left">
                <ul>
                  <p className="font-bold">Details</p>
                  <li className="py-2">phone</li>
                  <li className="py-2">email</li>
                  <li className="py-2">city</li>
                </ul>{' '}
              </div>{' '}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
