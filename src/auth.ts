import { Express } from 'express';
import passport from 'passport';
import expressSession from 'express-session';
import Auth0Strategy from 'passport-auth0';
import config from './config';

export function registerPassport(app: Express): void {
  app.use(expressSession({
    secret: config.app.secret,
    cookie: {},
    resave: false,
    saveUninitialized: false,
  }));

  const strategy = new Auth0Strategy(
    {
      domain: config.auth0.domain,
      clientID: config.auth0.clientId,
      clientSecret: config.auth0.clientSecret,
      callbackURL: `${config.app.url}/callback`,
    },
    ((_, __, ___, profile, done) => done(null, profile)),
  );

  passport.use(strategy);
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
}

export function addAuthRoutes(app: Express): void {
  app.get(
    '/login',
    passport.authenticate('auth0', {
      scope: 'openid email profile',
    }),
    (req, res) => {
      res.redirect('/');
    },
  );

  app.get('/callback', (req, res, next) => {
    passport.authenticate('auth0', (err, user) => {
      if (err) {
        next(err);
        return;
      }
      console.log('user', user);
      if (!user) {
        res.redirect('/login');
        return;
      }
      req.logIn(user, (err) => {
        if (err) {
          next(err);
          return;
        }
        console.log('ok');
        res.redirect('/');
      });
    })(req, res, next);
  });
}
