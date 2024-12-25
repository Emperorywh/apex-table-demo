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

/**
 * 获取入库计划单
 * @param data
 */
export const getInstockPlanByOrder = (data: any) => {
    return ApexRequest({
        url: '/instock/BuyOrderPlan/get',
        data,
        method: 'POST'
    });
}

/**
 * 获取仓库列表
 * @param data
 */
export const getKFullNameList = (data: any) => {
    return ApexRequest({
        url: '/baseinfo/KType/getPage',
        data,
        method: 'POST'
    });
}