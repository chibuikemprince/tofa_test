var configuration = {

}


configuration.production ={
"hostname":"127.0.0.1",
"port":"2000",
"hashSalt":"testing"

}

configuration.testing ={
    "hostname":"127.0.0.1",
    "port":"2000",
    "hashSalt":"testing"

}



const configEnv  = typeof(process.env.NODE_ENV)=="string" && process.env.NODE_ENV=="production"?configuration.production:configuration.testing
 
module.exports = configEnv;

