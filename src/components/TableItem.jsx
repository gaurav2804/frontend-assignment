import { convertCurrency } from "../utils"


const TableItem = ({ project, selectedCurrency }) => {
    return (
        <tr className="table-row">
            <td>{project['s.no']}</td>
            <td>{project['percentage.funded']}%</td>
            <td>{`${selectedCurrency.symbol} ${convertCurrency(selectedCurrency.rate, project['amt.pledged'])}`}</td>
        </tr>   
    )
}

export default TableItem
