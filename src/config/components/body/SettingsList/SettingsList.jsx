import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { Setting } from './Setting';
import { switchSettings } from '../../../redux/settingsSlice';

export const SettingsList = () => {
  const settings = useSelector((state) => state.settings.settings);

  const dispatch = useDispatch();
  const handleDragEnd = (event) => dispatch(switchSettings(event));

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {settings.map((setting, index) => (
                <Setting setting={setting} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
