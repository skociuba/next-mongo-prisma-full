// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import React from 'react';
import {useSession} from 'next-auth/react';
import Link from 'next/link';

import {
  useAddFormMutation,
  useGetFormsQuery,
} from '../../provider/redux/form/form';
import {FormState} from '../../types/form';

import {updateField} from './slice';
const Page = () => {
  const dispatch = useDispatch();
  const session = useSession();
  const userId = session?.data?.user?.id;

  const formState = useSelector((state) => state.form);
  const {data, refetch} = useGetFormsQuery(JSON.stringify(userId));
  const [addForm] = useAddFormMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const field = e.target.name as keyof FormState;
    const value =
      (e.target as HTMLInputElement | HTMLTextAreaElement).type === 'checkbox'
        ? e.target.checked
        : e.target.value;
    dispatch(updateField({field, value}));
  };

  const handleSubmit = async () => {
    try {
      const response = await addForm({
        ...formState,
        userId: userId,
      });
      console.log(response.data);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-2">
      <div className=" m-20 grid gap-3">
        <p className="grid-col grid">
          First Name
          <input
            onChange={handleChange}
            name="firstName"
            type="text"
            placeholder="Type here"
            className="input input-bordered input-accent mt-2 w-full max-w-xs"
          />
        </p>
        <p className="grid-col grid">
          Last Name
          <input
            onChange={handleChange}
            name="lastName"
            type="text"
            placeholder="Type here"
            className="input input-bordered input-accent mt-2 w-full max-w-xs"
          />
        </p>
        <p className="grid-col grid">
          Age
          <input
            onChange={handleChange}
            name="age"
            type="text"
            placeholder="Type here"
            className="input input-bordered input-accent mt-2 w-full max-w-xs"
          />
        </p>
        <p className="grid-col grid">
          Nationality
          <select
            onChange={handleChange}
            name="nationality"
            className="select select-accent mt-2 w-full max-w-xs">
            <option disabled={true} selected={true} />

            <option>Polish</option>
            <option>English</option>
            <option>Ukrainian</option>
          </select>
        </p>
        <p className="grid-col grid gap-3">
          Sex
          <div className="flex items-center">
            {/* prettier-ignore */}
            <input
            onChange={handleChange}
            value="m"
            type="radio"
            name="sex"
            className="radio radio-accent mr-2"
          />{' '}
            <span>Man</span>
          </div>
          <div className="flex items-center">
            {/* prettier-ignore */}
            <input
            onChange={handleChange}
            type="radio"
            name="sex"
            value="w"
            className="radio radio-accent mr-2"
          />{' '}
            <span>Woman</span>
          </div>
        </p>
        <div className="mt-2 flex w-full max-w-xs items-center">
          <div>
            <label>
              {/* prettier-ignore */}
              <input
              onChange={handleChange}
              name="agree"
              type="checkbox"
              className="checkbox checkbox-accent mr-2"
            />
            </label>
          </div>{' '}
          <span className="mt-6">
            Are You agree to convert and use Your personal data?
          </span>
        </div>
        {/* prettier-ignore */}
        <button
          className="btn btn-outline btn-accent w-full max-w-xs"
          onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div>
        {data?.form?.map((el) => (
          <p key={el?.id}>
            <Link key={el?.id} href={`/form/${el?.id}`}>
              {/* prettier-ignore */}
              <button className="btn btn-outline btn-accent mb-2 w-full max-w-xs">
                {' '}
                {el?.id}{' '}
              </button>
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
};
export default Page;
