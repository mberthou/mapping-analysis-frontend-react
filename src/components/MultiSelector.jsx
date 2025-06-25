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
                choices.map( elem => (
                    <option key={elem} value={elem}>{elem}</option>
            ))}
        </select>
    );    
}


export default MultiSelector;