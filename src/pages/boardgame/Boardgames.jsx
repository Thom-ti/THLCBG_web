import { useEffect, useState } from "react";
import useUserStore from "../../stores/userStore";
import useBoardgameStore from "../../stores/boardgameStore";
import BoardgameItem from "./BoardgameItem";

const Boardgames = () => {
  const token = useUserStore((state) => state.token);
  const boardgames = useBoardgameStore((state) => state.boardgames);
  const getAllBoardGames = useBoardgameStore((state) => state.getAllBoardGames);

  const [isThai, setIsThai] = useState(false);

  useEffect(() => {
    getAllBoardGames(token);
  }, []);

  return (
    <div>
      <div className="form-control bg-red-200 w-1/5">
        <label className="label cursor-pointer">
          <span className="label-text font-bold">แสดงชื่อไทยของบอร์ดเกม</span>
          <input
            type="checkbox"
            className="toggle"
            onChange={() => setIsThai(!isThai)}
          />
        </label>
      </div>
      <div className="w-full overflow-auto flex flex-wrap gap-4 justify-around">
        {boardgames.map((boardgame) => (
          <BoardgameItem
            key={boardgame.id}
            boardgame={boardgame}
            isThai={isThai}
          />
        ))}
      </div>
    </div>
  );
};

export default Boardgames;
