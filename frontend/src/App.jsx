import { useState } from 'react'
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [showTable, setShowTable] = useState(false)
  const [visitors, setVisitors] = useState([])
  const [search, setSearch] = useState('')
  const [editId, setEditId] = useState(null)

  // View visitors
  function loadVisitors() {
    fetch('http://localhost:3000/visitors')
      .then(res => res.json())
      .then(data => {
        setVisitors(data)
        setShowTable(true)
      })
      .catch(() => alert('Error loading visitors'))
  }

  // Add and Update visitor
  function submitVisitor(e) {
    e.preventDefault()

    const form = e.target

    const visitor = {
      visitDate: form.date.value,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      mobile: form.mobile.value,
      vehicleNumber: form.vehicleNumber.value,
      purpose: form.purpose.value,
      timeIn: form.timeIn.value,
      timeOut: form.timeOut.value || null,
      tenantName: form.tenantName.value,
      tenantMobile: form.tenantMobile.value,
      flatNumber: form.flatNumber.value,
      tenantAddress: form.tenantAddress.value
    }

    const url = editId
      ? `http://localhost:3000/visitors/${editId}`
      : 'http://localhost:3000/visitors'

    fetch(url, {
      method: editId ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(visitor)
    })
      .then(() => {
        setShowForm(false)
        setEditId(null)
        loadVisitors()
        alert(editId ? 'Visitor updated!' : 'Visitor added!')
      })
      .catch(() => alert('Error saving visitor'))
  }

  // Edit visitor
  function editVisitor(visitor) {
    setEditId(visitor.serialNo)
    setShowForm(true)
  }

  // Delete visitor
  function deleteVisitor(id) {
    if (window.confirm('Do you want to delete this visitor?')) {
      fetch(`http://localhost:3000/visitors/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          loadVisitors()
          alert('Visitor deleted!')
        })
        .catch(() => alert('Error deleting visitor'))
    }
  }

  // Search visitor
  const filteredVisitors = visitors.filter(visitor =>
    Object.values(visitor).some(value =>
      String(value ?? '').toLowerCase().includes(search.toLowerCase())
    )
  )

  return (
    <div className="app">

      <h1>Visitor Management System</h1>
      <p>Welcome to our Apartment Visitor Management System</p>

      <button onClick={() => {
        setEditId(null)
        setShowForm(true)
      }}>
        Add Visitor
      </button>

      {showForm && (
        <div className="popup-overlay">
          <div className="form-container">

            <h2>{editId ? 'Edit Visitor' : 'Visitor Registration'}</h2>

            <form
              key={editId || 'new'}
              onSubmit={submitVisitor}
            >

              <h3>Visitor Details</h3>

              <input type="date" name="date" defaultValue={visitors.find(v => v.serialNo === editId)?.visitDate || ''} required />

              <input type="text" name="firstName" placeholder="First Name" defaultValue={visitors.find(v => v.serialNo === editId)?.firstName || ''} required />

              <input type="text" name="lastName" placeholder="Last Name" defaultValue={visitors.find(v => v.serialNo === editId)?.lastName || ''} required />

              <input type="tel" name="mobile" placeholder="Mobile Number" defaultValue={visitors.find(v => v.serialNo === editId)?.mobile || ''} required />

              <input type="text" name="vehicleNumber" placeholder="Vehicle Number" defaultValue={visitors.find(v => v.serialNo === editId)?.vehicleNumber || ''} required />

              <input type="text" name="purpose" placeholder="Purpose of Visit" defaultValue={visitors.find(v => v.serialNo === editId)?.purpose || ''} required />

              <label>Time In</label>
              <input type="time" name="timeIn" defaultValue={visitors.find(v => v.serialNo === editId)?.timeIn || ''} required />

              <label>Time Out</label>
              <input type="time" name="timeOut" defaultValue={visitors.find(v => v.serialNo === editId)?.timeOut || ''} />

              <h3>Tenant Details</h3>

              <input type="text" name="tenantName" placeholder="Tenant Name" defaultValue={visitors.find(v => v.serialNo === editId)?.tenantName || ''} required />

              <input type="tel" name="tenantMobile" placeholder="Tenant Mobile Number" defaultValue={visitors.find(v => v.serialNo === editId)?.tenantMobile || ''} required />

              <input type="text" name="flatNumber" placeholder="Flat Number" defaultValue={visitors.find(v => v.serialNo === editId)?.flatNumber || ''} required />

              <label>Tenant Permanent Address</label>
               <input type="text" name="tenantAddress" value="Blossom Residency, Anna Nagar, Chennai, Tamil Nadu - 600040"
               readOnly/>

              <button type="submit">
                {editId ? 'Update Visitor' : 'Submit Visitor'}
              </button>

              <button type="button" onClick={() => {
                setShowForm(false)
                setEditId(null)
              }}>
                Cancel
              </button>

            </form>
          </div>
        </div>
      )}

      {showTable && (
        <div className="table-container">

          <h2>Visitor Details</h2>

          <input
            type="text"
            placeholder="Search visitors..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <table className="visitor-table">

            <thead>
              <tr>
                <th>Serial No</th>
                <th>Date</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Mobile</th>
                <th>Vehicle</th>
                <th>Purpose</th>
                <th>Time In</th>
                <th>Time Out</th>
                <th>Tenant Name</th>
                <th>Tenant Mobile</th>
                <th>Flat</th>
                <th>Tenant Address</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredVisitors.map(visitor => (
                <tr key={visitor.serialNo}>
                  <td>{visitor.serialNo}</td>
                  <td>{visitor.visitDate}</td>
                  <td>{visitor.firstName}</td>
                  <td>{visitor.lastName}</td>
                  <td>{visitor.mobile}</td>
                  <td>{visitor.vehicleNumber}</td>
                  <td>{visitor.purpose}</td>
                  <td>{visitor.timeIn}</td>
                  <td>{visitor.timeOut}</td>
                  <td>{visitor.tenantName}</td>
                  <td>{visitor.tenantMobile}</td>
                  <td>{visitor.flatNumber}</td>
                  <td>{visitor.tenantAddress}</td>
                  <td>
                    <button onClick={() => editVisitor(visitor)}>Edit</button>
                    <button onClick={() => deleteVisitor(visitor.serialNo)}>Delete</button>
                  </td>
                </tr>
              ))}

              {filteredVisitors.length === 0 && (
                <tr>
                  <td colSpan="14">No visitors found</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      )}

    </div>
  )
}

export default App





