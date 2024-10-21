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
    <tr className="hover:bg-gray-100 transition duration-200">
      <td className="border w-40 h-40 p-2">
        <img
          src={boardgame.boardgame.boardgameImage}
          alt={boardgame.boardgame.name}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </td>
      <td className="border font-bold text-blue-500 hover:text-blue-700 transition duration-200">
        <Link to={`/boardgames/${boardgame.boardgame.id}`}>
          {(isThai && boardgame.boardgame.thaiName) || boardgame.boardgame.name}
        </Link>
      </td>
      <td className="border">
        <select
          className="select border rounded-lg p-2"
          onChange={(e) => handleOnChange(e, boardgame.boardgame.id)}
          defaultValue={status}
        >
          <option disabled>Please select status.</option>
          {statusList.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </td>
      <td className="border">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          onClick={() => handleDelete(boardgame.boardgame.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ShelfItem;
