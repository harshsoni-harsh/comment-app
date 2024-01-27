import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class App extends Component {
  constructor() {
    super()
    this.state = {name: '', comment: '', comments: []}

    setInterval(() => {
      this.setState(prevState => prevState)
    }, 60000)
  }

  onLike = id => {
    this.setState(prevState => ({
      name: prevState.name,
      comment: prevState.comment,
      comments: prevState.comments.map(o => {
        if (o.id === id) {
          return {...o, like: !o.like}
        }
        return o
      }),
    }))
  }

  onDelete = id => {
    this.setState(prevState => ({
      name: prevState.name,
      comment: prevState.comment,
      comments: prevState.comments.filter(o => o.id !== id),
    }))
  }

  addComment = e => {
    e.preventDefault()
    const prev = this.state
    if (prev.name === '') {
      return
    }
    const newComment = {
      id: uuidv4(),
      name: prev.name,
      comment: prev.comment,
      time: new Date(),
      like: false,
      color:
        initialContainerBackgroundClassNames[Math.round(Math.random() * 7)],
    }

    this.setState(prevState => ({
      name: '',
      comment: '',
      comments: [newComment, ...prevState.comments],
    }))
  }

  nameChange = e => {
    this.setState(prevState => ({
      name: e.target.value,
      comment: prevState.comment,
      comments: prevState.comments,
    }))
  }

  commentChange = e => {
    this.setState(prevState => ({
      name: prevState.name,
      comment: e.target.value,
      comments: prevState.comments,
    }))
  }

  render() {
    const {name, comment, comments} = this.state
    return (
      <div className="body">
        <h1 className="heading">Comments</h1>
        <div className="inputDiv">
          <form onSubmit={this.addComment}>
            <p>Say something about 4.0 Technologies</p>
            <input
              placeholder="Your Name"
              onChange={this.nameChange}
              className="name"
              value={name}
            />
            <textarea
              placeholder="Your Comment"
              onChange={this.commentChange}
              className="comment"
              value={comment}
            />
            <button type="submit" className="addButton">
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="commentImg"
          />
        </div>
        <hr />
        <p>
          <span className="count">{comments.length}</span>
          <span>Comments</span>
        </p>
        <ul>
          {comments.map(commentDetails => (
            <CommentItem
              key={commentDetails.id}
              commentDetails={commentDetails}
              onLike={this.onLike}
              onDelete={this.onDelete}
              formatDistanceToNow={formatDistanceToNow}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default App
