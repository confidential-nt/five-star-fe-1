import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import timeAgo from "../../utils/time-ago";
import axios from 'axios';
import styles from './MainContentsStyle.module.css';

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
                const response = await axios.get('/posts');

                console.log(response.data);

                let sortedData = [];

                if (sortBy === 'id,DESC') {
                    sortedData = response.data.sort((a, b) => b.id - a.id);
                } else if (sortBy === 'id,ASC') {
                    sortedData = response.data.sort((a, b) => a.id - b.id);
                }

                setData(sortedData);
                setTotal(sortedData.length);
                // setPageLimit(response.data.params.size);
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
        <div className={styles.container}>
            <div className={styles.contents}>
                <div className={styles.content}>
                    {data.length > 0 && (
                        <ul>
                            {data.slice(offset, offset + pageLimit).map((item) => (
                                <>
                                    <li 
                                    key={item.id}
                                    onClick={() => {handleClick(item.id); console.log(item);}}
                                    style={{cursor: 'pointer'}}
                                    >
                                        <h1>{item.title}</h1>
                                        <p>{timeAgo(item.createAt, navigator.language)}</p>
                                        <p>{`${new Date(item.modifiedAt).toLocaleString()}`}</p>
                                    </li>
                                </>
                            ))}
                        </ul>
                    )
                    }
                </div>
            </div>
            <div className={styles.pageButtons}>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    &lt;
                </button>
                {Array(numPages)
                .fill()
                .map((_, i) => (
                    <button
                        className={page === i + 1 ? styles.currentBtn : styles.pageBtn}
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