import { Class } from '../models/index.js';

const resolvers = {
  Query: {
    classes: async () => {
      return await Class.find({});
    },
  },
};

export default resolvers;
