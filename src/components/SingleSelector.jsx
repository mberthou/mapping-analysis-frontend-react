function SingleSelector({name, choices, selectedChoice, setSelectedChoice}) {
    return (
        <select
            value={selectedChoice}
            onChange={e => setSelectedChoice(e.target.value)}
            name={name}>
            {
                choices.map( elem => (
                    <option key={elem} value={elem}>{elem}</option>
            ))}
        </select>
    );    
}


export default SingleSelector;