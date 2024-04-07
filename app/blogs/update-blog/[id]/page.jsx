import { fetchSingleBlog } from '../../../../actions/actions';
import UpdateBlogForm from '../../../components/forms/UpdateBlogForm';

const UpdateBlogPage = async ({ params }) => {
  const id = params?.id;

  //get the db info for each blog to fill forms
  const blog = await fetchSingleBlog(id);

  return (
    <div>
      <h2 className="text-center text-2xl mt-4 px-2 py-2 font-bold">Update Blog Page</h2>
      <UpdateBlogForm blog={blog} />
    </div>
  );
};

export default UpdateBlogPage;
