const SingleProfile = async (props) => {
  const { username } = await props.params;
  console.log(username);
  return <main>
    Dynamic {username}
  </main>
}

export default SingleProfile;