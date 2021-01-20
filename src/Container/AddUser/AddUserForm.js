import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, DatePicker, Select, Checkbox, Col, AutoComplete, Modal, Form, Row } from 'antd'
import { GENDER_TYPE, footerStyle, hobbiesOptions } from '../../constant/common';

const formItemLayout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    },
};

function SignUp(props) {

    const { onSearch, collegeList, isOtherSelected, onHobbySelect, onSubmit,
        isModalVisible, handleCancel, handleOk, isEdit, record, btnLoading
    } = props

    return <Modal
        title={isEdit ? "Edit User" : "Add User"}
        visible={isModalVisible}
        onOk={handleOk}
        footer={null}
        okButtonProps={{ loading: btnLoading, htmlType: "submit" }}
        onCancel={() => handleCancel(false)}
    >
        <Form
            name="UserForm"
            {...formItemLayout}
            initialValues={isEdit && record ? record : null}
            style={{ width: '450px' }}
            onFinish={onSubmit}
        >
            <Form.Item
                label="User Name"
                name="name"
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        message: 'Please enter name!',
                    },
                ]}>
                <Input placeholder="user name" />
            </Form.Item>

            <Form.Item
                label="Birth Date"
                name="birthDate"
                rules={[
                    {
                        required: true,
                        type: "date",
                        message: 'Please enter birthDate',
                    },
                ]}>
                <DatePicker format="MM-DD-YYYY" />
            </Form.Item>
            <Form.Item
                label="Address"
                name="address"
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        message: 'Please enter Address',
                    },
                ]}>
                <Input.TextArea placeholder="Address" />
            </Form.Item>

            <Form.Item
                label="Gender"
                name="gender"
                rules={[
                    {
                        required: true,
                        message: 'Please select Address',
                    },
                ]}>
                <Select
                    placeholder="Select Gender"
                >
                    {
                        Object.keys(GENDER_TYPE).map(k => (
                            <Select.Option key={GENDER_TYPE[k]} value={GENDER_TYPE[k]}>{k}</Select.Option>)
                        )
                    }
                </Select>
            </Form.Item>
            <Form.Item
                label="Hobbies"
                name="hobbies"
            >
                <Checkbox.Group
                    onChange={onHobbySelect}
                    options={hobbiesOptions}
                >
                </Checkbox.Group>
            </Form.Item>
            {
                isOtherSelected ?
                    <Col>
                        <Form.Item
                            label="Other Hobbies"
                            name="otherHobbies"
                            rules={[
                                {
                                    required: isOtherSelected ? true : false,
                                    whitespace: true,
                                    message: 'Please enter other hobbies',
                                },
                            ]}>
                            <Input placeholder="enter other hobbies" />
                        </Form.Item>
                    </Col> : null
            }
            <Form.Item
                label="College"
                name="college"
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        message: 'Please select college',
                    },
                ]}>
                <AutoComplete
                    dropdownMatchSelectWidth={252}
                    style={{ width: 300 }}
                    onSearch={onSearch}
                >
                    {
                        collegeList && collegeList.length ?
                            collegeList.map(obj => <Select.Option value={obj.name} key={obj.name}>{obj.name}</Select.Option>) : null
                    }
                </AutoComplete>
            </Form.Item>

            <Form.Item>
                <div style={footerStyle}>
                    <Button onClick={() => handleCancel(false)}>Cancel</Button>
                    <Button type="primary" loading={btnLoading} htmlType="submit" > {isEdit ? "Update" : "Add"}</Button>
                </div>
            </Form.Item>
        </Form >
    </Modal>
}
export default SignUp