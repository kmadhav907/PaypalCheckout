import './App.css'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyDU56E6hXTmNqCWDPaVOa9C-gllPechIAY',
  authDomain: 'fir-5764c.firebaseapp.com',
  projectId: 'fir-5764c',
  storageBucket: 'fir-5764c.appspot.com',
  messagingSenderId: '963675855027',
  appId: '1:963675855027:web:ed27d16b0aa037141e38c6',
  measurementId: 'G-52V69PC8PJ',
}
firebase.initializeApp(firebaseConfig)
const PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM })

function App() {
  const onApprove = (data, actions) => {
    return actions.order.capture()
  }
  const [price, setPrice] = useState(0)
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price,
          },
        },
      ],
    })
  }
  return (
    <div className='App'>
      <div className='wrapper'>
        <h2 style={{ fontFamily: 'sans-serif' }}>Enter your donation in $</h2>
        <input
          type='text'
          className='InputField'
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <br />
        <br />

        <PayPalButton
          createOrder={(data, actions) => createOrder(data, actions)}
          onApprove={(data, actions) => onApprove(data, actions)}
        />
      </div>
    </div>
  )
}

export default App
