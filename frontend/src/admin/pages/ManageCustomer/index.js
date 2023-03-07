import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "../../../components/Box";

import Table from "../../components/Table";
import {
  createUser,
  getUsersAdmin,
  getUsersCustomer,
  resetData,
  updateUserById,
} from "../../../actions/userActions";

import {
  DotChartOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Button from "../../components/Button";
import { Dropdown, message, Modal, Tag } from "antd";
import H1 from "../../components/Heading/H1";
import Upsert from "./components/Upsert";
import useUpdateEffect from "../../../hook/useUpdateEffect";

function Index() {
  const dispatch = useDispatch();
  const usersCusomter = useSelector((state) => state.usersAdmin);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState("");

  const createUserData = useSelector((state) => state.getData);

  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);
  };

  useUpdateEffect(() => {
    if (createUserData?.user?.status == 200) {
      messageApi.open({
        type: "success",
        content: editId ? "Edited Success!" : "Created Success!",
        duration: 6,
      });
      dispatch(getUsersCustomer());
      setIsModalOpen(false);
    }
  }, [createUserData]);

  const handleOk = (values) => {
    if (editId) {
      dispatch(
        updateUserById({
          ...values,
          _id: editId,
          status: values.status ? 1 : 0,
        })
      );
    } else {
      dispatch(createUser({ ...values, isAdmin: false }));
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditId("");
  };

  useEffect(() => {
    dispatch(getUsersCustomer());
  }, []);

  const handleClickAction =
    (_id) =>
    ({ key }) => {
      switch (key) {
        case "edit":
          setEditId(_id);
          setIsModalOpen(true);
          break;
      }
    };
  const items = [
    {
      label: "Edit",
      key: "edit",
    },
    {
      label: "Delete",
      key: "delete",
    },
  ];

  const columns = [
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      isSearch: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      isSearch: true,
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",

      width: "20%",
      render: (record) => record?.substring(0, 10),

      sorter: (a, b) => a.createdAt.length - b.createdAt.length,
      sortDirections: ["descend", "ascend", "descend"],
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.length - b.status.length,
      sortDirections: ["descend", "ascend"],
      render: (_, { status }) =>
        status == 1 ? (
          <Tag color={"green"} key={status}>
            Enable
          </Tag>
        ) : (
          <Tag color={"volcano"} key={status}>
            Disable
          </Tag>
        ),
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      align: "center",
      render: (_, { _id }) => (
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
      ),
    },
  ];
  return (
    <Box backgroundColor="#fff" padding="20px">
      {contextHolder}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box fontSize="22px" marginBottom="20px" fontWeight="bold">
          Manage Customer
        </Box>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="middle"
          onClick={showModal}
        >
          Add Customer
        </Button>
      </Box>

      <Table columns={columns} dataSource={usersCusomter?.user?.data} />
      {isModalOpen && (
        <Modal
          title={<H1>{editId ? "Edit" : "Add"} Customer</H1>}
          open={isModalOpen}
          onCancel={handleCancel}
          okText="Save"
          cancelText="Cancel"
          footer={false}
        >
          <Upsert
            onCancel={handleCancel}
            onFinish={handleOk}
            erorrs={createUserData}
            editId={editId}
          />
        </Modal>
      )}
    </Box>
  );
}

export default Index;
