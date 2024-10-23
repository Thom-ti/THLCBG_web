import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
      toast.success("ลบออกจาก My Shelf เรียบร้อย");
    } catch (err) {
      console.log(err);
      toast.error("ไม่สามารถลบออกจาก My Shelf ได้");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        {/* Checkbox for showing Thai name */}
        <div className="form-control bg-[#AFE472] w-1/3 p-2 rounded-md shadow-md">
          <label className="label cursor-pointer">
            <span className="label-text font-bold">แสดงชื่อไทยของบอร์ดเกม</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              onChange={() => setIsThai(!isThai)}
            />
          </label>
        </div>

        {/* Checkbox for showing gallery view */}
        <div className="form-control bg-[#AFE472] w-1/3 p-2 rounded-md shadow-md">
          <label className="label cursor-pointer">
            <span className="label-text font-bold">แสดงเป็นรูปภาพ</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              onChange={() => setIsGallery(!isGallery)}
            />
          </label>
        </div>
      </div>

      {/* Conditional rendering for gallery or table view */}
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
        <div className="overflow-auto rounded-lg shadow-md">
          <table className="table-auto w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border text-center p-2">บอร์ดเกม</th>
                <th className="border text-center w-1/2 p-2">ชื่อ</th>
                <th className="border text-center p-2">สถานะ</th>
                <th className="border text-center p-2">ลบเกม</th>
              </tr>
            </thead>
            <tbody>
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
        </div>
      )}
    </div>
  );
};

export default MyShelf;
