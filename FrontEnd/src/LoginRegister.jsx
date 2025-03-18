import React, { useState } from 'react';
import {
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';

export default function LoginRegisterModal() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-[2000000000]">
      <div className="flex w-3/4 max-w-4xl bg-white rounded-lg overflow-hidden shadow-lg">
        {/* Login Panel */}
        <div className="w-1/2 relative">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <div className="text-center mb-3">
              <p>Sign in with:</p>
              <div className="flex justify-center space-x-3 my-3">
                <MDBBtn color="none" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>
                <MDBBtn color="none" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>
                <MDBBtn color="none" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>
                <MDBBtn color="none" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>
              <p>or:</p>
            </div>
            <MDBInput wrapperClass="mb-4" label="Email address" type="email" />
            <MDBInput wrapperClass="mb-4" label="Password" type="password" />
            <div className="flex justify-between mb-4">
              <MDBCheckbox name="flexCheck" value="" id="flexCheckLogin" label="Remember me" />
              <a href="#!">Forgot password?</a>
            </div>
            <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
            <div className="text-center">
              <p>
                Not a member?{' '}
                <button
                  onClick={() => setActiveTab('register')}
                  className="text-blue-600 font-bold"
                >
                  Register
                </button>
              </p>
            </div>
          </div>
          {activeTab !== 'login' && (
            <div className="absolute inset-0 bg-blue-500 opacity-50 pointer-events-none"></div>
          )}
        </div>

        {/* Register Panel */}
        <div className="w-1/2 relative">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            <div className="text-center mb-3">
              <p>Sign up with:</p>
              <div className="flex justify-center space-x-3 my-3">
                <MDBBtn color="none" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>
                <MDBBtn color="none" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>
                <MDBBtn color="none" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>
                <MDBBtn color="none" style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>
              <p>or:</p>
            </div>
            <MDBInput wrapperClass="mb-4" label="Name" type="text" />
            <MDBInput wrapperClass="mb-4" label="Username" type="text" />
            <MDBInput wrapperClass="mb-4" label="Email" type="email" />
            <MDBInput wrapperClass="mb-4" label="Password" type="password" />
            <div className="flex justify-center mb-4">
              <MDBCheckbox name="flexCheck" id="flexCheckRegister" label="I agree to the terms" />
            </div>
            <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
            <div className="text-center">
              <p>
                Already a member?{' '}
                <button
                  onClick={() => setActiveTab('login')}
                  className="text-blue-600 font-bold"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
          {activeTab !== 'register' && (
            <div className="absolute inset-0 bg-blue-500 opacity-50 pointer-events-none"></div>
          )}
        </div>
      </div>
    </div>
  );
}