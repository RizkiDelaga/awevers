import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AccountValidation() {
  const location = useLocation();
  // Get a specific query parameter
  const myParam = new URLSearchParams(location.search).get('name');
  return (
    <>
      <Link
        to={{
          pathname: '/AccountValidation',
          search: '?name=Rizki Delaga Prasetya',
        }}
      >
        Change Params
      </Link>
      <div>AccountValidation</div>
      {myParam}
    </>
  );
}
