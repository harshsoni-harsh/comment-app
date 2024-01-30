// Write your code here
import './index.css'

const App = props => {
  const {commentDetails, onLike, onDelete, formatDistanceToNow} = props
  const {id, name, comment, time, like, color} = commentDetails

  const onLikeBtn = () => {
    onLike(id)
  }

  const onDeleteBtn = () => {
    onDelete(id)
  }

  const timeToDisplay = formatDistanceToNow(time)

  const logoStyle = `${color} logo`

  const likeIcon = like
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const commentStyle = like ? 'liked' : 'like'

  return (
    <li className="commentDiv">
      <div className="commentHeader">
        <div>
          <p className={logoStyle}>{name[0]}</p>
        </div>
        <div>
          <p>
            <span className="commentName">{name}</span>
            <span className="time">{timeToDisplay}</span>
          </p>
          <p className="commentBody">{comment}</p>
        </div>
      </div>
      <div className="likeDelete">
        <button type="button" onClick={onLikeBtn} className="likeBtn">
          <img src={likeIcon} alt="like" />
          <p className={commentStyle}>Like</p>
        </button>
        <button
          type="button"
          onClick={onDeleteBtn}
          data-testid="delete"
          className="deleteBtn"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default App
