import React, { useState } from 'react'

function SearchBar({onSearch,searchTerm,setSearchTerm}) {

    // const [searchTerm,setSearchTerm] = useState('')

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(searchTerm)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Search by First Name, Last Name, or Both...'
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button type='submit'>Search</button>
        </form>
    )
}

export default SearchBar