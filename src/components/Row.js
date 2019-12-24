import React, { Component, useState } from 'react';
import Cell from './Cell';

export default props => {
  const executeFormula = (...args) => {
    console.log('executeFormula', ...args);
  };
  const updateCells = (...args) => {
    console.log('updateCells', ...args);
  };
  const handleChangedCell = (...args) => {
    console.log('handleChangedCell', ...args);
  };

  const handleSelectedCell = selectedCellCoordinates => {
    props.handleSelectedCell(selectedCellCoordinates);
  };

  const handleEditingCell = selectedCellCoordinates => {
    props.handleEditingCell(selectedCellCoordinates);
  };

  return (
    <div className={'row'}>
      {props.matrix.map((column, columnIndex) => {
        return (
          <Cell
            onChangedValue={handleChangedCell}
            onCellEditing={handleEditingCell}
            onCellSelected={handleSelectedCell}
            selectedCell={props.selectedCell}
            updateCells={updateCells}
            value={props.matrix[props.y][columnIndex]}
            executeFormula={executeFormula}
            key={columnIndex}
            y={props.y}
            x={columnIndex}
          />
        );
      })}
    </div>
  );
};
