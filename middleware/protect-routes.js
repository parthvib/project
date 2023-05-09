function protectRoutes(req, res, next) {

    //to check if user is not authenticated 
    //we can use isAuth and is isAdmin to check whether the user is valid user or not
    //we can use isadmin and isAuth to deny certain paths
    if (!res.locals.isauth) {
        return res.redirect('/401');
        //401 is a status code that is used to indicate that he or she not authenticated

    }
    if (req.path.startsWith('/admin') && !res.locals.isAdmin) {
        return res.redirect('/403');
    }
    next();//so that next middleware handling function can take over that
}

module.exports = protectRoutes;