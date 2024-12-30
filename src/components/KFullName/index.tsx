import React, { useRef, useState } from 'react';
import { IProps } from '@/components/KFullName/index.types';
import styles from "./index.less";
import { Button, Form, Input, message, Space } from 'antd'
import { ApexTable } from 'apex-table'
import { ApexTableRef, IApexTableColumns } from 'apex-table/dist/ApexTable/index.types'
import { getKFullNameList } from '@/services/apis/TestApi'

/**
 * 仓库
 * @constructor
 */
const KFullName: React.FC = (props: IProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { onOk, onCancel } = props;
    
    const apexTableRef = useRef<ApexTableRef>();
    
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
    
    /**
     * 点击取消
     */
    const handleCancel = () => {
        onCancel?.();
    }
    
    /**
     * 点击确定
     */
    const handleOk = () => {
        const selectedArray = apexTableRef.current?.getCheckedData() || [];
        if (selectedArray?.length === 0) {
            debugger
            messageApi.open({
                type: 'warning',
                content: '请选择仓库！',
            });
            return;
        }
        onOk?.(selectedArray);
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
            autoComplete="off"
        >
            <div style={{
                display: 'flex'
            }}>
                <Form.Item
                    name="keyWord"
                >
                    <Input placeholder="仓库编号/名称" style={{ width: 200 }}/>
                </Form.Item>
                
                <Form.Item>
                    <Space style={{ marginLeft: 10 }}>
                        <Button danger>搜索</Button>
                    </Space>
                </Form.Item>
            </div>
        
        </Form>
        <ApexTable
            ref={apexTableRef}
            allowSelect
            showHeaderCheckBox
            columns={columns}
            request={getDataSource}
            rowHeight={40}
            rowKey="kid"
            showPagination
            pagination={{
                showSizeChanger: true
            }}
            readOnly
            isSingle
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Space size={50}>
                <Button onClick={handleCancel}>取消</Button>
                <Button type="primary" onClick={handleOk}>确定</Button>
            </Space>
        </div>
    </div>
};

export default KFullName;
