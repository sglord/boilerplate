# ToDo

- routes - extract duplicate code
- passsport - refactor and add oatuh
- redux - clean up, think about redux-toolkit
- ui - make redirects between password pages, wireframe it out, flow
- make app handle logged in or not - on UI and call authenticate middleware in routes
- front end HOC wrapper withAuth, backend authenticat middleware
- jwt cookies/session
-
- Auth - https://hackernoon.com/your-node-js-authentication-tutorial-is-wrong-f1a3bf831a46
  - rewrite proper redux store
  - passport JWT frontEnd
    - should we hash on the front end, so as not to send a pw in request
  - password reset
    - limit number of attempts or resets in certain period
    - always
  - oauth
  - 2fa
  - rate limiting / lockout TTL - redis??
  - even better for admin
  - http headers / helmet
  - blacklist JWT
  - SSO
  - salting
- formik / yup
- context
- cookies / sessions
- middlewares
- react concurrent https://reactjs.org/docs/concurrent-mode-patterns.html
- react-testing-library
- bootstrap
- @reduxjs/toolkit
- redux saga for login? or in general?
- internationalization - locale files
- payment - stripe...
- cypress
- momentjs - for handling time
- logging - splunk
- error handler server
-
- styled components
- env variables
- ci/cd - travis, jenkins, github actions
- manage secrets
- prevent query injection
- nodemon docker
- heroku docker
- aws docker
- kubernetes
- swagger - Open API
- typescript
- sockets
- **concurrently**
-
-
- docker - server white listed only
- kubernetes - auto scale
- load balancer - rate limiting
- server.js link todo's
-
- start scripts
- hot reloading
- code splitting / chunks
- react concurrent mode
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
-
