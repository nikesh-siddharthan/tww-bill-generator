import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function App() {
  const [formData, setFormData] = useState({
    bookingId: '', bookingDate: '', guestName: '', totalRentAmount: 0.0,
    numberOfRooms: 0, numberOfNights: 0, numberOfPeople: 0, extraChildren: 0, voluntaryDiscount: 0, agentCommission: 0,
    propertyDiscount: 0, advancePaid: 0, idCardType: "", idCardNumber: ""
  });

  const [gst, setGST] = useState(0);
  const [rentBasePrice, setRentBasePrice] = useState(0);
  const [balanceToBePaid, setBalanceToBePaid] = useState(0);
  const [effectivePropertyRentPrice, setEffectivePropertyRentPrice] = useState(0);

  const contentRef = useRef();
  const GOV_GST = 0.18;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateValues = () => {
    setRentBasePrice(Math.round(formData.totalRentAmount / (1 + GOV_GST)));
    setGST(Math.round(formData.totalRentAmount - rentBasePrice));
    setBalanceToBePaid(Math.round(formData.totalRentAmount - formData.advancePaid));
  }

  const loadValues = (e) => {
    e.preventDefault();
    calculateValues();
  };

  const generatePdf = async () => {
    calculateValues();
    const content = contentRef.current;
    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);
    pdf.save('generated.pdf');
  };

  return (
    <div className="App">
      <h1>Generate PDF from HTML</h1>
      <form>
        <label>
          Booking ID:
          <input
            type="text"
            name="bookingId"
            value={formData.bookingId}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Booking Date:
          <input
            type="text"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Guest Name:
          <input
            type="text"
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Total Rent Amount:
          <input
            type="text"
            name="totalRentAmount"
            value={formData.totalRentAmount}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Number Of Rooms:
          <input
            type="text"
            name="numberOfRooms"
            value={formData.numberOfRooms}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Number Of Nights:
          <input
            type="text"
            name="numberOfNights"
            value={formData.numberOfNights}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Number Of People:
          <input
            type="text"
            name="numberOfPeople"
            value={formData.numberOfPeople}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ID Card Type:
          <input
            type="text"
            name="idCardType"
            value={formData.idCardType}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
        ID Card Number:
          <input
            type="text"
            name="idCardNumber"
            value={formData.idCardNumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Advance Paid:
          <input
            type="text"
            name="advancePaid"
            value={formData.advancePaid}
            onChange={handleChange}
          />
        </label>
        <br />

        <button
          onClick={loadValues}
        >Preview</button>
      </form>
      <div ref={contentRef} style={{ padding: '20px', marginTop: '20px', border: '1px solid #ccc' }}>
        <h2>Preview</h2>
        <p><img src="/images/westwoodlogo2.png" style={{ width: 100, height: 20 }}></img></p>
        <p><strong>Booking ID:</strong> {formData.bookingId}</p>
        <p><strong>Booking Date:</strong> {formData.bookingDate}</p>
        <p><strong>Guest Name:</strong> {formData.guestName}</p>
        <p><strong>Base Amount:</strong> {rentBasePrice}</p>
        <p><strong>GST Amount:</strong> {gst}</p>
        <p><strong>Total Rent Amount:</strong> {formData.totalRentAmount}</p>
        <p><strong>Advance Paid:</strong> {formData.advancePaid}</p>
        <p><strong>Balance To Be Paid:</strong> {balanceToBePaid}</p>
        <p><strong>Checkin Date:</strong> {formData.checkInDate}</p>
        <p><strong>Checkout Date:</strong> {formData.checkOutDate}</p>
        <p><strong>Number Of Nights:</strong> {formData.numberOfNights}</p>
        <p><strong>Number Of Rooms:</strong> {formData.numberOfRooms}</p>
        <p><strong>Number Of People:</strong> {formData.numberOfPeople}</p>        
        <p><strong>ID Card Type:</strong> {formData.idCardType}</p>
        <p><strong>ID Card Number:</strong> {formData.idCardNumber}</p>
      </div>
      <button onClick={generatePdf}>Download as PDF</button>
    </div>
  );
}

export default App;



// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
