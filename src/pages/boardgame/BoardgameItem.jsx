import useBoardgameStore from "../../stores/boardgameStore";
import { Link } from "react-router-dom";

const BoardgameItem = (props) => {
  const { boardgame, isThai } = props;
  return (
    <div className="w-60 border">
      <Link to={`/boardgames/${boardgame.id}`}>
        <img className="w-60 h-60" src={boardgame.boardgameImage} />{" "}
        <div
          key={boardgame.id}
          className="flex items-center justify-center text-center font-bold text-blue-500 active:text-blue-800"
        >
          {isThai ? boardgame.thaiName || boardgame.name : boardgame.name}
        </div>{" "}
      </Link>
    </div>
  );
};

export default BoardgameItem;
