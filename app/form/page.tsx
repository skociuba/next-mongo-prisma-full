// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client';
import {useDispatch} from 'react-redux';
import React from 'react';

import {updateField} from './slice';
import {FormState} from './../../types/form';
const Page = () => {
  const dispatch = useDispatch();
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
  return (
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
          type="number"
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
      <div className="mt-2 flex items-center">
        <div>
          <label>
            <input
              onChange={handleChange}
              name="agree"
              type="checkbox"
              className="checkbox checkbox-accent mr-2"
            />
          </label>
        </div>{' '}
        <span>Are You agree to convert and use Your personal data?</span>
      </div>
    </div>
  );
};
export default Page;
