# Blog Write

## Introduction

Frontend built to acess and read the blogs, using [Blog-API](https://clumsy-blog.herokuapp.com/).

- Refer Blog-Write Live Page. [**_HERE_**](https://clumsynite.github.io/blog-write/)
- Refer Blog-Read. [**_Live Page_**](https://clumsynite.github.io/blog-read/) **||** [**_Repository_**](https://github.com/clumsynite/blog-read)
- Refer the API repository. [**_HERE_**](https://github.com/Clumsynite/blog-api)

Blog-Write is where you can create new blog posts. If you want to read posts by other users, you'll have to go to [`Blog-Read`](https://clumsynite.github.io/blog-read/).
Both sites need user accounts, in order to be accessed.

If you are new and don't have an account, you can go to the [Signup](https://clumsynite.github.io/blog-write/#/signup) page and create a new account over there.

> Be sure to remember you password, you can't reset it and there's nothing I can do if you forget it.

After your authentication is successful, you can:

- _Make new Posts_
- _Edit your Posts_
- _Delete your Posts_
- _Edit your Comments_
- _Delete your Comments_

## Contents

### Home

> Needs Authentication: `false`

A simple landing page which some text to give a basic understanding of this project.

`User can access it with or without authentication`

### Login

> Needs Authentication: `false`

User can log into their account with the correct **username** and **password**.

`This page can't be accessed after authentication is successful.`

### Signup

> Needs Authentication: `false`

A new user can create their account here.

Details needed: **Firstname**, **Lastname**, **Username**, **Password**

Password is encrypted on the server before creating the account. So, if you forget your password, the account can't be recovered easily.

`This page can't be accessed after authentication is successful.`

### Profile

> Needs Authentication: `true`

This is where you land after a successful authentication.

Renders a Profile card, which contains the user's details.
The card has two buttons, which shows the user's post and comment count.

After clicking those buttons you can see posts/comments you have made.

### BlogPost

> Needs Authentication: `true`

_This section represents each blog post (which appears after clicking the card)._

You can see the Post in full here. Below which are the comments made on this post.
You can't comment on posts on this site.
However, you can edit or delete you own comments by clicking on the respecting button below the comment.
Similarly, there will be an edit and delete button above the blog post.

### New Post

> Needs Authentication: `true`

This is where you land after clicking **_New Post_** in the navbar.

Here, you can use the editor to write content for your post, which'll then render a preview for you above the Editor.
It shows how your post will be rendered for other users.

### Logout

> A Link which runs the logout function, rendered in navbar after authenticaion is successful.

## Errors

- Sometimes, if you are on the profile page and it doesn't render anything after loading. Try to logout and then login to resolve the issue.
- If you try to edit someone else's blog or comment, you'll be redirected to the profile page.
- If you can't submit your blog or comment, try to relogin.

## Extra Packages used

- [`@agney/react-loading`](https://github.com/agneym/react-loading) for loading animations
- [`@tinymce/tinymce-react`](https://github.com/tinymce/tinymce-react) for TinyMCE Editor (used to post comments)
- [`interweave`](https://github.com/milesj/interweave) to render string as HTML
- [`moment`](https://github.com/moment/moment) to get relative time
- [`react-particles-js`](https://github.com/Wufe/react-particles-js) for using Particles.js as background
- [`react-router-dom`](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom) for handling routes.
- [`gh-pages`](https://github.com/tschaub/gh-pages) to deploy react-app on Github Pages

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
