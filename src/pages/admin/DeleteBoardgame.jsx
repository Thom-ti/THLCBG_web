import { useEffect } from "react";
import useUserStore from "../../stores/userStore";
import useBoardgameStore from "../../stores/boardgameStore";
import WebBoardgameItem from "./WebBoardgameItem";
import useAdminStore from "../../stores/adminStore";

const DeleteBoardgame = () => {
  const token = useUserStore((state) => state.token);
  const boardgames = useBoardgameStore((state) => state.boardgames);
  const getAllBoardGames = useBoardgameStore((state) => state.getAllBoardGames);
  const deleteBoardGame = useAdminStore((state) => state.deleteBoardGame);

  useEffect(() => {
    getAllBoardGames(token);
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBoardGame(token, id);
      await getAllBoardGames(token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <div className="overflow-auto rounded-lg shadow-md">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border text-center p-2">Game</th>
              <th className="border text-center w-1/2 p-2">Name</th>
              <th className="border text-center p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {boardgames?.map((boardgame) => (
              <WebBoardgameItem
                handleDelete={handleDelete}
                key={boardgame.id}
                boardgame={boardgame}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeleteBoardgame;
