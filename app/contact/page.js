import React from 'react'

const contact = () => {
  return (
    // Parent Container: stacks items vertically and centers them on the page
    <div className='flex flex-col gap-6 w-full max-w-2xl mx-auto p-6'>
      
      {/* Top Card */}
      <div className='w-full bg-white p-10 border border-blue-600 border-3 rounded-xl shadow-sm'>
        <h2 className='text-xl font-bold mb-2 text-gray-800'>Contact Information</h2>
        <p className='text-gray-600'>Contact us at our toll-free number: <span className='font-bold text-black bg-yellow-300 p-1 rounded-bl-lg '>9100716612</span></p>
      </div>

      {/* Bottom Card */}
      <div className='w-full bg-white p-10 border border-blue-600 border-3 rounded-xl shadow-sm'>
        <h2 className='text-xl font-bold mb-2 text-gray-800'>Send an Email</h2>
        <p className='text-gray-600'> Reach us at our Email ID <span className='font-bold text-black bg-yellow-300 p-1 rounded-bl-lg '>bluepillar72@gmail.com</span></p>
      </div>

      <div className='w-full bg-white p-10 border border-blue-600 border-3 rounded-xl shadow-sm'>
        <h2 className='text-xl font-bold mb-2 text-gray-800'>We currently operate in Hyderabd - Urban </h2>
        
        
      </div>
 <footer className='w-full text-center text-sm text-gray-500'>
        <p>&copy; {new Date().getFullYear()} Pride. All rights reserved.</p>
      </footer>
    </div>
    
  )
}

export default contact
