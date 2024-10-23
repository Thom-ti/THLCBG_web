import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import useShelfStore from "../../stores/shelfStore";

const BoardgameItem = (props) => {
  const { boardgame, isThai, token } = props;

  const addToShelf = useShelfStore((state) => state.addToShelf);

  const handleAddToShelf = async () => {
    try {
      await addToShelf(token, boardgame);
      toast.success("เพิ่มเข้า My Shelf เรียบร้อย");
    } catch (err) {
      console.log(err);
      toast.error("มีบอร์ดเกมนี้อยู่ใน My Shelf แล้ว");
    }
  };

  return (
    <div className="relative w-60 border rounded-lg shadow-lg overflow-hidden bg-white transition-transform transform hover:scale-105">
      <Link to={`/boardgames/${boardgame.id}`}>
        {/* รูปภาพของบอร์ดเกม */}
        <img
          className="w-full h-60 object-cover"
          src={boardgame.boardgameImage}
          alt={
            isThai && boardgame.thaiName ? boardgame.thaiName : boardgame.name
          }
        />
      </Link>

      {/* Bookmark icon */}
      <div
        className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-[#416D19] hover:duration-200"
        onClick={handleAddToShelf}
      >
        <FaBookmark size={20} />
      </div>

      {/* ชื่อบอร์ดเกม */}
      <div className="p-4">
        <div className="flex items-center justify-center text-center font-bold text-blue-600 hover:text-blue-800">
          <Link to={`/boardgames/${boardgame.id}`}>
            {(isThai && boardgame.thaiName) || boardgame.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BoardgameItem;
