import type { CommonPaginationRequest } from "@/shared/config";

export interface GetLogBodyRequest
	extends Pick<
		CommonPaginationRequest,
		"endTime" | "startTime" | "pageIndex" | "pageSize"
	> {
	searchValue?: string;
	systemLogId?: string;
}

export interface GetLogResponse {
	systemlogid: string;
	systemlogname: string;
	urlrequest: string;
	inforchange: string;
	createdat: string;
	userid: number;
	actiontype: string;
	status: string;
	username: string;
	orderid: number;
	gifttypeid: number;
	orderitemid: number;
	addressid: number;
	customerid: number;
	giftitemid: number;
	htmloutput: string;
	promotionid: number;
}
