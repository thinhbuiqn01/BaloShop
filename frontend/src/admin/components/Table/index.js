import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";

import { Button, Input, Space, Table } from "antd";

// import Highlighter from "react-highlight-words";
import { useMemo } from "react";
import Box from "../../../components/Box";

const Index = ({ dataSource, columns, props }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
        close,
      }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
                lineHeight: "24px",
                display: "flex",
                alignItems: "center",
                border: "none !important",
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
                lineHeight: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none !important",
              }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      // render: (text) => text,
    };
  };

  const columnsFormat = useMemo(() => {
    return [...columns]?.map((item) => {
      if (item.isSearch)
        return {
          ...item,
          ...getColumnSearchProps(item.dataIndex),
        };
      return { ...item };
    });
  }, [columns]);

  return <Table columns={columnsFormat} dataSource={dataSource} {...props} />;
};

export default Index;
