import React from 'react'
import MultiStepForm from './components/MultiStepForms'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Multi-Step Registration Form</h1>
        <p className="mt-2 text-lg text-gray-600">Complete all steps to register your account</p>
      </header>
      <main className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <MultiStepForm />
      </main>
      <footer className="w-full max-w-4xl mt-8 text-center text-sm text-gray-500">
        © 2023 Your Company Name. All rights reserved.
      </footer>
    </div>
  )
}