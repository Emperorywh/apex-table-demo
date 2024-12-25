import React, { useState } from 'react';
import { IProps } from '@/components/KFullName/index.types';
import styles from "./index.less";
import { Button, Form, Input, Space } from 'antd'
import { ApexTable } from 'apex-table'
import { IApexTableColumns } from 'apex-table/dist/ApexTable/index.types'
import { getKFullNameList } from '@/services/apis/TestApi'

/**
 * 仓库
 * @constructor
 */
const KFullName: React.FC = (props: IProps) => {
    
    /**
     * 获取数据源
     * @param params
     */
    const getDataSource = async (params) => {
        const { pageSize = 10, currentPage = 1 } = params;
        const requestData = {
            pageSize,
            pageIndex: currentPage
        }
        const response = await getKFullNameList(requestData);
        const dataSource = {
            data: [],
            success: true,
            total: 0
        }
        if (response.status === 200) {
            const {
                data = {
                    count: 0,
                    pageData: []
                }
            } = response.data;
            dataSource.data = data.pageData;
            dataSource.total = data.count;
        }
        return dataSource;
    }
    
    const [columns, setColumns] = useState<IApexTableColumns<any>[]>([
        {
            title: '仓库编号',
            name: 'kUserCode',
        },
        {
            title: '仓库名称',
            name: 'kFullName',
        },
        {
            title: '库区数',
            name: 'areaCount',
        },
        {
            title: '货位数',
            name: 'cargoCount',
        },
        {
            title: '联系人',
            name: 'kManagerName',
        },
        {
            title: '联系电话',
            name: 'kManagerTel',
        },
        {
            title: '地址',
            name: 'kAddress',
        },
    ]);
    
    return <div className={styles.container}>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            // initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                name="keyWord"
            >
                <Input placeholder="仓库编号/名称"/>
            </Form.Item>
            
            <Form.Item>
                <Space>
                    <Button danger>搜索</Button>
                </Space>
            </Form.Item>
        </Form>
        <ApexTable
            columns={columns}
            request={getDataSource}
            rowHeight={40}
            rowKey="kid"
            showPagination
            pagination={{
                showSizeChanger: true
            }}
            readOnly
        />
    </div>
};

export default KFullName;
