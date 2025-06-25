export interface RefundCreateBody {
  value: number;
  transactionEndToEndId: string;
  correlationID: string;
  comment?: string;
}

export interface RefundCreateResponse {
  pixTransactionRefund: PixTransactionRefund;
}

export interface PixTransactionRefund {
  value: number;
  time: string;
  status: string;
  correlationID: string;
  refundId: string;
  returnIdentification: string;
}
