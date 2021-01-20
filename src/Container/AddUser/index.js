import React, { useEffect, useState } from "react";
import AddUserForm from "./AddUserForm";
import axios from "../../utils/axios";
import { collegeSearchApi } from "../../constant/common";
import { ADD_USER } from "../../redux/ActionTypes";
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
const moment = require('moment')
const _ = require('lodash')

let searchTimeout
function AddUserMain(props) {

    const { addedUsers, onUserAdd, handleCancel, handleOk, isEdit, record } = props
    const [isOtherSelected, setOtherSelected] = useState(false)
    const [collegeList, setCollegeList] = useState([])

    useEffect(() => {
        if (isEdit && record.otherHobbies) {
            setOtherSelected(true)
        }
    }, [isEdit])

    const handleSearch = val => {
        if (searchTimeout) {
            clearTimeout(searchTimeout)
        }
        searchTimeout = setTimeout(() => {
            let { url, method } = collegeSearchApi
            url = url + "?name=" + val
            axios({ url, method }).then(({ data }) => {
                data = data.splice(0, 10)
                setCollegeList(data)
            })
        }, 600)
    }
    const handleHobbySelect = (hobbies) => {
        if (hobbies.indexOf('Other') >= 0 && !isOtherSelected) {
            setOtherSelected(true)
        }
        else {
            setOtherSelected(false)
        }
    }

    const handleSubmit = values => {

        if (isOtherSelected && values.otherHobbies) {
            values.hobbies.splice(values.hobbies.indexOf('Other'), 1)
            values.hobbies = [...values.hobbies, values.otherHobbies]
        }

        let tempAddedUsers = _.cloneDeep(addedUsers)
        if (isEdit) {
            values.createdAt = record.createdAt
            tempAddedUsers = tempAddedUsers.map(obj => {
                if (obj.id === record.id) {
                    obj = { ...values }
                }
                return obj
            })
        } else {
            values.id = uuidv4()
            values.createdAt = moment().toISOString()
            tempAddedUsers = [...tempAddedUsers, values]
        }

        localStorage.setItem('addedUsers', JSON.stringify(tempAddedUsers))
        onUserAdd(tempAddedUsers)
        handleCancel(false)
    }
    return <AddUserForm
        onSearch={handleSearch}
        collegeList={collegeList}
        isOtherSelected={isOtherSelected}
        onHobbySelect={handleHobbySelect}
        onSubmit={handleSubmit}
        handleCancel={handleCancel}
        handleOk={handleOk}
        {...props}
    />
}
const mapDispatchToProps = dispatch => ({
    onUserAdd: data => dispatch({ type: ADD_USER, payload: data })
})
const mapStateToProps = ({ users }) => {
    const { addedUsers } = users
    return { addedUsers }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddUserMain)