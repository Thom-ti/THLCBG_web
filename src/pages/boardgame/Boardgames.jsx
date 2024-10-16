import { useEffect } from "react";
import useUserStore from "../../stores/userStore";
import useBoardgameStore from "../../stores/boardgameStore";
import BoardgameItem from "./BoardgameItem";

const Boardgames = () => {
  const token = useUserStore((state) => state.token);
  const boardgames = useBoardgameStore((state) => state.boardgames);
  const getAllBoardGames = useBoardgameStore((state) => state.getAllBoardGames);

  useEffect(() => {
    getAllBoardGames(token);
  }, []);

  return (
    <div>
      {boardgames.map((boardgame) => (
        <BoardgameItem  key={boardgame.id} boardgame={boardgame} />
      ))}
    </div>
  );
};

export default Boardgames;
