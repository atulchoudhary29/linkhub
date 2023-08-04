import Link from '../models/Link.js';
import User from '../models/User.js';

export default {
  createLink: async (req, res) => {
    // const { name, url, logo } = req.body;
    const { name, url } = req.body;

    // try {
    //   const newLink = new Link({
    //     name,
    //     url,
    //     logo,
    //     user: req.user.id,
    //   });

    try {
        const newLink = new Link({
          name,
          url,
          user: req.user.id,
        });
  

      const link = await newLink.save();

      await User.findByIdAndUpdate(req.user.id, {
        $push: { links: link.id },
      });

      res.json(link);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  getUserLinks: async (req, res) => {
    try {
      const links = await Link.find({ user: req.user.id });
      res.json(links);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  updateLink: async (req, res) => {
    // const { name, url, logo } = req.body;
    const { name, url } = req.body;

    const linkFields = {};
    if (name) linkFields.name = name;
    if (url) linkFields.url = url;
    // if (logo) linkFields.logo = logo;

    try {
      let link = await Link.findById(req.params.id);

      if (!link) return res.status(404).json({ msg: 'Link not found' });

      // Make sure user owns the link
      if (link.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      link = await Link.findByIdAndUpdate(
        req.params.id,
        { $set: linkFields },
        { new: true }
      );

      res.json(link);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  deleteLink: async (req, res) => {
    try {
      let link = await Link.findById(req.params.id);

      if (!link) return res.status(404).json({ msg: 'Link not found' });

      // Make sure user owns the link
      if (link.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      await Link.findByIdAndRemove(req.params.id);

      res.json({ msg: 'Link removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};
