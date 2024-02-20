'use client';
import Modal from 'react-modal';
import {useState, useEffect} from 'react';
import {useSession} from 'next-auth/react';

import {
  useGetPostsQuery,
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} from '../../provider/redux/posts/Post';
import {todoType} from '../../types/toDoTypes';

const Home = () => {
  const session = useSession();
  const userId = session?.data?.user?.id;
  const [form, setForm] = useState({
    name: '',
    cuisine: '',
    userId: userId,
  });
  useEffect(() => {
    setForm((prevForm) => ({...prevForm, userId}));
  }, [session]);

  const [editingPost, setEditingPost] = useState<todoType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data, isError, isLoading, refetch} = useGetPostsQuery(
    JSON.stringify(userId),
  );
  const [addPost] = useAddPostMutation();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({...form, [e.target.name]: e.target.value});
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await addPost(form);
      setForm({name: '', cuisine: '', userId: userId});
      refetch();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const onEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (editingPost) {
      setEditingPost({...editingPost, [e.target.name]: e.target.value});
    }
  };

  const onEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updatePost(editingPost);
      setEditingPost(null);
      refetch();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-gray-200">
      {isError && <div>Something went wrong...</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <main className="mt-4 w-2/3 rounded bg-white p-10 shadow-lg">
          <form className="space-y-4" onSubmit={onSubmit}>
            <label className="block">
              <span className="text-gray-700">Topic:</span>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => onChange(e)}
                value={form.name}
                type="text"
                name="name"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Content:</span>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => onChange(e)}
                value={form.cuisine}
                name="cuisine"
              />
            </label>
            <button
              type="submit"
              className="mt-4 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Add Post
            </button>{' '}
          </form>
          {editingPost && (
            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              contentLabel="Edit Post"
              className="mt-4 flex h-3/4 w-3/4 scale-100 transform items-center justify-center rounded-lg bg-white p-8 shadow-xl transition-transform duration-300"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <form onSubmit={onEditSubmit} className="w-full space-y-4">
                <input
                  type="text"
                  value={editingPost?.name}
                  onChange={onEditChange}
                  name="name"
                  className="block w-full rounded-md border border-gray-300 px-4 py-2"
                />
                <textarea
                  value={editingPost?.cuisine}
                  onChange={onEditChange}
                  name="cuisine"
                  className="block w-full rounded-md border border-gray-300 px-4 py-2"
                />
                <button
                  onChange={() => setIsModalOpen(false)}
                  className="ml-3 mt-4 w-32 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Save changes
                </button>
                <button
                  type="submit"
                  className="ml-4 mt-4 w-32 rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  Cancel
                </button>
              </form>
            </Modal>
          )}
          {data?.post?.map((restaurant: todoType) => (
            <div
              key={restaurant.id}
              className="mt-4 flex flex-col items-start rounded bg-gray-100 p-4 shadow-lg">
              <div className="m-10 flex flex-col">
                <h2 className="mb-2 text-xl font-bold text-red-700">
                  Topic: {restaurant.name}
                </h2>
                <p className="text-gray-600">Content: {restaurant.cuisine}</p>
                <button
                  onClick={async () => {
                    try {
                      const response = await deletePost(restaurant.id);
                      refetch();
                      return response;
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                  className="mt-4 w-32 rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  Delete Post
                </button>
                <button
                  onClick={() => {
                    setEditingPost(restaurant);
                    setIsModalOpen(true);
                  }}
                  className="mt-4 w-32 rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Edit Post
                </button>
              </div>
            </div>
          ))}
        </main>
      )}
    </div>
  );
};
export default Home;
