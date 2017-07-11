import React from 'react';
import {connect} from 'react-redux';

import './ticket-list.css';

export function TicketList(props) {

  const ticketInfo = props.ticket.map((index, item) => {
    <tr key={index} index={index} className="ticket-info-row">
      <td>{item.group}</td>
      <td>{item.location}</td>
      <td>{item.request}</td>
      <td>{item.status}</td>
    </tr>
  });

  return (
    <div className="ticket-container">
      <table className="ticket-table">
        <thead className="ticket-header">
          <tr className="ticket-row-headers">
            <th>Name</th>
            <th>Location</th>
            <th>Request</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="ticket-body">
          {ticketInfo}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => ({
  ticket: state.ticket
});

export default connect(mapStateToProps)(TicketList);