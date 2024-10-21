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
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Button */}
      <div className="form-control mb-6 bg-[#AFE472] p-2 rounded-md shadow-md">
        <label className="label cursor-pointer">
          <span className="label-text font-bold">แสดงชื่อไทยของบอร์ดเกม</span>
          <input
            type="checkbox"
            className="toggle toggle-primary ml-4"
            checked={isThai}
            onChange={() => setIsThai(!isThai)}
          />
        </label>
      </div>

      {/* Boardgames */}
      <div className="w-full overflow-auto flex flex-wrap gap-4 justify-center">
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
