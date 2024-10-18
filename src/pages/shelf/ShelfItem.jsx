import { useState } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import useShelfStore from "../../stores/shelfStore";
import { toast } from "react-toastify";

const ShelfItem = (props) => {
  const { boardgame, isThai, handleDelete } = props;

  const [status, setStatus] = useState(boardgame?.status || "Status");
  const [statusList, setStatusList] = useState([
    "Status",
    "Own",
    "Previously Owned",
    "Others",
  ]);
  const token = useUserStore((state) => state.token);
  const updateStatus = useShelfStore((state) => state.updateStatus);

  const handleOnChange = async (e, id) => {
    try {
      const body = {
        status: e.target.value || null,
      };
      const res = await updateStatus(token, body, id);
      toast.success("Status Updated!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr>
      <td className="border w-40 h-40">
        <img src={boardgame.boardgame.boardgameImage} className="size-full" />
      </td>
      <td className="border font-bold text-blue-500 active:text-blue-800">
        <Link to={`/boardgames/${boardgame.boardgame.id}`}>
          {(isThai && boardgame.boardgame.thaiName) || boardgame.boardgame.name}
        </Link>
      </td>
      <td className="border">
        <select
          className="select"
          onChange={(e) => handleOnChange(e, boardgame.boardgame.id)}
          defaultValue={status}
        >
          <option disabled selected>
            Please select status.
          </option>
          {statusList.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
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
