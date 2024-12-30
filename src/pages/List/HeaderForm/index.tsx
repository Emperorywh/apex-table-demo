import React from 'react';
import { Button, DatePicker, Form, FormProps, Input, Space } from 'antd'
import "./index.less"
import { IProps } from '@/pages/List/HeaderForm/index.types'

/**
 * 顶部表头
 * @constructor
 */
const HeaderForm: React.FC = (props: IProps) => {
    
    const { onSearch } = props;
    
    const [form] = Form.useForm();
    
    const onFinish: FormProps['onFinish'] = (values) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    /**
     * 搜索
     */
    const handleSearch = () => {
        const formData = form.getFieldsValue();
        onSearch?.(formData);
    }
    
    return <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
    >
        <div className="header_form_container">
            <Form.Item
                label="快速筛选"
                name="keyWord"
            >
                <Input placeholder="入库计划单号"/>
            </Form.Item>
            
            <Form.Item
                name="dateTime"
            >
                <DatePicker.RangePicker style={{ width: '100%' }}/>
            </Form.Item>
            
            <Form.Item
                label="仓库"
                name="kFullName"
            >
                <Input placeholder="请选择仓库"/>
            </Form.Item>
            
            <Form.Item
                label="经手人"
                name="eFullName"
            >
                <Input placeholder="请选择经手人"/>
            </Form.Item>
            
            <Form.Item
                label="往来单位"
                name="bFullName"
            >
                <Input placeholder="请选择往来单位"/>
            </Form.Item>
            
            <Form.Item
                label="入库类型"
                name="inOutTypeId"
            >
                <Input placeholder="请选择入库类型"/>
            </Form.Item>
            
            <Form.Item
                label="单据状态"
                name="status"
            >
                <Input placeholder="请选择单据状态"/>
            </Form.Item>
            
            <Space style={{ marginBottom: 12 }}>
                <Button type="primary" onClick={handleSearch}>查询</Button>
                <Button color="primary" variant="outlined">新增</Button>
            </Space>
        </div>
    </Form>
};

export default HeaderForm;
