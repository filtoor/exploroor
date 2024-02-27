export interface TransactionType {
  signature: string;
  description: string;
  type: string;
  fee: number;
  feePayer: string;
  timestamp: number;
}

export function Transaction({ transaction }: { transaction: TransactionType }) {
  return <span>{transaction.description}</span>;
}
