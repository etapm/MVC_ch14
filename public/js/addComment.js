const addCommentHandler = async (event) => {
    event.preventDefault();
  
    const postId = event.target.getAttribute('data-post-id');
    const commentContent = document.querySelector('#comment-content').value.trim();
  
    if (commentContent) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ post_id: postId, content: commentContent }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to add comment.');
}}
};

document
  .querySelector('#add-comment-form')
  .addEventListener('submit', addCommentHandler);
