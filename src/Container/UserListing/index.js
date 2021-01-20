import React, { useEffect, useState } from "react";
import UserModal from "../AddUser/index";
import { connect } from "react-redux";
import { ADD_USER } from "../../redux/ActionTypes";
import { Tooltip, Modal, Table, Button } from "antd";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import "./listing.css";
const moment = require('moment')
const _ = require('lodash')

const { confirm } = Modal

function UserListing(props) {

    const { addedUsers, onUserAdd } = props

    const [filter, setFilter] = useState({ page: 1, limit: 10 })
    const [total, setTotal] = useState(0)
    const [data, setData] = useState([])
    const [editRecord, setEditRecord] = useState(undefined)
    const [isEdit, setIsEdit] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchListing()
    }, [filter, addedUsers])

    const fetchListing = () => {
        if (addedUsers) {
            let tempUserListing = _.cloneDeep(addedUsers)
            setTotal(tempUserListing.length)
            let tPage = (filter.page - 1) * filter.limit
            let result = tempUserListing.splice(tPage, filter.limit)
            result = result.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
            })
            setData(result)
        }

    }
    const showConfirm = (record) => {
        confirm({
            title: 'Do you Want to delete these course?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                handleDeleteUser(record)
            }
        });
    }

    const handleDeleteUser = user => {
        let tempUserListing = _.cloneDeep(addedUsers)
        let result = tempUserListing.filter(obj => obj.id !== user.id)
        setData(result)
        onUserAdd(result)
    }

    const getColumns = () => [
        {
            title: 'No.',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => <span>{((filter.page - 1) * filter.limit) + index}</span>
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (<span style={{ wordWrap: 'break-word' }}>{text}</span>)
        },
        {
            title: 'Birth Date',
            dataIndex: 'birthDate',
            key: 'birthDate',
            render: (text) => (<span style={{ wordWrap: 'break-word' }}>{moment(text).format('MM/DD/YYYY')}</span>)
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (text) => (<div style={{ wordWrap: 'break-word', maxWidth: '250px' }}>{text}</div>)
        },
        {
            title: 'College',
            dataIndex: 'college',
            key: 'college',
            render: (text) => (<span style={{ wordWrap: 'break-word' }}>{text}</span>)
        },
        {
            title: 'Hobbies',
            dataIndex: 'hobbies',
            key: 'hobbies',
            render: (text) => (<span style={{ wordWrap: 'break-word' }}>{text.join(',')}</span>)
        },
        {
            title: 'Action',
            key: 'x',
            render: (text, record) => (
                <div>
                    <span style={{ marginRight: '15px' }}>
                        <Tooltip title="Delete"><DeleteOutlined onClick={() => showConfirm(record)} /></Tooltip>
                    </span>
                    <Tooltip title="Edit"><EditOutlined onClick={() => handleAddEditUser(true, record)} /></Tooltip>
                </div>
            )
        }
    ]

    const handleAddEditUser = (action, user) => {
        setModalVisible(action)
        if (!action) {
            if (isEdit) setIsEdit(false)

            if (editRecord) setEditRecord(undefined)
        }
        if (user) {
            setEditRecord(user)
            setIsEdit(true)
        }
    }
    const handleTableChange = (pagination, filter, sort) => {
        if (pagination) {
            setFilter({
                ...filter,
                limit: pagination.pageSize,
                page: pagination.current
            })
        }
    }

    return <div className="container">
        <div className="header">
            <Button
                type="primary"
                onClick={() => handleAddEditUser(true)}>Add User</Button>
        </div>
        <Table
            dataSource={data}
            columns={getColumns()}
            pagination={{
                pageSize: filter.limit,
                current: filter.page,
                total: total
            }}
            onChange={handleTableChange}
            loading={loading}
        />
        {
            isModalVisible ?
                <UserModal
                    isModalVisible={isModalVisible}
                    handleCancel={handleAddEditUser}
                    handleOk={handleAddEditUser}
                    btnLoading={loading}
                    record={editRecord}
                    isEdit={isEdit}
                /> : null
        }
    </div>

}
const mapDispatchToProps = dispatch => ({
    onUserAdd: data => dispatch({ type: ADD_USER, payload: data })
})
const mapStateToProps = ({ users }) => {
    const { addedUsers } = users
    return { addedUsers }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserListing)