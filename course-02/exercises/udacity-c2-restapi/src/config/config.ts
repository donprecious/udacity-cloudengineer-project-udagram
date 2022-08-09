export const config = {
  dev: {
    username: "postgres",
    password: "Precious0.don",
    database: "postgres",
    host: "udacity-demo-postgress-db.cls6milobgpk.us-east-1.rds.amazonaws.com",
    dialect: "postgres",
    aws_region: "us-east-2",
    aws_profile: "default",
    aws_media_bucket: "udacity-cloudstore",
  },
  jwt: {
    secret: "helloworld",
  },
  prod: {
    username: "",
    password: "",
    database: "udagram_prod",
    host: "",
    dialect: "postgres",
  },
};

console.log("config");