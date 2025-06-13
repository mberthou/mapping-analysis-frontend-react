import React, { useState, useRef, useEffect } from 'react';


function MultiSelector({name, choices, selectedChoices, setSelectedChoices}) {
    return (
        <select 
            multiple={true}
            value={selectedChoices}
            onChange={e => {
            const options = [...e.target.selectedOptions];
            const values = options.map(option => option.value);
            setSelectedChoices(values);
            }}
            name={name}>
            {
                choices.map( param => (
                    <option key={param} value={param}>{param}</option>
            ))}
        </select>
    );    
}


export default MultiSelector;