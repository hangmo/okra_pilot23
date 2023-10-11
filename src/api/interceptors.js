function setInterceptors(instance) {
  console.log('setInterceptors')
  instance.interceptors.request.use(
    async function(config) {
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    async function(response) {
      return response;
    },
    function(error) {
      return Promise.reject(error);
    }
  );
  return instance;
}

export {setInterceptors}