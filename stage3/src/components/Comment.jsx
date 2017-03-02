import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'actions/comment';

class Comment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderComments = this.renderComments.bind(this);
  }

  componentWillUnmount() {
    const { comments } = this.props;
    window.localStorage.setItem('comments', JSON.stringify(comments));
  }

  renderComments(comment, i) {
    return (
      <div className="comment" key={ i }>
        <strong>{ comment.user }</strong>
        { comment.text }
        <button className="delete" onClick={ ()=>{ this.props.dispatch(actions.removeComment(this.props.params.imageId, i)); } }>&times;</button>
      </div>
    )
  }

  handleSubmit(e) {
    const { dispatch } = this.props;
    const author = this.author.value;
    const comment = this.comment.value;
    const { imageId } = this.props.params;
    dispatch(actions.addComment(imageId, author, comment));
    e.stopPropagation();
    e.preventDefault();
    this.commentForm.reset();
    this.author.focus();
  }

  render() {

    const { imageId } = this.props.params;
    const comments = this.props.comments[imageId];

    return (
      <div>
        { comments.map(this.renderComments) }
        <form className="comment-form" ref={ form => {this.commentForm = form;} } onSubmit={ this.handleSubmit }>
          <input type="text" placeholder="author" ref={ input => {this.author = input} }/>
          <input type="text" placeholder="comment" ref={ input => {this.comment = input} }/>
          <input type="submit" hidden />
        </form>
      </div>
    )

  }

}

const mapStateToProps = (state) => ({comments: state.comments});

export default connect(mapStateToProps)(Comment);