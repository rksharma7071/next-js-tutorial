const SingleProfilePost = async (props) => {
  const { username, postId } = await props.params;
  console.log({username, postId});
  return <main>
    <p>Dynamic User <strong>{username}</strong></p>
    <p>Dynamic Post <strong>{postId}</strong></p>
  </main>
}

export default SingleProfilePost;