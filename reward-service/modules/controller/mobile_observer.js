module.exports = (controller) => {
  controller.on('logging', async () => {
    console.log('--> event emitter');
  });
};
