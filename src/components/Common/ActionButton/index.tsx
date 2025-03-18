"use client";
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ActionButtonProps {
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onEdit, onDelete, onView }) => {
  return (
    <div className="flex space-x-2">
      <button
        className="px-3 py-1  hover:text-blue-700"
        onClick={onEdit}
      >
        <EditIcon />
      </button>
      <button
        className="px-3 py-1  hover:text-red-700"
        onClick={onDelete}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default ActionButton;
