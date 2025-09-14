import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableDiagnosisProps {
  id: string;
  text: string;
  onDelete: (id: string) => void;
}

export const SortableDiagnosis: React.FC<SortableDiagnosisProps> = ({ id, text, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none', // For better mobile support
  };

  return (
    <div ref={setNodeRef} style={style} className="diagnosis-item">
      <span className="drag-handle" {...attributes} {...listeners}>::</span>
      <span className="diagnosis-text">{text}</span>
      <button onClick={() => onDelete(id)} className="delete-btn">×</button>
    </div>
  );
};
