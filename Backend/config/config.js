module.exports = {
    port: process.env.PORT || 5000,
    jwtSecret: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMDMzNzA1OCwiaWF0IjoxNzEwMzM3MDU4fQ.DacGC0zELvQ5mRGO46iR3Au95ggv5xPi9icQCd3QXF8',
    db: {
      url: 'mongodb+srv://munyiricluster.erg9yiq@cluster0.cgm5bnq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    },
  };
  