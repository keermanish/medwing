# MEDWING #

## How to Run ##
- Clone Repository
- `npm i`
- `npm run start`

## Use of React Hooks ##
- Complete application is **built on React Hook (no class based components)**
- No Redux, instead implemented **custom state management** with the help of `useContext` and `useReducer` hook

## Folder Structure ##
- Three primary folders
  - **components**, for all common/reusable components
  - **pages**, for all pages (which consists of markup and components)
  - **utils**, for all common things including helper, context, const etc
- seperate `common.css`, which includes reset code and common styles
- `index.js` to bootstrap the application

**Note** - I've used `create-react-app` as started kit