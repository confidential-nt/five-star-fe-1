import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import posts from '../../../public/data/';

const MainContents = ({ sortBy }) => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch("/data/posts.json");
                const jsonData = await response.json();

                let sortedData = [];

                if (sortBy === 'id,DESC') {
                    sortedData = jsonData.sort((a, b) => b.id - a.id);
                } else if (sortBy === 'id,ASC') {
                    sortedData = jsonData.sort((a, b) => a.id - b.id);
                }


                setData(sortedData);
            } catch(error) {
                console.error('Error fetching local data:', error);
            }
        };

        fetchData();
    }, [sortBy]);

    console.log(data);

    return (
    <div className="contents">
        {data.length > 0 && (
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        <h1>{item.title}</h1>
                        <p>{item.content}</p>
                        <p>{item.createAt}</p>
                        <p>{item.modifiedAt}</p>
                    </li>
                ))}
            </ul>
        )
        }
    </div>
    )
}

export default MainContents