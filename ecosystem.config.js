module.exports = {
    apps : [
        {
            name        : "blog",
            script      : "./server/server.js",
            watch       : ['./server'],
            env: {
                "NODE_ENV": "development",
                "PORT": 8080
            },
            env_production : {
                "NODE_ENV": "production",
                "PORT": 8081
            },
            "instances"  : 4,
            "exec_mode"  : "cluster"
        }
    ]
};