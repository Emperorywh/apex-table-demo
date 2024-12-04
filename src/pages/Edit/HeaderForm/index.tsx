import React from 'react';
import { DatePicker, Form, FormProps, Input } from 'antd'
import { FieldType } from '@/pages/Edit/HeaderForm/index.types'
import "./index.less"

/**
 * 顶部表头
 * @constructor
 */
const HeaderForm: React.FC = () => {
    const [form] = Form.useForm();
    
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
    >
        <Form.Item<FieldType>
            label="单据编号"
            name="billCode"
            rules={[{ required: true, message: '请输入单据编号' }]}
        >
            <Input style={{ width: '30%' }} placeholder="请输入单据编号"/>
        </Form.Item>
        
        <div className="header_form_container">
            <Form.Item<FieldType>
                label="单据日期"
                name="billDate"
                rules={[{ required: true, message: '请选择单据日期' }]}
            >
                <DatePicker style={{ width: '100%' }} placeholder="请选择单据日期"/>
            </Form.Item>
            
            <Form.Item<FieldType>
                label="仓库"
                name="kFullName"
                rules={[{ required: true, message: '请选择仓库' }]}
            >
                <Input placeholder="请选择仓库"/>
            </Form.Item>
            
            <Form.Item<FieldType>
                label="经手人"
                name="eFullName"
                rules={[{ required: true, message: '请选择经手人' }]}
            >
                <Input placeholder="请选择经手人"/>
            </Form.Item>
            
            <Form.Item<FieldType>
                label="入库类型"
                name="inOutTypeId"
                rules={[{ required: true, message: '请选择入库类型' }]}
            >
                <Input placeholder="请选择入库类型"/>
            </Form.Item>
            
            <Form.Item<FieldType>
                label="往来单位"
                name="bFullName"
            >
                <Input placeholder="请选择往来单位"/>
            </Form.Item>
            
            <Form.Item<FieldType>
                label="部门"
                name="dFullName"
            >
                <Input placeholder="请选择部门"/>
            </Form.Item>
            
            <Form.Item<FieldType>
                label="到货日期"
                name="preInDate"
            >
                <DatePicker style={{ width: '100%' }} placeholder="请选择到货日期"/>
            </Form.Item>
            
            <Form.Item<FieldType>
                label="联系人"
                name="person"
            >
                <Input placeholder="请输入联系人"/>
            </Form.Item>
            
            <Form.Item<FieldType>
                label="联系电话"
                name="tel"
            >
                <Input placeholder="请输入联系电话"/>
            </Form.Item>
            
            <Form.Item<FieldType>
                label="联系地址"
                name="address"
            >
                <Input placeholder="请输入联系地址"/>
            </Form.Item>
            
            <Form.Item<FieldType>
                label="承运单位"
                name="deliveryName"
            >
                <Input placeholder="请选择承运单位"/>
            </Form.Item>
            
            <Form.Item<FieldType>
                label="物流单号"
                name="expressNo"
            >
                <Input placeholder="请输入物流单号"/>
            </Form.Item>
            
            <Form.Item<FieldType>
                label="原单据编号"
                name="sourceBillCode"
            >
                <Input placeholder="请输入原单据编号"/>
            </Form.Item>
        </div>
    </Form>
};

export default HeaderForm;