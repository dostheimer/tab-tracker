const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistoryController = require('./controllers/HistoryController')
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  app.post('/api/register',
    AuthenticationControllerPolicy.register, 
    AuthenticationController.register)

  app.post('/api/login',
    AuthenticationController.login)

  app.get('/api/songs',
    SongsController.index)
  app.get('/api/songs/:songId',
    SongsController.show)
  app.post('/api/songs',
    SongsController.post)
  app.put('/api/songs/:songId',
    SongsController.put)
  
  app.get('/api/bookmarks',
    isAuthenticated,
    BookmarksController.index)
  app.post('/api/bookmarks',
    isAuthenticated,
    BookmarksController.post)
  app.delete('/api/bookmarks/:bookmarkId',
    isAuthenticated,
    BookmarksController.delete)

  app.get('/api/history',
    isAuthenticated,
    HistoryController.index)
  app.post('/api/history',
    isAuthenticated,
    HistoryController.post)
}
