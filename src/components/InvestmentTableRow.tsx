import { Dispatch, useEffect } from "react";
import { Investment } from "../data/interface";
import { useGetPriceByIdQuery } from "../store/api/coinApi";

interface InvestmentTableRowProps {
  investment: Investment;
  index: number;
  onDelete: (id: string) => void;
  setProfits: Dispatch<any>;
}

const InvestmentTableRow = (props: InvestmentTableRowProps) => {
  const { investment, index, onDelete } = props;
  const { data } = useGetPriceByIdQuery(investment.id);

  const currentPrice = data?.market_data?.current_price?.usd || 0;
  const currentTotalValue = currentPrice * investment.amount;
  const profitOrLoss = currentTotalValue - investment.totalCost;

  useEffect(() => {
    debugger;
    if (data) {
      props.setProfits((prev: any) => [...prev, profitOrLoss]);
    }
  }, [data]);

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{investment.cryptocurrency}</td>
      <td>{investment.amount}</td>
      <td>${investment.purchasePrice.toLocaleString()}</td>
      <td>${investment.totalCost.toLocaleString()}</td>
      <td>{investment.purchaseDate}</td>
      <td>${currentPrice.toLocaleString()}</td>
      <td
        style={{
          color: profitOrLoss >= 0 ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        ${profitOrLoss.toLocaleString()}
      </td>
      <td>
        <button>Редактировать</button>
        <button
          style={{ marginLeft: "8px", color: "red" }}
          onClick={() => onDelete(investment.id)}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default InvestmentTableRow;
