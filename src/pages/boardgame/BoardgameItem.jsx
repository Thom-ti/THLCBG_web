import { Link } from "react-router-dom";

const BoardgameItem = (props) => {
  const { boardgame, isThai } = props;
  return (
    <div className="w-60 border rounded-lg shadow-lg overflow-hidden bg-white transition-transform transform hover:scale-105">
      <Link to={`/boardgames/${boardgame.id}`}>
        <img
          className="w-full h-60 object-cover"
          src={boardgame.boardgameImage}
          alt={
            isThai && boardgame.thaiName ? boardgame.thaiName : boardgame.name
          }
        />
        <div className="p-4">
          <div className="flex items-center justify-center text-center font-bold text-blue-600 hover:text-blue-800">
            {(isThai && boardgame.thaiName) || boardgame.name}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BoardgameItem;
