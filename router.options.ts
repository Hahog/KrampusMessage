export default {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom-route',
        path: '/custom-path',
        component: resolve(__dirname, 'pages/custom.vue')
      });
    }
  }
}