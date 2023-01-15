
const DEFAULT_PAGE_NUMBER = 1;

//limit is zero all documents will be returned
const DEFAULT_PAGE_LIMIT = 0

const getPagination = (query) => {

    const limit = Math.abs(query.page) || DEFAULT_PAGE_LIMIT;
    const page = Math.abs(query.limit) || DEFAULT_PAGE_NUMBER

    //this skips the first 50 documents when we move to the next page
    const skip = (page - 1) * limit;


    return {
        skip,
        limit
    }
}


module.exports = {
    getPagination
}