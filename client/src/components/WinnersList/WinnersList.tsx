import "./WinnerList.css";
import { useWinners } from "../../hooks/useWinners";
import { formatDistanceToNow } from "date-fns";

export const WinnersList = () => {
  const { winners, isLoading } = useWinners();

  return (
    <>
      <div className="winner-list">
        <h2 className="winner-list__title">WINNERS</h2>
        <ul className="winner-list__list">
          {winners ? (
            winners.map((winner) => (
              <li key={crypto.randomUUID()} className="winner-list__item">
                <p className="winner-list__user">{winner.username}</p>
                <span className="winner-list__amount">{winner.amount}</span>
                <span className="winner-list__date">
                  {formatDistanceToNow(winner.date)}
                </span>
              </li>
            ))
          ) : isLoading ? (
            <h2>Loading...</h2>
          ) : (
            <h2>Connection error</h2>
          )}
        </ul>
      </div>
    </>
  );
};
