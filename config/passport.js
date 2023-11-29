const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  // local login strategy
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        prisma.user
          .findUnique({
            where: { username },
          })
          .then(async function (user) {
            if (!user) {
              return done(
                null,
                false,
                req.flash("loginMessage", "No user found.")
              );
            }
            if (!bcrypt.compareSync(password, user.password)) {
              return done(
                null,
                false,
                req.flash("loginMessage", "Oops! Wrong password.")
              );
            }
            return done(null, user);
          })
          .catch(function (err) {
            return done(err);
          });
      }
    )
  );

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        roleField: "role",
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        prisma.user
          .findUnique({
            where: { username },
          })
          .then(async function (user) {
            if (user) {
              return done(
                null,
                false,
                req.flash("signupMessage", "That username is already taken.")
              );
            } else {
              const salt = await bcrypt.genSalt(10);
              const hash = await bcrypt.hash(password, salt);
              const newUser = await prisma.user.create({
                data: {
                  // name: req.body.name,
                  username,
                  password: hash,
                  // role: 2,
                },
              });
              return done(null, newUser);
            }
          })
          .catch(function (err) {
            return done(err);
          });
      }
    )
  );
};
