import { useEffect } from "react";
import { toast } from "react-toastify";
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
    // ใช้ window.confirm เพื่อถามผู้ใช้
    const confirmDelete = window.confirm(
      "คุณแน่ใจหรือไม่ว่าต้องการลบโพสต์นี้?"
    );

    if (!confirmDelete) {
      return; // ถ้าไม่ยืนยันการลบให้หยุดการทำงาน
    }

    try {
      await deleteBoardGame(token, id);
      await getAllBoardGames(token);
      toast.success("ลบบอร์ดเกมสําเร็จ");
    } catch (err) {
      console.log(err);
      toast.error("ไม่สามารถลบบอร์ดเกมได้");
    }
  };

  return (
    <div className="p-4">
      <div className="overflow-auto rounded-lg shadow-md">
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border text-center p-2">บอร์ดเกม</th>
              <th className="border text-center w-1/2 p-2">ชื่อ</th>
              <th className="border text-center p-2">ลบเกม</th>
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
