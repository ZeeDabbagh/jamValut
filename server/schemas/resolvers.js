const { User, Concert, Post } = require('../models');
const { AuthenticationError } = require('apollo-server-errors');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    users: async () => {
      return User.find({});
    },
    concerts: async () => {
      return Concert.find({});
    },
    posts: async () => {
      return Post.find({});
    },
    concertByDescription: async (_, { description }) => {
        return Concert.findOne({ description });
    },
  },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            console.log("Hello" + username + email + password)
            return User.create({ username, email, password });
        },
        addPost: async (parent, { title, content, concertId, photos, videos }, context) => {

            const authHeader = context.req.headers.authorization;
        
            if (!authHeader) {
                throw new AuthenticationError('Authorization header must be provided');
            }

      const token = authHeader.split(' ')[1];
      let user;

      try {
        user = jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }

      let concert = await Concert.findOne({ description: concertDescription });

      if (!concert) {
        concert = await Concert.create({ description: concertDescription, /* other concert details */ });
      }
      
      const newPost = await Post.create({
        review,
        concert: concert._id,
        photos,
        videos,
        user: user._id
      });

      return newPost;
    },
    votePost: async (parent, { postId }) => {
      const post = await Post.findById(postId);
      post.votes += 1;
      await post.save();
      return post;
    },
    addConcert: async (parent, { title, date, location, artist, venue, city, country, image }) => {
      return Concert.create({ title, date, location, artist, venue, city, country, image });
    },
    addConcertToUser: async (parent, { userId, concertId }) => {
      const user = await User.findById(userId);
      user.concerts.push(concertId);
      await user.save();
      return user;
    },
  },

  User: {
    concerts: async (user) => {
      return Concert.find({ _id: { $in: user.concerts } });
    },
    posts: async (user) => {
      return Post.find({ _id: { $in: user.posts } });
    },
  },

  Concert: {
    posts: async (concert) => {
      return Post.find({ _id: { $in: concert.posts } });
    },
  },

  Post: {
    user: async (post) => {
      return User.findById(post.user);
    },
    concert: async (post) => {
      return Concert.findById(post.concert);
    },
  },
};

module.exports = resolvers;
