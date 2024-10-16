import useBoardgameStore from "../../stores/boardgameStore";
import { Link } from "react-router-dom";

const BoardgameItem = (props) => {
  const { boardgame } = props;
  return (
    <div className="flex flex-col items-center justify-center border">
      <Link to={`/boardgames/${boardgame.id}`}>
        <img className="w-60 h-60" src={boardgame.boardgameImage} />{" "}
        <div key={boardgame.id} className="flex items-center justify-center">
          {boardgame.name}
        </div>{" "}
      </Link>
    </div>
  );
};

export default BoardgameItem;
