import { useState, useEffect } from 'react';
import { postsAPI } from '../utils/api';

function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postsAPI.getAll();
      setPosts(response.data);
    } catch (error) {
      console.error('조회 실패:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postsAPI.create({ title, content });
      setTitle('');
      setContent('');
      fetchPosts();
    } catch (error) {
      console.error('작성 실패:', error);
    }
  };

  return (
    <div>
      <h1>블로그</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">작성</button>
      </form>

      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>{new Date(post.created_at).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
