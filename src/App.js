import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/ui/Header'
import CharacterGrid from './components/characters/ChracterGrid'
import Search from './components/ui/Search'
import ReactPaginate from 'react-paginate'
import './App.css'

const App = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [paginateItems, setPaginateItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      const result = await axios(
        `https://www.breakingbadapi.com/api/characters?name=${query}`
      )

      console.log(result.data)

      setItems(result.data)
      setPaginateItems(result.data.slice(0, 10))
      setIsLoading(false)
    }

    fetchItems()
  }, [query])
  const handlePageClick = (data) => {
   const { selected } = data;
   let temp = items.slice(selected * 10, (selected + 1) * 10);
   setPaginateItems(temp)
  }
  return (
    <div className='container'>
      <Header />
      <Search getQuery={(q) => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={paginateItems} />
      <ReactPaginate
        pageCount={Math.ceil(items.length / 10)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
      />
    </div>
  )
}

export default App