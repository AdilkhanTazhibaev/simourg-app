export const UtRouter = {
    addNamespacedRoutes(router, namespacedRoutes) {
        namespacedRoutes = Object.assign({
            app: []
        }, namespacedRoutes);

        ['app'].forEach(parentName => {
            this.addRoutes(router, parentName, namespacedRoutes[parentName]);
        });

        router.addRoutes(namespacedRoutes.app);
    },
    addRoutes(router, parentName, routes) {
        routes = routes || [];
        routes.forEach(route => {
            router.addRoute(parentName, route);
        });
    }
}
