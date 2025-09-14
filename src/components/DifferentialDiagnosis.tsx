import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableDiagnosis } from './SortableDiagnosis';

export interface Diagnosis {
  id: string;
  text: string;
}

const DifferentialDiagnosis: React.FC = () => {
  const [items, setItems] = useState<Diagnosis[]>([]);
  const [inputValue, setInputValue] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.findIndex((item) => item.id === active.id);
        const newIndex = currentItems.findIndex((item) => item.id === over.id);
        return arrayMove(currentItems, oldIndex, newIndex);
      });
    }
  };

  const handleAddItem = () => {
    if (inputValue.trim() === '') return;
    const newItem: Diagnosis = {
      id: `item-${Date.now()}`,
      text: inputValue.trim(),
    };
    setItems((currentItems) => [...currentItems, newItem]);
    setInputValue('');
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  const handleDeleteItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  return (
    <div className="diagnosis-container">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className="diagnosis-list">
            {items.map(({ id, text }) => (
              <SortableDiagnosis key={id} id={id} text={text} onDelete={handleDeleteItem} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div className="add-diagnosis-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Add a diagnosis and press Enter"
          className="diagnosis-input"
        />
        <button onClick={handleAddItem} className="add-btn">+</button>
      </div>
    </div>
  );
};

export default DifferentialDiagnosis;
