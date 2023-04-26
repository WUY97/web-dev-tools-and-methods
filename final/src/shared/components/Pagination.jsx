function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <div className='pagination'>
                {pageNumbers.map((number) => (
                    <div key={number} className='page-item'>
                        <a
                            onClick={() => paginate(number)}
                            href='!#'
                            className={`${
                                currentPage === number ? 'current-page-link' : 'other-page-link'
                            }`}
                        >
                            {number}
                        </a>
                    </div>
                ))}
            </div>
        </nav>
    );
}

export default Pagination;