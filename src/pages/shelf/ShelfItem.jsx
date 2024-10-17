import React from "react";
import { Link } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import useShelfStore from "../../stores/shelfStore";

const ShelfItem = (props) => {
  const { boardgame, isThai, handleDelete } = props;

  const token = useUserStore((state) => state.token);
  const deleteFromShelf = useShelfStore((state) => state.deleteFromShelf);

  return (
    <tr>
      <td className="border w-40 h-40">
        <img src={boardgame.boardgame.boardgameImage} className="size-full" />
      </td>
      <td className="border font-bold text-blue-500 active:text-blue-800">
        <Link to={`/boardgames/${boardgame.boardgame.id}`}>
          {isThai
            ? boardgame.boardgame.thaiName || boardgame.boardgame.name
            : boardgame.boardgame.name}
        </Link>
      </td>
      <td className="border">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn m-1">
            {boardgame.status || "Status"}
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a>Own</a>
            </li>
            <li>
              <a>Previously Owned</a>
            </li>
            <li>
              <a>Others</a>
            </li>
          </ul>
        </div>
      </td>
      <td className="border">
        <button
          className="bg-[#FF4C4C] hover:bg-[#C80D0D] text-white font-bold p-4 rounded"
          onClick={() => handleDelete(boardgame.boardgame.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ShelfItem;
