"use client";

import { use } from "react";

const SingleProfilePost = (props) => {
  
  const { username, postId } = use(props.params);
  console.log({username, postId});

  return <main>
    <p>Dynamic User <strong>{username}</strong></p>
    <p>Dynamic Post <strong>{postId}</strong></p>
  </main>
}

export default SingleProfilePost;