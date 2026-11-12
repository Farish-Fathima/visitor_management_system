
import { useState } from 'react'
import './App.css'

function App() {

  const [showForm, setShowForm] = useState(false)

  function openForm() {
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
  }

  function submitVisitor(event) {
  event.preventDefault()

  const visitor = {
    date: event.target.date.value,
    timeIn: event.target.timeIn.value,
    timeOut: event.target.timeOut.value
  }

  alert('Visitor registered successfully!')
  closeForm()
}

  return (
    <div className="app">

      <h1>Visitor Management System</h1>

      <p>Welcome to our Apartment Visitor Management System</p>

      <button onClick={openForm}>
        Add Visitor
      </button>

      {showForm && (

        <div className="popup-overlay">

          <div className="form-container">

            <h2>Visitor Registration</h2>

            <form onSubmit={submitVisitor}>

              <h3>Visitor Details</h3>

              <input type="date" name="date" required />

              <input type="text" placeholder="Enter First Name" required />

              <input type="text" placeholder="Last Name" required />

              <input type="tel" placeholder="Mobile Number" maxLength="10" required />

              <input type="text" placeholder="Vehicle Number" required />

              <input type="text" placeholder="Purpose of Visit" required />

              <h3>Tenant Details</h3>

              <input type="text" placeholder="Tenant Name" required />

              <input type="tel" placeholder="Tenant Mobile Number" maxlength="10" required />

              <input type="text" placeholder="Flat Number" required />
              
              <input type="time" name="timeIn" required />

              <input type="time" name="timeOut" required />

              <div className="submit-button">

                <button type="submit">
                  Submit Visitor
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  )
}

export default App




