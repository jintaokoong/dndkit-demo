import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { UniqueIdentifier } from '@dnd-kit/core';

type Props = {
  id: UniqueIdentifier;
  onDeleteClick?: (id: UniqueIdentifier) => void;
}

const colors = ['red', 'blue', 'green'];

export function SortableItem(props: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    color: 'white',
    backgroundColor: colors[parseInt(props.id.toString()) - 1] || 'black',
  };
  
  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {props.id} <button {...listeners} style={{ cursor: 'grab' }}>Grab Here</button> <button onClick={() => props.onDeleteClick && props.onDeleteClick(props.id)}>
        Delete Me
      </button>
    </div>
  );
}