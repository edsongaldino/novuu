const target = process.env.DOCKER_ENV === 'true' ? 'http://api:5135' : 'http://localhost:5135';

module.exports = [
  {
    context: ["/api", "/uploads"],
    target: target,
    secure: false
  }
];
