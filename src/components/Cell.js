import React, { Component, useState } from 'react';

export default props => {
  const onKeyPressOnSpan = () => {
    if (props.value.editing) {
      props.onCellEditing({ x: props.x, y: props.y });
    }
  };

  const clicked = () => {
    props.onCellSelected({ x: props.x, y: props.y });
  };

  const doubleClicked = () => {
    props.onCellEditing({ x: props.x, y: props.y });
  };

  const onBlur = () => {
    console.log('on blur');
  };

  const onKeyPressOnInput = () => {
    console.log('onKeyPressOnInput');
  };

  const onChange = () => {
    console.log('on change');
  };

  const determineDisplay = ({ x, y }, value) => {
    if (value.slice(0, 1) === '=') {
      const res = props.executeFormula({ x, y }, value.slice(1));
      if (res.error !== null) {
        return 'INVALID';
      }
      return res.result;
    }
    return value;
  };

  const calculateCss = props => {
    // console.log('inspecting props selected', props.value.selected, props.x, props.y);
    const css = {
      width: '80px',
      padding: '4px',
      margin: '0',
      height: '25px',
      boxSizing: 'border-box',
      position: 'relative',
      display: 'inline-block',
      color: 'black',
      border: '1px solid #cacaca',
      textAlign: 'left',
      verticalAlign: 'top',
      fontSize: '14px',
      lineHeight: '15px',
      overflow: 'hidden',
      fontFamily: "Calibri, 'Segoe UI', Thonburi,        Arial, Verdana, sans- serif",
    };

    if (props.x === 0 || props.y === 0) {
      css.textAlign = 'center';
      css.backgroundColor = '#f0f0f0';
      css.fontWeight = 'bold';
    }

    if (props.value.selected) {
      css.outlineColor = 'lightblue';
      css.outlineStyle = 'dotted';
    }
    return css;
  };

  // Temporary variables
  const css = calculateCss(props);
  const alpha = ' abcdefghijklmnopqrstuvwxyz'.split('');

  // Column Zero
  if (props.x === 0) {
    return <span style={css}>{props.y}</span>;
  }

  // Row Zero
  if (props.y === 0) {
    return (
      <span onKeyPress={onKeyPressOnSpan} style={css} role="presentation">
        {alpha[props.x]}
      </span>
    );
  }

  // Editing Data Cells
  if (props.value.editing) {
    return (
      <input
        style={css}
        type="text"
        onBlur={onBlur}
        onKeyPress={onKeyPressOnInput}
        value={props.value.value}
        onChange={onChange}
        autoFocus
      />
    );
  }

  // Standby Data cells
  return (
    <span
      onClick={e => clicked(e)}
      onDoubleClick={e => doubleClicked(e)}
      style={css}
      role="presentation"
    >
      {determineDisplay}
    </span>
  );
};
