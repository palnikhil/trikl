import React from 'react';
import Draggable from 'react-draggable';

function TextOverlay({ text, position, onDrag}) {
  return (
    <Draggable
      handle=".handle"
      position={position}
      onStop={onDrag}
      defaultPosition={{ x:  '50%', y: '50%' }}
    >
        <div className="text-overlay">
          <div className="handle">
            {text}
          </div>
        </div>
    </Draggable>
  );
}

export default TextOverlay;

