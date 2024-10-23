import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useUserStore from "../../stores/userStore";
import useShelfStore from "../../stores/shelfStore";

const ShelfItem = (props) => {
  const { boardgame, isThai, handleDelete } = props;

  const [status, setStatus] = useState(boardgame?.status || "Status");
  const [statusList, setStatusList] = useState([
    "<ว่าง>",
    "เป็นเจ้าของ",
    "เคยครอบครอง",
    "ต้องการซื้อ",
    "ต้องการขาย",
    "กำลังสั่งล่วงหน้า",
    "อื่น ๆ",
  ]);
  const token = useUserStore((state) => state.token);
  const updateStatus = useShelfStore((state) => state.updateStatus);

  const handleOnChange = async (e, id) => {
    try {
      const body = {
        status: e.target.value || null,
      };
      const res = await updateStatus(token, body, id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <tr className="hover:bg-gray-100 transition duration-200">
      {/* รูปเกม */}
      <td className="border w-40 h-40 p-2 text-center">
        <img
          src={boardgame.boardgame.boardgameImage}
          alt={boardgame.boardgame.name}
          className="w-24 h-24 object-cover rounded-lg shadow-md mx-auto"
        />
      </td>

      {/* ชื่อเกม */}
      <td className="border font-bold text-blue-500 hover:text-blue-700 transition duration-200 text-center align-middle">
        <Link to={`/boardgames/${boardgame.boardgame.id}`}>
          {(isThai && boardgame.boardgame.thaiName) || boardgame.boardgame.name}
        </Link>
      </td>

      {/* สถานะเกม */}
      <td className="border text-center align-middle">
        <select
          className="select border rounded-lg p-2"
          onChange={(e) => handleOnChange(e, boardgame.boardgame.id)}
          defaultValue={status}
        >
          <option disabled>โปรดเลือกสถานะ...</option>
          {statusList.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </td>

      {/* ปุ่ม Delete */}
      <td className="border text-center align-middle">
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition duration-200"
          onClick={() => handleDelete(boardgame.boardgame.id)}
        >
          ลบเกม
        </button>
      </td>
    </tr>
  );
};

export default ShelfItem;
