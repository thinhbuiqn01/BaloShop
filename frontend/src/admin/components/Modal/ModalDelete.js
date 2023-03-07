import React from "react";
import { useState } from "react";
import "./ModalDelete.css";

const ModalDelete = (props) => {
  const { onCancel, onDelete } = props;
  return (
    <div className="modalDelete">
      <h2 className="modalDelete-title">Are your sure</h2>
      <p>
        Are you sure you want to reject this profile? You CAN NOT view this
        profile in your list anymore if you delete.
      </p>
      <div className="modalDelete-btn">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default ModalDelete;
