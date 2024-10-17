import { useEffect, useState } from "react";
import useShelfStore from "../../stores/shelfStore";
import useUserStore from "../../stores/userStore";
import ShelfItem from "./ShelfItem";
import BoardgameItem from "../boardgame/BoardgameItem";

const MyShelf = () => {
  const token = useUserStore((state) => state.token);
  const getMyShelf = useShelfStore((state) => state.getMyShelf);
  const myShelf = useShelfStore((state) => state.myShelf);
  const deleteFromShelf = useShelfStore((state) => state.deleteFromShelf);

  const [isThai, setIsThai] = useState(false);
  const [isGallery, setIsGallery] = useState(false);

  useEffect(() => {
    getMyShelf(token);
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteFromShelf(token, id);
      await getMyShelf(token);
    } catch (err) {
      console.log(err);
    }
  };

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
      <div className="form-control bg-red-200 w-1/5">
        <label className="label cursor-pointer">
          <span className="label-text font-bold">แสดงเป็นรูปภาพ</span>
          <input
            type="checkbox"
            className="toggle"
            onChange={() => setIsGallery(!isGallery)}
          />
        </label>
      </div>
      {isGallery ? (
        <div className="w-full overflow-auto flex flex-wrap gap-4 justify-around">
          {myShelf?.map((boardgame) => (
            <BoardgameItem
              key={boardgame.boardgame.id}
              boardgame={boardgame.boardgame}
              isThai={isThai}
            />
          ))}
        </div>
      ) : (
        <table className="table w-full">
          <tbody>
            <tr>
              <th className="border text-center">Game</th>
              <th className="border text-center">Name</th>
              <th className="border text-center">Status</th>
              <th className="border text-center">Delete</th>
            </tr>
            {myShelf?.map((boardgame) => (
              <ShelfItem
                handleDelete={handleDelete}
                key={boardgame.id}
                boardgame={boardgame}
                isThai={isThai}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyShelf;
