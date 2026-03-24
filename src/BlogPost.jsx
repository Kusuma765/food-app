import React from 'react'
import { useParams } from 'react-router-dom'

function BlogPost() {
    const{slug}=useParams();
    const BlogPost={
        'first-post':{title:'first Blogpost',content:'This is the content of the first post'},
        'second-post':{title:'second Blogpost',content:'This is the content of the second post'},
        'third-post':{title:'third Blogpost',content:'This is the content of the third post'}
    };

    const post=BlogPost[slug];
    
  return (
    <>{post && <h1>{post.name} {post.title} {post.content}</h1>}
      
    </>
  )
}

export default BlogPost;
