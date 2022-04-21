

logger = (req, res, next) => {
    
    const a = `method=${req.method}; path=${req.originalUrl}; time=${Date.now()}`
    console.log(a)
    next()

};

module.exports = logger;


// at=info method=GET path="/api/me" host=mso-kleinanzeigen.herokuapp.com request_id=8d70a824-bf16-4446-b302-c0e7396b4b37 fwd="213.196.212.134" dyno=web.1 connect=0ms service=9ms status=401 bytes=249 protocol=https