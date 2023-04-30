import React from 'react'

function Footer() {
  return (
    <div  style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        textAlign: 'center',
        width: '100%',
        backgroundColor: '#212529',
        }} 
       >
        
        <footer  className="py-3 text-white-50">
            <div className="container text-center">
            <small>Copyright 2023 &copy; lms@gmail.com</small>
            </div>
        </footer>
    </div>
  )
}

export default Footer