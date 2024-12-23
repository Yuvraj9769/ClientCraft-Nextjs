/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface DataItem {
  id: string;
  name: string;
}

const InfiniteScroll: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      console.log("APi requesting");

      const response = await axios.get(
        `api/companyUser/documents-on-load?page=${page}&limit=10`
      );

      const fetchedData: DataItem[] = response.data.data;

      setData((prevData) => [...prevData, ...fetchedData]);

      if (page >= response.data.totalPages) {
        setHasMore(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id} className="data-item">
          {item.name}
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more data to load.</p>}
    </div>
  );
};

export default InfiniteScroll;
