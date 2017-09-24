module.exports = {
    type: "react-component",
    npm: {
        esModules: true,
        umd: {
            global: "ReactHashChange",
            externals: {
                react: "React"
            }
        }
    }
};
