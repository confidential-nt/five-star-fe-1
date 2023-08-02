import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import timeAgo from "../../utils/time-ago";
import axios from "axios";
import styles from "./MainContentsStyle.module.css";
import Pagination from "../pagination/Pagination";

const MainContents = ({ sortBy }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState({});
  const [page, setPage] = useState(searchParams.get("page") || 1); // 현재 페이지
  // eslint-disable-next-line
  const [total, setTotal] = useState("");
  const navigate = useNavigate();

  // eslint-disable-next-line
  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
  });

  useEffect(() => {
    const sortData = async () => {
      try {
        const response = await axios.get(`/posts?page=${page - 1}`);
        let sortedData = [];
        console.log(response);
        if (sortBy === "id,DESC") {
          sortedData = response.data.sort((a, b) => b.id - a.id);
        } else if (sortBy === "id,ASC") {
          sortedData = response.data.sort((a, b) => a.id - b.id);
        }
        return sortedData;
        // setData(sortedData);
        // setTotal(sortedData.length);
      } catch (error) {
        throw new Error(`Error fetching local data: ${error}`);
      }
    };

    sortData()
      .then((data) => {
        setData(data);
        setTotal(data.length);
      })
      .catch(console.log);
  }, [sortBy, page]);

  const handleClick = (itemId) => {
    navigate(`/posts/${itemId}`);
  };

  const onNumberClick = (page) => {
    setPage(page);
  };

  const onPrevClick = () => {
    setPage((prev) => {
      setSearchParams({ page: prev - 1 });
      return prev - 1;
    });
  };
  const onNextClick = () => {
    setPage((prev) => {
      setSearchParams({ page: prev + 1 });
      return prev + 1;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.content}>
          {data.length && (
            <ul>
              {data.map((item) => (
                <>
                  <li
                    key={item.id}
                    onClick={() => {
                      handleClick(item.id);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <h1>{item.title}</h1>
                    <p>{timeAgo(item.createAt, navigator.language)}</p>
                    <p>{`${new Date(item.modifiedAt).toLocaleString()}`}</p>
                  </li>
                </>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Pagination
        onNumberClick={onNumberClick}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        currentPage={page}
      />
    </div>
  );
};

export default MainContents;
