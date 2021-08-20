const filters = {
    searchText: '',
    archived: false 
}

const getFilters = () => filters

const setFilters = ({ searchText, archived }) => {
    if (typeof searchText === 'string') {
        filters.searchText = searchText
    }
    if (typeof archived === 'boolean') {
        filters.archived = archived
    }
}

