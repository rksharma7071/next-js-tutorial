import Link from "next/link";

const ServerComp = async () => {
  let posts = [];

  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  posts = await res.json();


  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-10"> <div className="mx-auto max-w-7xl">
      <header className="mb-10 text-center">
        <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">Latest Articles</span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Explore All Posts Server Component</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">Discover interesting articles, explore new ideas, and read something worth sharing.</p>
      </header>

      <>
        <div className="mb-6">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing{" "}
            <span className="font-bold text-slate-900 dark:text-white">
              {posts.length}
            </span>{" "}
            posts
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="font-semibold text-slate-700 dark:text-slate-300">No posts found.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/60 dark:hover:shadow-emerald-950/40"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-lg font-bold text-white shadow-md shadow-emerald-200 dark:shadow-none">{post.id}</div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">User {post.userId}</span>
                </div>
                <h2 className="mb-3 text-lg font-bold leading-7 text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-slate-100 dark:group-hover:text-emerald-400">{post.title}</h2>
                <p className="flex-1 text-sm leading-7 text-slate-600 dark:text-slate-400">{post.body}</p>

                <footer className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">POST #{post.id}</span>

                    <Link
                      href={`/posts/${post.id}`}
                      className="text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >Read Article →</Link>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        )}
      </>
    </div>
    </main>
  );
};

export default ServerComp;
