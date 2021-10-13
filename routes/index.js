const router = require('express').Router();
const apiRoutes = require('./api')

router.use('/api', apiRoutes)

router.use((req, res) => {
  res.status(404).send('<h1>Page Not Found</h1><br /><a href="/">Click Here to Return to Homepage</a>');
});

module.exports = router;