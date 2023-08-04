import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default {
  registerUser: async (req, res) => {
    // const { username, email, fullname, photo, password } = req.body;
    const { username, email, fullname, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

    //   user = new User({
    //     username,
    //     email,
    //     fullname,
    //     photo,
    //     password,
    //   });

    user = new User({
        username,
        email,
        fullname,
        password,
      });

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  getMe: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      console.log(user)
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  getUserByUsername: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.username }).select(
        // 'username fullname photo'
        'username fullname'
      );

      console.log(user._id);

      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }

      const links = await Link.find({ user: user._id });
      console.log(links)

      res.json({
        username: user.username,
        fullname: user.fullname,
        // photo: user.photo,
        links: links,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
};
