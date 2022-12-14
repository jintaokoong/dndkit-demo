import {
  closestCenter, DndContext, DragEndEvent, KeyboardSensor,
  PointerSensor, UniqueIdentifier, useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';

import { SortableItem } from './SortableItem';

function App() {
  const [items, setItems] = useState<UniqueIdentifier[]>([1, 2, 3]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    console.log('orders changed', items.join(', '));

    return () => {
      console.log('cleanup', items.join(', '));
    }
  }, [items]);

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {items.map(id => <SortableItem key={id} id={id} onDeleteClick={(id) => {
          setItems((prev) => prev.filter((i) => i !== id));
        }} />)}
      </SortableContext>
    </DndContext>
  );
  
  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    if (!over) return console.log('over is null');
    
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        const next =  arrayMove(items, oldIndex, newIndex);
        console.log('next', next.join(', '))
        return next;
      });
    }
  }
}

export default App;