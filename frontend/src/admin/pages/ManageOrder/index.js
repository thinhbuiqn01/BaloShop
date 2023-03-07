import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../../components/Box";

import Table from "../../components/Table";
import { getOrders, payOrder } from "../../../actions/orderActions";

import { Dropdown, Menu, message, Modal, Popover, Tag } from "antd";
import H1 from "../../components/Heading/H1";
import Details from "./components/Details";
import useUpdateEffect from "../../../hook/useUpdateEffect";

function Index() {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState("");

  const upsertCategory = useSelector((state) => state.upsertCategory);

  const [messageApi, contextHolder] = message.useMessage();

  useUpdateEffect(() => {
    if (!loadingPay) {
      messageApi.open({
        type: "success",
        content: "Update Success!",
        duration: 3,
      });
      dispatch(getOrders());
      setIsModalOpen(false);
    }
  }, [loadingPay]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditId("");
  };

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const handleClickAction =
    (_id) =>
    ({ key }) => {
      switch (key) {
        case "view":
          setEditId(_id);
          setIsModalOpen(true);
          break;
        case "delivered":
          setEditId(_id);

          dispatch(payOrder(_id, { isStatus: true }));

          break;
        case "notDelivery":
          setEditId(_id);
          dispatch(payOrder(_id, { isStatus: false }));

          break;
      }
    };

  const itemsDelivered = [
    {
      label: "View Details",
      key: "view",
    },
    {
      label: "Delivered",
      key: "delivered",
    },
  ];
  const itemsNotDelivery = [
    {
      label: "View Details",
      key: "view",
    },
    {
      label: "Not Delivery",
      key: "notDelivery",
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: "25%",
      // isSearch: true,
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
      isSearch: true,
      render: (_, record) => record?.user?.name,
      // sorter: (a, b) => a?.user?.name?.localeCompare(b?.user?.name),
      // sortDirections: ["descend", "ascend", "descend"],
    },
    {
      title: "Email",
      dataIndex: "name",
      key: "name",
      width: "25%",
      isSearch: true,
      render: (_, record) => record?.user?.email,
      // sorter: (a, b) => a?.user?.email?.localeCompare(b?.user?.email),
      // sortDirections: ["descend", "ascend", "descend"],
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "slug",
      width: "20%",
      // sorter: (a, b) => Number(a.totalPrice) - Number(b.totalPrice),
      // sortDirections: ["descend", "ascend", "descend"],

      isSearch: true,
    },
    {
      title: " Date",
      dataIndex: "date",
      key: "updatedAt",
      // isSearch: true,
      width: "20%",
      render: (_, record) => record?.updatedAt.substring(0, 10),
      // sorter: (a, b) => a.updatedAt?.localeCompare(b.updatedAt),
      // sortDirections: ["descend", "ascend", "descend"],
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status?.localeCompare(b.status),
      sortDirections: ["descend", "ascend", "descend"],
      render: (_, { status, isDelivered }) =>
        isDelivered ? (
          <Tag color={"green"} key={1}>
            Delivered
          </Tag>
        ) : (
          <Tag color={"volcano"} key={2}>
            Not Delivery
          </Tag>
        ),
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      align: "center",
      render: (_, { _id, isDelivered }) => {
        const items = isDelivered ? itemsNotDelivery : itemsDelivered;
        return (
          <Dropdown
            menu={{ items, onClick: handleClickAction(_id) }}
            placement="bottom"
            arrow
            trigger={["click"]}
          >
            <Box
              as="i"
              className="bx bx-dots-horizontal-rounded"
              fontSize="35px"
              maxHeight="20px"
              cursor="pointer"
            />
          </Dropdown>
        );
      },
    },
  ];
  return (
    <Box backgroundColor="#fff" padding="20px">
      {contextHolder}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box fontSize="22px" marginBottom="20px" fontWeight="bold">
          Manage Orders
        </Box>
      </Box>

      <Table columns={columns} dataSource={orderList?.data?.data} />
      {isModalOpen && (
        <Modal
          title={<H1>Order Details</H1>}
          open={isModalOpen}
          onCancel={handleCancel}
          okText="Save"
          cancelText="Cancel"
          footer={false}
          width="1000px"
        >
          <Details onCancel={handleCancel} editId={editId} />
        </Modal>
      )}
    </Box>
  );
}

export default Index;
