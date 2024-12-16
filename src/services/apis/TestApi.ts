import ApexRequest from '@/utils/ApexRequest'

/**
 * 获取入库计划单列表
 * @param data
 */
export const getInstockPlanList = (data: any) => {
    return ApexRequest({
        url: '/instock/BuyOrderPlan/getPage',
        data,
        method: 'POST'
    });
}