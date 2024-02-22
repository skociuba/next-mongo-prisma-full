'use client';
import {useSession} from 'next-auth/react';

import {useGetFormsQuery} from '../../../provider/redux/form/form';
const User = ({params}) => {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const {data, isLoading} = useGetFormsQuery(JSON.stringify(userId));
  const id = params.id;
  const selectForm = (id) => data?.form?.find((form) => form?.id === id);

  return (
    <div className="mx-auto w-4/5 rounded-md bg-white p-5 text-center shadow-md">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default User;
