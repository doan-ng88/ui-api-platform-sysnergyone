export interface GetDashboardDataBodyRequest {
	dashboard?: {
		listOption?: GetDashboardData_Option_Dashboard[];
		option?: GetDashboardData_Option_Dashboard;
	};
	orderManagement?: {
		listOption?: GetDashboardData_Option_OrderManagement[];
		option?: GetDashboardData_Option_OrderManagement;
	};
}

export type GetDashboardData_Option_Dashboard =
	| "RevenueDashboard"
	| "SalesDashboard"
	| "CustomerDashboard"
	| "SpendingDashboard"
	| "RevenueOnOrderDayMonthYear"
	| "CustomerAcquisition";

export type GetDashboardData_Option_OrderManagement =
	| "TotalSales"
	| "TotalPendingOrders"
	| "TotalCancelledOrders";

export interface GetDashboardDataResponse {
	totalSales: GetDashboardData_TotalSales[] | null;
	totalPendingOrder: GetDashboardData_TotalPendingOrder[] | null;
	totalCancelledOrder: GetDashboardData_TotalCancelledOrder[] | null;
	revenueDashboard: GetDashboardData_RevenueDashboard[] | null;
	salesDashboard: GetDashboardData_SalesDashboard[] | null;
	customerDashboard: GetDashboardData_CustomerDashboard[] | null;
	spendingDashboard: GetDashboardData_SpendingDashboard[] | null;
	revenueOnOrderDayMonthYear:
		| GetDashboardData_RevenueOnOrderDayMonthYear[]
		| null;
	customerAcquisition: GetDashboardData_CustomerAcquisition[] | null;
}

export interface GetDashboardData_TotalSales {
	totalSales: number;
	percentSalesMoreThanLastMonth: number;
}

export interface GetDashboardData_TotalPendingOrder {
	totalPendingOrder: number;
	percentPendingMoreThanLastMonth: number;
}
export interface GetDashboardData_TotalCancelledOrder {
	totalCancelledOrder: number;
	percentCancelledMoreThanLastMonth: number;
}

export interface GetDashboardData_RevenueDashboard {
	totalRevenue: number;
	percentRevenueMoreThanLastWeek: number;
	totalRevenueMoreThanLastWeek: number;
}

export interface GetDashboardData_SalesDashboard {
	totalSales: number;
	totalSalesMoreThanLastWeek: number;
	percentSalesMoreThanLastWeek: number;
}

export interface GetDashboardData_CustomerDashboard {
	totalCustomer: number;
	totalCustomerMoreThanLastWeek: number;
	percentCustomerMoreThanLastWeek: number;
}

export interface GetDashboardData_SpendingDashboard {
	totalSpending: number;
	totalSpendingMoreThanLastWeek: number;
	percentSpendingMoreThanLastWeek: number;
}

export interface GetDashboardData_RevenueOnOrderDayMonthYear {
	revenueOnOrderCountByDay: GetDashboardData_RevenueOnOrderDayMonthYear_RevenueOnOrderCountByDay[];
	revenueOnOrderCountByMonth: GetDashboardData_RevenueOnOrderDayMonthYear_RevenueOnOrderCountByMonth[];
}

export interface GetDashboardData_RevenueOnOrderDayMonthYear_RevenueOnOrderCountByDay {
	timeDay: string;
	revenueCount: number;
	orderCount: number;
}

export interface GetDashboardData_RevenueOnOrderDayMonthYear_RevenueOnOrderCountByMonth {
	timeMonth: string;
	revenueCount: number;
	orderCount: number;
}

export interface GetDashboardData_CustomerAcquisition {
	newCustomersCountByNumber: number;
	newCustomersCountByPercent: number;
	newCustomersCountByOrdersNumber: number;
	newCustomersCountByOrdersPercent: number;
	ordersCountByDayShowInChartByDay: GetDashboardData_CustomerAcquisition_OrdersCountByDayShowInChartByDay[];
}

export interface GetDashboardData_CustomerAcquisition_OrdersCountByDayShowInChartByDay {
	timeDay: string;
	orderCount: number;
}
