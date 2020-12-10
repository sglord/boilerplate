# TODO

- routes - extract duplicate code
- passport - refactor and add oauth
- redux - think about redux-toolkit
- https for auth?
- ui - make redirects between password pages, wireframe it out, flow
- UI - respond to error scenarios on authentications and api responses
- CLIENT - HOC wrapper withAuth
- jwt cookies/session - https://stackoverflow.com/questions/60896104/sliding-window-with-expiring-jwt-refresh-token
  - refresh token sliding window - https://github.com/jacobslusser/JwtAuthRenewWebApi/blob/master/docs/Sliding-Expiration.md
  - 'remember me' - long expiration of the user
  - revoke access - how to revoke a user access?
  - logout? blacklist the token until the expiration date hits? https://stackoverflow.com/questions/42330013/jwt-token-refresh-sliding-sessions-and-signout
- env variables - dotenv?
- manage secrets
- error handler server

- Auth - https://hackernoon.com/your-node-js-authentication-tutorial-is-wrong-f1a3bf831a46
  - http headers / ****helmet****
  - password reset
    - limit number of attempts or resets in certain period
  - oauth
  - 2fa
  - rate limiting / lockout TTL - redis??
  - even better for admin
  - blacklist JWT
  - SSO
  - salting
- yup
- context
- cookies / sessions
- middlewares
- react concurrent https://reactjs.org/docs/concurrent-mode-patterns.html
- react-testing-library
- bootstrap
- @reduxjs/toolkit
- internationalization - locale files
- payment - stripe...
- cypress
- momentjs - for handling time
- logging - splunk, logger utility frontEnd / backend
- redux saga ?
-
- styled components
- ci/cd - travis, jenkins, github actions
- prevent query injection
- nodemon docker
- heroku docker
- aws docker
- kubernetes
- swagger - Open API
- typescript
- sockets
-
- docker - server white listed only
- kubernetes - auto scale
- load balancer - rate limiting
- server.js link todo's
-
- start scripts
- hot reloading
- code splitting / chunks
- clusters - [node](https://medium.com/tech-tajawal/clustering-in-nodejs-utilizing-multiple-processor-cores-75d78aeb0f4f)
- storybook / figma
- gracefully degrade docker https://medium.com/better-programming/docker-for-node-js-in-production-b9dc0e9e48e0
  <!-- AU/src/root/root-module.jsx -->
  <!-- AU/src/src/shrade/logger.ts -->
- load and config scripts
  - add secrets, select files, opinionated, etc - CRA for a MERN saas
- https://github.com/goldbergyoni/nodebestpractices
- cms system to update images and copy

# **Fixes**

- .bablerc conflicting with webpack config
- prettier config file error
- add nvm use to .zshrc
- run blueprint without using CDN
- split to two with docker compose

## security

https://medium.com/@nodepractices/were-under-attack-23-node-js-security-best-practices-e33c146cb87d

- audit for vulnerable dependencies
