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
class Comments extends Component {
  constructor() {
    super()
    this.state = {name: '', comment: '', commentsList: []}

    setInterval(() => {
      this.setState(prevState => prevState)
    }, 60000)
  }

  onLike = id => {
    this.setState(prevState => ({
      name: prevState.name,
      comment: prevState.comment,
      commentsList: prevState.commentsList.map(o => {
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
      commentsList: prevState.commentsList.filter(o => o.id !== id),
    }))
  }

  addComment = e => {
    e.preventDefault()
    const prev = this.state
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
      commentsList: [...prevState.commentsList, newComment],
    }))
  }

  nameChange = e => {
    this.setState(prevState => ({
      name: e.target.value,
      comment: prevState.comment,
      commentsList: prevState.commentsList,
    }))
  }

  commentChange = e => {
    this.setState(prevState => ({
      name: prevState.name,
      comment: e.target.value,
      commentsList: prevState.commentsList,
    }))
  }

  render() {
    const {name, comment, commentsList} = this.state
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
          <span className="count">{commentsList.length}</span>
          <span>commentsList</span>
        </p>
        <ul>
          {commentsList.map(commentDetails => (
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

export default Comments
