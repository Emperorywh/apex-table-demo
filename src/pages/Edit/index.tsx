import React, { useEffect, useRef, useState } from 'react';
import styles from "./index.less";
import HeaderForm from '@/pages/Edit/HeaderForm'
import { ApexTable } from 'apex-table'
import { ApexTableRef, IApexTableColumns } from 'apex-table/dist/ApexTable/index.types'
import { Button, Form, Space } from 'antd'
import { useParams } from 'umi';
import { getInstockPlanByOrder } from '@/services/apis/TestApi'
import dayjs from 'dayjs'


/**
 * 开单页面
 * @constructor
 */
const Edit: React.FC = () => {
    
    const params = useParams();
    
    const [headerForm] = Form.useForm();
    
    const apexTableRef = useRef<ApexTableRef>();
    
    /**
     * 数据源
     */
    const [dataSource, setDataSource] = useState<any[]>([]);
    
    /**
     * 获取数据源
     */
    const onGetDataSource = async () => {
        const { billIndexId = 0 } = params;
        if (isNaN(Number.parseInt(billIndexId as any))) return;
        const response = await getInstockPlanByOrder({ id: billIndexId });
        if (response.status === 200 && response?.data?.isSuccess) {
            const { data } = response.data;
            setDataSource(data.detailDataOutput);
            const formData = {
                ...data,
                detailDataOutput: []
            }
            formData.billDate = dayjs(formData.billDate);
            formData.preInDate = formData.preInDate ? dayjs(formData.preInDate) : '';
            headerForm.setFieldsValue(formData)
        }
    }
    
    /**
     * 表格列
     */
    const [columns, setColumns] = useState<IApexTableColumns<any>[]>([
        {
            title: '仓库',
            name: 'kFullName',
            columnType: 'modal',
            rules: {
                isValid: ({ row, value }) => value.length > 0,
                noticeMessage: '仓库必填'
            },
            modalOptions: (row, value, modalRef) => {
                return {
                    title: '仓库信息',
                    width: '50vw',
                    content: <div>
                        <h1>仓库列表</h1>
                        <div>{value}</div>
                        <Space>
                            <Button onClick={() => {
                                modalRef.current?.destroy();
                            }}>取消</Button>
                            <Button type='primary' onClick={() => {
                                modalRef.current?.destroy();
                            }}>确定</Button>
                        </Space>
                    </div>
                }
            }
        },
        {
            title: '商品编号',
            name: 'pUserCode',
            rules: {
                isValid: ({ row, value }) => value.length > 0,
                noticeMessage: '商品编号必填'
            }
        },
        {
            title: '商品名称',
            name: 'pFullName',
        },
        {
            title: '规格',
            name: 'standard',
        },
        {
            title: '条码',
            name: 'barCode',
        },
        {
            title: '品牌',
            name: 'brandName',
        },
        {
            title: '批次',
            name: 'goodsNumber',
        },
        {
            title: '生产日期',
            name: 'produceDate',
            columnType: 'datePicker',
        },
        {
            title: '保质期',
            name: 'validityDay',
            columnType: 'inputNumber',
        },
        {
            title: '到期日期',
            name: 'endDate',
            columnType: 'datePicker',
        },
        {
            title: '序列号',
            name: 'serialNumberList',
        },
        {
            title: '货位',
            name: 'cargoName',
        },
        {
            title: '库区',
            name: 'kAreaName',
        },
        {
            title: '单位',
            name: 'unitId',
            columnType: 'select',
            options: (value, row) => {
                const array: any[] = [];
                if (Array.isArray(row.units)) {
                    row.units.forEach((item: any) => {
                        array.push({
                            value: item.unitId,
                            label: item.unitName
                        })
                    })
                }
                return array;
            }
        },
        {
            title: '单价',
            name: 'price',
            columnType: 'inputNumber',
        },
        {
            title: '计划数量',
            name: 'assQty',
            columnType: 'inputNumber',
        },
        {
            title: '已入数量',
            name: 'preOnShelfQty',
            readOnly: true,
        },
        {
            title: '未入数量',
            name: 'preInStockQty',
            readOnly: true
        },
        {
            title: '换算关系',
            name: 'unitConvert',
        },
        {
            title: '换算结果',
            name: 'unitConvertRst',
        },
        {
            title: '体积（M³）',
            name: 'volume',
        },
        {
            title: '重量（Kg）',
            name: 'weight',
        },
        {
            title: '是否赠品',
            name: 'isGift',
            columnType: 'select',
            options: [
                {
                    value: 0,
                    label: '否'
                },
                {
                    value: 1,
                    label: '是'
                },
            ]
        },
        {
            title: '明细备注',
            name: 'remark',
        },
    ]);
    
    useEffect(() => {
        onGetDataSource();
    }, [])
    
    return <div className={styles.container}>
        <HeaderForm headerForm={headerForm}/>
        <ApexTable
            ref={apexTableRef}
            columns={columns}
            dataSource={dataSource}
            rowKey='detailId'
            rowHeight={40}
            height={450}
            allowRowAddDel
        />
    </div>;
};

export default Edit;
