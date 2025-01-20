import { useEffect, useState } from 'react'
import { useGetProjects } from '../hooks/useGetProjects'
import TableItem from './TableItem';
import { CURRENCY_EXCHANGE_RATES } from '../constants/exchangeRates';
import DummyTableItem from './DummyTableItem';

const Table = () => {
    const { getProjectsFromPage, totalPages } = useGetProjects()

    const [currentPage, setCurrentPage] = useState(1);
    const [projects, setProjects] = useState([])
    const [currentSelectedCurrency, setCurrentSelectedCurrency] = useState(CURRENCY_EXCHANGE_RATES.currencies[0])

    function changeCurrentSelectedCurrency(eventObject){
        const selectedCurrencyCode = eventObject.target.value
        const selectedCurrencyObject = CURRENCY_EXCHANGE_RATES.currencies.find((currency=>currency.code===selectedCurrencyCode))
        setCurrentSelectedCurrency(selectedCurrencyObject)
    }

    useEffect(() => {
        const newProjectForPage = getProjectsFromPage(currentPage)
        setProjects(newProjectForPage)
    }, [currentPage, getProjectsFromPage])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Percentage Funded</th>
                        <th className='th-amount-pledged'>Amount Pledged 
                          
                            <select id='currency-select-dropdown' className='currency-select-dropdown'  value={currentSelectedCurrency.code} onChange={changeCurrentSelectedCurrency}>
                                {
                                    CURRENCY_EXCHANGE_RATES.currencies.map((currency)=>{
                                        return <option value={currency.code} key={currency.code}>{currency.name}</option>
                                    })
                                }
                            </select>
                      

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <TableItem project={project} key={`${project['s.no']}-${project.url}`} selectedCurrency={currentSelectedCurrency} />
                    ))}
                    {projects.length<5?Array(5-projects.length).fill(0).map((_, index)=>{
                        return <DummyTableItem key={index}/>
                    }):null}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Table
