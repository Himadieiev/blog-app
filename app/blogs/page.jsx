import { fetchBlogs } from '../../actions/actions';
import BlogItem from '../components/BlogItem';

const Blogs = async () => {
  const blogs = await fetchBlogs();

  return (
    <div>
      <h2 className="text-center text-2xl mt-4 px-2 py-2 font-bold">All Blogs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mb-5 px-4 py-5">
        {blogs?.length > 0 && blogs.map(blog => <BlogItem key={blog?.id} blog={blog} />)}
      </div>
    </div>
  );
};

export default Blogs;
