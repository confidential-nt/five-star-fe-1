import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import timeAgo from "../../utils/time-ago";
import axios from 'axios';
import styles from './MainContentsStyle.module.css';

const MainContents = ({ sortBy }) => {
    const [data, setData] = useState({});
    const [page, setPage] = useState(1); // 현재 페이지
    const [pageLimit, setPageLimit] = useState(10); // 페이지 당 게시물 수
    const [total, setTotal] = useState('');
    const navigate = useNavigate();
    
    const numPages = Math.ceil(total / pageLimit);
    const offset = (page-1) * pageLimit;
    
    const fetchAllPosts = async () => {
        let allPosts = [];
        let currentPage = 0;
    
        try {
            while (true) {
                const response = await axios.get(`/posts?page=${currentPage}`);
                const posts = response.data; // 현재 페이지의 게시물들

                if (posts.length === 0) {
                // 더 이상 데이터가 없으면 반복문 종료
                    break;
                }

                allPosts = allPosts.concat(posts);
                currentPage += 1;
            }
            return allPosts; // 모든 게시물 데이터 반환
            } catch (error) {
                console.error('Error fetching data:', error);
                return null;
            }
        };

    useEffect(() => {
        const sortData = async() => {
            try {                
                const response = await fetchAllPosts();
                console.log(response);
                let sortedData = [];

                if (sortBy === 'id,DESC') {
                    sortedData = response.sort((a, b) => b.id - a.id);
                } else if (sortBy === 'id,ASC') {
                    sortedData = response.sort((a, b) => a.id - b.id);
                }

                setData(sortedData);
                setTotal(sortedData.length);
            }  catch(error) {
                console.error('Error fetching local data:', error);
            }
        };

        sortData();
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
                                    onClick={() => {handleClick(item.id);}}
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