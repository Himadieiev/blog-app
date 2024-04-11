'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export const fetchBlogs = async () => {
  const blogs = await prisma.blog.findMany({});

  return blogs;
};

export const fetchSingleBlog = async id => {
  const blog = await prisma.blog.findFirst({
    where: {
      id: id,
    },
  });

  return blog;
};

export const addBlog = async formData => {
  //collect info from form using formData
  const title = formData.get('title');
  const category = formData.get('category');
  const description = formData.get('description');
  const imageUrl = formData.get('imageUrl');

  //push the data into the DB
  const new_blog = await prisma.blog.create({
    data: {
      imageUrl: imageUrl ? imageUrl : null,
      title,
      category,
      description,
    },
  });

  revalidatePath('/blogs/add-blog');
  redirect('/blogs');
};

// Update a Blog
export const updateBlog = async (id, formData) => {
  // collect info from form using formData
  const imageUrl = formData.get('imageUrl');
  const title = formData.get('title');
  const category = formData.get('category');
  const description = formData.get('description');

  // session
  // const session = await getServerSession(authOptions);

  // only admin can add blog
  // if (session?.user?.role === 'ADMIN' || session?.user?.permissions?.includes('EDIT_BLOG')) {
  // push the data into the DB
  const updated_blog = await prisma.blog.update({
    where: {
      id: id,
    },
    data: {
      imageUrl: imageUrl ? imageUrl : null,
      title,
      category,
      description,
      // authorId: session?.user?.id,
    },
  });

  revalidatePath(`/blogs/update-blog/${id}`);
  redirect('/blogs');
};

// add comment to a blog
export const addCommentToBlog = async (blogId, formData) => {
  // collect info from form using formData
  const text = formData.get('text');

  // push the data into the DB
  const added_comment = await prisma.comment.create({
    data: {
      blogId,
      text,
    },
  });

  revalidatePath(`/blogs/${blogId}`);
  redirect(`/blogs/${blogId}`);
};

// fetch all comments

export const fetchComments = async blogId => {
  const comments = await prisma.comment.findMany({
    where: {
      blogId: blogId,
    },
  });

  return comments;
};
