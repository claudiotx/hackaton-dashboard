import React, { Component, useState } from 'react';
import { Parser as FormulaParser } from 'hot-formula-parser';
import Row from './Row';

const defaultMatrix = Array(15)
  .fill()
  .map(() => Array(15).fill({ editing: false, selected: false, type: '', value: '' }));

export default props => {
  const [matrix, setMatrix] = useState(defaultMatrix);
  const [parser, setParser] = useState(new FormulaParser());

  const handleChangedCell = (...args) => {
    console.log('handleChangedCell', ...args);
  };

  const handleEditingCell = selectedCellCoordinates => {
    const clonedMatrix = cloneMatrix(matrix);
    clonedMatrix.forEach((row, ri) => {
      row.forEach((column, ci) => {
        clonedMatrix[ri][ci].editing = false;
      });
    });
    clonedMatrix[selectedCellCoordinates.y][selectedCellCoordinates.x].editing = true;
    setMatrix(clonedMatrix);
  };

  const executeFormula = (...args) => {
    console.log('executeFormula', ...args);
  };

  const updateCells = (...args) => {
    console.log('updateCells', ...args);
  };

  const handleSelectedCell = selectedCellCoordinates => {
    const clonedMatrix = cloneMatrix(matrix);
    clonedMatrix.forEach((row, ri) => {
      row.forEach((column, ci) => {
        clonedMatrix[ri][ci].selected = false;
      });
    });
    clonedMatrix[selectedCellCoordinates.y][selectedCellCoordinates.x].selected = true;
    setMatrix(clonedMatrix);
  };

  const cloneMatrix = matrix => {
    return JSON.parse(JSON.stringify(matrix));
  };

  return (
    <div className={'matrix'}>
      {matrix.map((row, rowIndex) => {
        return (
          <Row
            handleEditingCell={handleEditingCell}
            handleChangedCell={handleChangedCell}
            handleSelectedCell={handleSelectedCell}
            executeFormula={executeFormula}
            updateCells={updateCells}
            key={rowIndex}
            y={rowIndex}
            matrix={matrix}
          />
        );
      })}
    </div>
  );
};
