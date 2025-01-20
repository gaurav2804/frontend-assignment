import { useCallback, useEffect, useState } from "react";


export function useGetProjects() {
    const [projectList, setProjectList] = useState([])
    const [totalPages, setTotalPages] = useState(0)

    // Maximum records to show per page
    const MAX_PAGE_ITEMS_COUNT = 5

    // Function ton fetch the project list
    async function fetchProjects() {
        try {
            const response = await fetch(
                'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json'
            );
            const data = await response.json();
            setProjectList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const getProjectsFromPage = useCallback(function (pageNumber) {
        const projectListCopy = [...projectList]
        const newIndexForCurrentPage = MAX_PAGE_ITEMS_COUNT * (pageNumber - 1)
        const paginatedProjects = projectListCopy.slice(newIndexForCurrentPage, newIndexForCurrentPage + MAX_PAGE_ITEMS_COUNT)
        return paginatedProjects
    }, [projectList])

    const getTotalPages = useCallback(function () {
        return Math.ceil(projectList.length / MAX_PAGE_ITEMS_COUNT)
    }, [projectList]
    )
    useEffect(() => {
        fetchProjects()
    }, [])

    useEffect(() => {
        const totalPages = getTotalPages()
        setTotalPages(totalPages)
    }, [getTotalPages])

    return {
        getProjectsFromPage: getProjectsFromPage,
        totalPages: totalPages
    }

}


// Sample Interface for Project
// {
//     sNo: number;
//     amtPledged: number;
//     blurb: string;
//     by: string;
//     country: string;
//     currency: string;
//     endTime: Date;
//     location: string;
//     percentageFunded: number;
//     numBackers: string; // Can be numeric or contain non-numeric values
//     state?: string; // Optional field
//     title: string;
//     type: string;
//     url: string;
//   }