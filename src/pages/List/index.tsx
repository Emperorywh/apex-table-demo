import React, { useRef, useState } from 'react';
import styles from '@/pages/Edit/index.less'
import HeaderForm from '@/pages/List/HeaderForm'
import { Button, Space } from 'antd'
import { ApexTable } from 'apex-table'
import { ApexTableRef, IApexTableColumns } from 'apex-table/dist/ApexTable/index.types'
import { getInstockPlanList } from '@/services/apis/TestApi'
import { history } from 'umi';

/**
 * 列表页
 * @constructor
 */
const List: React.FC = () => {
    const apexTableRef = useRef<ApexTableRef>();
    
    /**
     * 修改
     */
    const handleEdit = (row: any) => {
        history.push(`/edit/${row.billIndexId}`)
    }
    
    
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
        const response = await getInstockPlanList(requestData);
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
     * 表格列
     */
    const [columns, setColumns] = useState<IApexTableColumns<any>[]>([
        {
            title: '操作',
            name: 'action',
            columnType: 'customer',
            onFormatter: (row) => {
                return <Space>
                    <Button type="link" onClick={() => handleEdit(row)}>修改</Button>
                </Space>
            }
        },
        {
            title: '单据日期',
            name: 'billDate',
            columnType: 'datePicker'
        },
        {
            title: '计划单编号',
            name: 'billCode',
            width: 200
        },
        {
            title: '原单据编号',
            name: 'sourceBillCode',
        },
        {
            title: '往来单位',
            name: 'bFullName',
        },
        {
            title: '单据状态',
            name: 'statusName',
        },
        {
            title: '上架状态',
            name: 'shelfStatusName',
        },
        {
            title: '入库类型',
            name: 'inOutTypeName',
        },
        {
            title: '单据来源',
            name: 'fromBillTypeName',
        },
        {
            title: '仓库',
            name: 'kFullName',
        },
        {
            title: '货主',
            name: 'oFullName',
        },
        {
            title: '经手人',
            name: 'eFullName',
        },
        {
            title: '计划数量',
            name: 'sumAssQty',
            showSummary: true
        },
        {
            title: '已入库数量',
            name: 'sumAssInstockQty',
            showSummary: true
        },
        {
            title: '未入库数量',
            name: 'sumAssPreInstockQty',
            showSummary: true
        },
        {
            title: '已上架数量',
            name: 'sumAssOnShelfQty',
            showSummary: true
        },
        {
            title: '未上架数量',
            name: 'sumAssPreOnShelfQty',
            showSummary: true
        },
        {
            title: '单据金额',
            name: 'total',
            showSummary: true
        },
        {
            title: '折扣金额',
            name: 'disTotal',
            showSummary: true
        },
        {
            title: '含税金额',
            name: 'taxedTotal',
            showSummary: true
        },
        {
            title: '总体积(M³)',
            name: 'sumVolume',
            showSummary: true
        },
        {
            title: '总重量(Kg)',
            name: 'sumWeight',
            showSummary: true
        },
        {
            title: '承运单位',
            name: 'deliveryName',
        },
        {
            title: '联系方式',
            name: 'tel',
        },
        {
            title: '预计到货日期',
            name: 'preInDate',
        },
        
        {
            title: '制单时间',
            name: 'createTime',
            width: 200
        },
        {
            title: '备注',
            name: 'remark',
        },
        {
            title: '平台名称',
            name: 'sourceShopName',
        },
        {
            title: '制单人',
            name: 'createrName',
        },
        {
            title: '回传状态',
            name: 'syncStatusName',
        },
        {
            title: '回传单号',
            name: 'syncBillNo',
        },
        {
            title: '单据打印次数',
            name: 'printCount',
            showSummary: true
        },
        {
            title: '打印时间',
            name: 'lastPrintTime',
        }
    ]);
    
    return <div className={styles.container}>
        <HeaderForm/>
        <ApexTable
            ref={apexTableRef}
            columns={columns}
            request={getDataSource}
            rowKey='detailId'
            rowHeight={40}
            height={745}
            showPagination
            pagination={{
                showSizeChanger: true
            }}
            allowResize
            showSummary
            showLineNumber
            readOnly
        />
    </div>;
};

export default List;
