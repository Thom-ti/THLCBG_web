import { useState } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import useShelfStore from "../../stores/shelfStore";

const ShelfItem = (props) => {
  const { boardgame, isThai, handleDelete } = props;

  const token = useUserStore((state) => state.token);
  const getMyShelf = useShelfStore((state) => state.getMyShelf);
  const updateStatus = useShelfStore((state) => state.updateStatus);

  const handleOnChange = async (e) => {
    try {
      const body = {
        status: e.target.value,
      }
      await updateStatus(token, body, boardgame.boardgame.id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnClick = async (e) => {
    try {
      const body = {
        status: null,
      }
      await updateStatus(token, body, boardgame.boardgame.id);
      await getMyShelf(token);
    } catch (err) {
      console.log(err);
    }
  }

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
        <select className="select" onChange={handleOnChange}>
          <option disabled selected>
            {boardgame.status || "Status"}
          </option>
          <option value="Own">Own</option>
          <option value="Previously Owned">Previously Owned</option>
          <option value="Others">Others</option>
        </select>
        <button className="btn" onClick={handleOnClick}>Reset Status</button>
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
