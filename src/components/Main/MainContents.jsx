import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MainContents = ({ sortBy }) => {
    const [data, setData] = useState({});
    const [page, setPage] = useState(1); // 현재 페이지
    const [pageLimit, setPageLimit] = useState(10); // 페이지 당 게시물 수
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    
    const numPages = Math.ceil(total / pageLimit);
    const offset = (page-1) * pageLimit;

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get('http://3.38.117.203/posts');

                let sortedData = [];

                if (sortBy === 'id,DESC') {
                    sortedData = response.data.sort((a, b) => b.id - a.id);
                } else if (sortBy === 'id,ASC') {
                    sortedData = response.data.sort((a, b) => a.id - b.id);
                }

                setData(sortedData);
                setTotal(sortedData.length);
                setPageLimit(response.data.pageable.size);
            } catch(error) {
                console.error('Error fetching local data:', error);
            }
        };

        fetchData();
    }, [sortBy]);

    const handleClick = (itemId) => {
        navigate(`/posts/${itemId}`);
    }

    return (
        <div className="container">
            <div className="contents">
                {data.length > 0 && (
                    <ul>
                        {data.slice(offset, offset + pageLimit).map((item) => (
                            <>
                                <li key={item.id} >
                                    <h1 onClick={() => handleClick(item.id)} style={{cursor: 'pointer'}}>{item.title}</h1>
                                    <p>{item.content}</p>
                                    <p>{item.createAt}</p>
                                    <p>{item.modifiedAt}</p>
                                </li>
                            </>
                        ))}
                    </ul>
                )
                }
            </div>
            <div className="pageButtons">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    &lt;
                </button>
                {Array(numPages)
                .fill()
                .map((_, i) => (
                    <button
                        key={i+1}
                        onClick={() => setPage(i+1)}
                    >
                        {i+1}
                    </button>
                ))}
                <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
                    &gt;
                </button>
            </div>
        </div>
    )
}

export default MainContents