const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogPosts) => {
  const likes = [];

  blogPosts.forEach((el) => {
    likes.push(el.likes);
  });
  return likes.reduce((a, b) => a + b, 0);
};

const favouriteBlogs = (blogs) => {
  let max = 0;
  blogs.forEach((el) => {
    if (el.likes > max) {
      max = el.likes;
    }
  });

  const favArray = blogs.filter((el) => el.likes === max);
  const result = {
    title: favArray[0].title,
    author: favArray[0].author,
    likes: favArray[0].likes,
  };
  return result;
};

const mostBlogs = (blogs) => {
  //iterate over blogs and find the blogs.author with the most blogs.

  const blogAuthors = [];
  let max = 0;

  blogs.forEach((el) => {
    blogAuthors.push(el.author);
  });

  const uniqueAuthors = [...new Set(blogAuthors)];
  const authorsIndex = new Array(uniqueAuthors.length).fill(0);

  uniqueAuthors.forEach((el, i) => {
    blogs.forEach((ele) => {
      if (ele.author === el) {
        authorsIndex[i]++;
      }
    });
  });

  max = Math.max(...authorsIndex);
  //gets the author with most posts
  const authorWithMostBlogsPosts = uniqueAuthors[authorsIndex.indexOf(max)];
  console.log(authorWithMostBlogsPosts);

  const result = {
    author: authorWithMostBlogsPosts,
    blogs: max,
  };
  return result;
};

const mostLikes = (blogs) => {
  //should count the votes of each author then return the likes of the one with the most likes;
  const blogAuthors = [];

  blogs.forEach((el) => {
    blogAuthors.push(el.author);
  });
  const uniqueAuthors = [...new Set(blogAuthors)];
  const authorsIndex = new Array(uniqueAuthors.length).fill(0);
  // for each author im looping through the entire blogs array then i need to get their likes
  uniqueAuthors.forEach((el, i) => {
    let likes = 0;
    blogs.forEach((ele) => {
      if (el === ele.author) {
        console.log(ele.likes);
        likes += ele.likes;
      }
    });
    {authorsIndex.push({ author: el, likes: likes })};
  });
   const filteredAuthors =  authorsIndex.filter(el=>el!==0)

   return filteredAuthors.reduce((a,b)=>a.likes>b.likes?a:b);

};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlogs,
  mostBlogs,
  mostLikes,
};
