import React from 'react'

const Filter = ({ newFilter, handleFilerChange}) => {
    return (
        <div>
        filter shown with 
            <input 
                value={newFilter}
                onChange={handleFilerChange}
            />
        </div>
    ) 
}

export default Filter